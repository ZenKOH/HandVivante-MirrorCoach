(function () {
  'use strict';

  const USER_STORAGE_KEY = 'handVivanteMirrorCoach.user.v1';
  const initialHash = window.__MIRRORCOACH_INITIAL_HASH__ || location.hash;
  const baseShowLogin = window.showLogin;
  const baseShowApp = window.showApp;

  const COPY = {
    en: { welcome: 'Welcome / product overview', resume: 'Return to workspace' },
    'zh-Hans': { welcome: '欢迎页 / 产品概览', resume: '返回工作区' },
    es: { welcome: 'Bienvenida / descripción del producto', resume: 'Volver al espacio de trabajo' },
    fr: { welcome: 'Accueil / présentation du produit', resume: 'Retourner à l’espace de travail' },
    de: { welcome: 'Willkommen / Produktübersicht', resume: 'Zum Arbeitsbereich zurückkehren' },
    ms: { welcome: 'Selamat datang / gambaran produk', resume: 'Kembali ke ruang kerja' }
  };

  function languageKey() {
    const value = document.documentElement.lang || 'en';
    if (COPY[value]) return value;
    if (value.toLowerCase().startsWith('zh')) return 'zh-Hans';
    const short = value.slice(0, 2).toLowerCase();
    return COPY[short] ? short : 'en';
  }

  function text(key) {
    return COPY[languageKey()]?.[key] || COPY.en[key];
  }

  function savedUser() {
    try {
      const value = JSON.parse(localStorage.getItem(USER_STORAGE_KEY));
      return value && typeof value === 'object' && String(value.name || '').trim() ? value : null;
    } catch {
      return null;
    }
  }

  function setRoute(hash, mode) {
    if (mode === false) return;
    const state = hash === '#welcome' ? { mirrorCoachWelcome: true } : { mirrorCoach: true };
    if (mode === 'replace' || location.hash === hash) history.replaceState(state, '', hash);
    else history.pushState(state, '', hash);
  }

  function installControls() {
    const menu = document.querySelector('.data-menu-panel');
    const logout = document.getElementById('logoutBtn');
    if (menu && logout && !document.getElementById('welcomeBtn')) {
      const button = document.createElement('button');
      button.id = 'welcomeBtn';
      button.type = 'button';
      button.className = 'secondary';
      button.dataset.welcomeAction = 'true';
      menu.insertBefore(button, logout);
    }

    const form = document.getElementById('loginForm');
    if (form && !document.getElementById('resumeWorkspaceBtn')) {
      const button = document.createElement('button');
      button.id = 'resumeWorkspaceBtn';
      button.type = 'button';
      button.className = 'secondary full resume-workspace';
      button.dataset.resumeWorkspace = 'true';
      button.hidden = true;
      form.parentNode.insertBefore(button, form);
    }
  }

  function updateControls() {
    installControls();
    const welcomeButton = document.getElementById('welcomeBtn');
    const resumeButton = document.getElementById('resumeWorkspaceBtn');
    if (welcomeButton) welcomeButton.textContent = text('welcome');
    if (resumeButton) {
      resumeButton.textContent = text('resume');
      resumeButton.hidden = !savedUser();
    }
  }

  function showWelcome(options = {}) {
    if (typeof baseShowLogin === 'function') baseShowLogin();
    document.body.dataset.shell = 'welcome';
    updateControls();
    document.querySelector('.data-menu')?.removeAttribute('open');
    setRoute('#welcome', options.history === false ? false : options.replace ? 'replace' : 'push');
    window.scrollTo({ top: 0, behavior: 'auto' });
  }

  function showWorkspace(options = {}) {
    if (!savedUser()) {
      showWelcome({ replace: true });
      return;
    }
    if (typeof baseShowApp === 'function') baseShowApp();
    document.body.dataset.shell = 'workspace';
    updateControls();
    if (options.history === false && location.hash === '#welcome') {
      history.replaceState({ mirrorCoach: true, tab: 'dashboard' }, '', '#dashboard');
    }
  }

  window.showWelcome = showWelcome;
  window.showLogin = function () { showWelcome(); };
  window.showApp = function () { showWorkspace(); };

  installControls();
  updateControls();

  document.getElementById('welcomeBtn')?.addEventListener('click', () => showWelcome());
  document.getElementById('resumeWorkspaceBtn')?.addEventListener('click', () => showWorkspace());

  window.addEventListener('popstate', () => {
    if (location.hash === '#welcome') {
      showWelcome({ history: false });
      return;
    }
    if (savedUser()) showWorkspace({ history: false });
    else showWelcome({ replace: true });
  });

  new MutationObserver(updateControls).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['lang']
  });

  if (initialHash === '#welcome' || !savedUser()) {
    showWelcome({ replace: true });
  } else {
    document.body.dataset.shell = 'workspace';
  }
})();
