(function () {
  'use strict';

  const FLOW = [
    { id:'dashboard', key:'flowDashboard', stage:'01' },
    { id:'patients', key:'flowPatients', stage:'02' },
    { id:'prescribe', key:'flowProtocols', stage:'03' },
    { id:'session', key:'flowSession', stage:'04' },
    { id:'exercises', key:'flowExercises', stage:'05' },
    { id:'tutorial', key:'flowTutorial', stage:'06' },
    { id:'manual', key:'flowManual', stage:'07' },
    { id:'outcomes', key:'flowOutcomes', stage:'08' },
    { id:'research', key:'flowResearch', stage:'09' },
    { id:'settings', key:'flowSettings', stage:'10' }
  ];

  const LABELS = {
    en:{previous:'Previous',next:'Next',section:'Workflow',of:'of',caseload:'Caseload',profile:'Profile & eligibility',builder:'Prescription',pathway:'Four-week pathway',trajectory:'Trajectory',recordOutcome:'Record outcome',studySummary:'Study summary',safetyRegister:'Safety register',dataRegister:'Data register',preferences:'Preferences',dataGovernance:'Data & governance',step:'Step',continue:'Continue',back:'Back',page:'Page',flowDashboard:'Command centre',flowPatients:'Screen patient',flowProtocols:'Plan protocol',flowSession:'Deliver session',flowExercises:'Task library',flowTutorial:'Product tutorial',flowManual:'Operating manual',flowOutcomes:'Measure outcomes',flowResearch:'Research & safety',flowSettings:'Settings',patientIdentity:'Profile & goals',patientIdentityHelp:'Define the recovery context and functional objective.',patientMeasures:'Clinical measures',patientMeasuresHelp:'Record the current impairment, pain and skin status.',patientEligibility:'Eligibility decision',patientEligibilityHelp:'Complete the clinician-controlled readiness checks.',protocolProgramme:'Programme structure',protocolProgrammeHelp:'Choose the patient, pathway, setting and planned dose.',protocolMovement:'Movement prescription',protocolMovementHelp:'Set movement families, range, speed and volitional demand.',protocolProgression:'Progression & transfer',protocolProgressionHelp:'Define the quality gate and immediate functional transfer target.'},
    'zh-Hans':{previous:'上一步',next:'下一步',section:'流程',of:'／',caseload:'病例列表',profile:'资料与适用性',builder:'处方',pathway:'四周路径',trajectory:'功能轨迹',recordOutcome:'记录结局',studySummary:'研究摘要',safetyRegister:'安全登记',dataRegister:'数据登记',preferences:'偏好设置',dataGovernance:'数据与治理',step:'步骤',continue:'继续',back:'返回',page:'页',flowDashboard:'指挥中心',flowPatients:'患者筛查',flowProtocols:'方案规划',flowSession:'实施训练',flowExercises:'任务库',flowTutorial:'产品教程',flowManual:'操作手册',flowOutcomes:'结局测量',flowResearch:'研究与安全',flowSettings:'设置',patientIdentity:'资料与目标',patientIdentityHelp:'定义康复背景与功能目标。',patientMeasures:'临床测量',patientMeasuresHelp:'记录当前功能障碍、疼痛与皮肤状态。',patientEligibility:'适用性判断',patientEligibilityHelp:'完成由临床人员控制的准备检查。',protocolProgramme:'方案结构',protocolProgrammeHelp:'选择患者、路径、场景与计划剂量。',protocolMovement:'动作处方',protocolMovementHelp:'设定动作类别、范围、速度与主动参与要求。',protocolProgression:'进阶与迁移',protocolProgressionHelp:'定义质量门槛与即时功能迁移目标。'},
    es:{previous:'Anterior',next:'Siguiente',section:'Flujo',of:'de',caseload:'Casos',profile:'Perfil y elegibilidad',builder:'Prescripción',pathway:'Plan de cuatro semanas',trajectory:'Trayectoria',recordOutcome:'Registrar resultado',studySummary:'Resumen del estudio',safetyRegister:'Registro de seguridad',dataRegister:'Registro de datos',preferences:'Preferencias',dataGovernance:'Datos y gobernanza',step:'Paso',continue:'Continuar',back:'Atrás',page:'Página',flowDashboard:'Centro de mando',flowPatients:'Cribado del paciente',flowProtocols:'Planificar protocolo',flowSession:'Realizar sesión',flowExercises:'Biblioteca de tareas',flowTutorial:'Tutorial del producto',flowManual:'Manual operativo',flowOutcomes:'Medir resultados',flowResearch:'Investigación y seguridad',flowSettings:'Ajustes',patientIdentity:'Perfil y objetivos',patientIdentityHelp:'Defina el contexto de recuperación y el objetivo funcional.',patientMeasures:'Medidas clínicas',patientMeasuresHelp:'Registre la situación funcional, el dolor y la piel.',patientEligibility:'Decisión de elegibilidad',patientEligibilityHelp:'Complete las comprobaciones clínicas de preparación.',protocolProgramme:'Estructura del programa',protocolProgrammeHelp:'Seleccione paciente, vía, entorno y dosis prevista.',protocolMovement:'Prescripción de movimiento',protocolMovementHelp:'Configure familias de movimiento, rango, velocidad y demanda voluntaria.',protocolProgression:'Progresión y transferencia',protocolProgressionHelp:'Defina el criterio de calidad y el objetivo de transferencia funcional.'},
    fr:{previous:'Précédent',next:'Suivant',section:'Parcours',of:'sur',caseload:'File active',profile:'Profil et admissibilité',builder:'Prescription',pathway:'Parcours de quatre semaines',trajectory:'Trajectoire',recordOutcome:'Saisir un résultat',studySummary:'Résumé de l’étude',safetyRegister:'Registre de sécurité',dataRegister:'Registre de données',preferences:'Préférences',dataGovernance:'Données et gouvernance',step:'Étape',continue:'Continuer',back:'Retour',page:'Page',flowDashboard:'Centre de commande',flowPatients:'Évaluer le patient',flowProtocols:'Planifier le protocole',flowSession:'Réaliser la séance',flowExercises:'Bibliothèque de tâches',flowTutorial:'Tutoriel produit',flowManual:'Manuel opératoire',flowOutcomes:'Mesurer les résultats',flowResearch:'Recherche et sécurité',flowSettings:'Paramètres',patientIdentity:'Profil et objectifs',patientIdentityHelp:'Définir le contexte de récupération et l’objectif fonctionnel.',patientMeasures:'Mesures cliniques',patientMeasuresHelp:'Documenter les déficiences, la douleur et l’état cutané.',patientEligibility:'Décision d’admissibilité',patientEligibilityHelp:'Réaliser les vérifications cliniques de préparation.',protocolProgramme:'Structure du programme',protocolProgrammeHelp:'Choisir le patient, la voie, le contexte et la dose prévue.',protocolMovement:'Prescription du mouvement',protocolMovementHelp:'Définir les familles de mouvements, l’amplitude, la vitesse et la demande volontaire.',protocolProgression:'Progression et transfert',protocolProgressionHelp:'Définir le seuil de qualité et la cible de transfert fonctionnel.'},
    de:{previous:'Zurück',next:'Weiter',section:'Ablauf',of:'von',caseload:'Fallübersicht',profile:'Profil und Eignung',builder:'Verordnung',pathway:'Vier-Wochen-Pfad',trajectory:'Verlauf',recordOutcome:'Ergebnis erfassen',studySummary:'Studienübersicht',safetyRegister:'Sicherheitsregister',dataRegister:'Datenregister',preferences:'Einstellungen',dataGovernance:'Daten und Governance',step:'Schritt',continue:'Weiter',back:'Zurück',page:'Seite',flowDashboard:'Kommandozentrale',flowPatients:'Patient prüfen',flowProtocols:'Protokoll planen',flowSession:'Sitzung durchführen',flowExercises:'Aufgabenbibliothek',flowTutorial:'Produkttutorial',flowManual:'Betriebshandbuch',flowOutcomes:'Ergebnisse messen',flowResearch:'Forschung und Sicherheit',flowSettings:'Einstellungen',patientIdentity:'Profil und Ziele',patientIdentityHelp:'Rehabilitationskontext und funktionelles Ziel festlegen.',patientMeasures:'Klinische Messwerte',patientMeasuresHelp:'Beeinträchtigung, Schmerz und Hautstatus dokumentieren.',patientEligibility:'Eignungsentscheidung',patientEligibilityHelp:'Klinisch kontrollierte Bereitschaftsprüfungen abschließen.',protocolProgramme:'Programmstruktur',protocolProgrammeHelp:'Patient, Pfad, Setting und geplante Dosis auswählen.',protocolMovement:'Bewegungsverordnung',protocolMovementHelp:'Bewegungsfamilien, Bewegungsumfang, Geschwindigkeit und Eigenaktivität festlegen.',protocolProgression:'Progression und Transfer',protocolProgressionHelp:'Qualitätskriterium und unmittelbares funktionelles Transferziel definieren.'},
    ms:{previous:'Sebelumnya',next:'Seterusnya',section:'Aliran kerja',of:'daripada',caseload:'Senarai kes',profile:'Profil dan kelayakan',builder:'Preskripsi',pathway:'Laluan empat minggu',trajectory:'Trajektori',recordOutcome:'Rekod hasil',studySummary:'Ringkasan kajian',safetyRegister:'Daftar keselamatan',dataRegister:'Daftar data',preferences:'Keutamaan',dataGovernance:'Data dan tadbir urus',step:'Langkah',continue:'Teruskan',back:'Kembali',page:'Halaman',flowDashboard:'Pusat arahan',flowPatients:'Saring pesakit',flowProtocols:'Rancang protokol',flowSession:'Laksana sesi',flowExercises:'Pustaka tugas',flowTutorial:'Tutorial produk',flowManual:'Manual operasi',flowOutcomes:'Ukur hasil',flowResearch:'Penyelidikan dan keselamatan',flowSettings:'Tetapan',patientIdentity:'Profil dan matlamat',patientIdentityHelp:'Tetapkan konteks pemulihan dan matlamat fungsi.',patientMeasures:'Ukuran klinikal',patientMeasuresHelp:'Rekod kemerosotan, kesakitan dan keadaan kulit semasa.',patientEligibility:'Keputusan kelayakan',patientEligibilityHelp:'Lengkapkan pemeriksaan kesediaan yang dikawal klinikal.',protocolProgramme:'Struktur program',protocolProgrammeHelp:'Pilih pesakit, laluan, tempat dan dos yang dirancang.',protocolMovement:'Preskripsi pergerakan',protocolMovementHelp:'Tetapkan keluarga pergerakan, julat, kelajuan dan tuntutan sukarela.',protocolProgression:'Kemajuan dan pemindahan',protocolProgressionHelp:'Tetapkan gerbang kualiti dan sasaran pemindahan fungsi segera.'}
  };

  const FOCUS_CONFIG = {
    patients:{defaultView:'caseload',hostSelector:'.two-column',views:[{id:'caseload',key:'caseload',index:1},{id:'profile',key:'profile',index:0}]},
    prescribe:{defaultView:'builder',hostSelector:'.two-column',views:[{id:'builder',key:'builder',index:0},{id:'pathway',key:'pathway',index:1}]},
    outcomes:{defaultView:'trajectory',hostSelector:'.two-column',views:[{id:'trajectory',key:'trajectory',index:1},{id:'record',key:'recordOutcome',index:0}]},
    research:{defaultView:'summary',hostSelector:'.research-grid',views:[{id:'summary',key:'studySummary',index:0},{id:'safety',key:'safetyRegister',index:1},{id:'data',key:'dataRegister',index:2}]},
    settings:{defaultView:'preferences',hostSelector:'.two-column',views:[{id:'preferences',key:'preferences',index:0},{id:'data',key:'dataGovernance',index:1}]}
  };

  const localState = {};
  const steppers = new Map();
  let currentTab = document.querySelector('.tab-panel.active')?.id || 'dashboard';
  let exercisePage = 0;
  let exercisePager = null;
  let historyLock = false;
  const baseSwitchTab = window.switchTab;

  function languageKey() {
    const value = document.documentElement.lang || 'en';
    if (LABELS[value]) return value;
    if (value.toLowerCase().startsWith('zh')) return 'zh-Hans';
    const short = value.slice(0,2).toLowerCase();
    return LABELS[short] ? short : 'en';
  }

  function text(key) {
    const dictionary = LABELS[languageKey()] || LABELS.en;
    return dictionary[key] || LABELS.en[key] || key;
  }

  function flowLabel(item) {
    return text(item?.key || 'flowDashboard');
  }

  function visibleFlow() {
    return FLOW.filter(item => {
      const button = document.querySelector(`.tab-button[data-tab="${item.id}"]`);
      return button && !button.hidden;
    });
  }

  function parseLocation() {
    const raw = location.hash.replace(/^#/,'');
    const [tab,view] = raw.split('/');
    return { tab:FLOW.some(item => item.id === tab) ? tab : null, view:view || null };
  }

  function writeHistory(mode) {
    if (historyLock) return;
    const view = localState[currentTab] || '';
    const hash = `#${currentTab}${view ? `/${view}` : ''}`;
    const state = { mirrorCoach:true, tab:currentTab, view:view || null };
    if (mode === 'replace' || location.hash === hash) history.replaceState(state,'',hash);
    else history.pushState(state,'',hash);
  }

  function installWorkflowDock() {
    const app = document.getElementById('appView');
    if (!app || document.getElementById('workflowDock')) return;
    const dock = document.createElement('nav');
    dock.id = 'workflowDock';
    dock.className = 'workflow-dock';
    dock.setAttribute('aria-label','MirrorCoach workflow navigation');
    dock.innerHTML = `
      <button class="flow-prev" id="flowPrev" type="button"><span class="flow-arrow" aria-hidden="true">←</span><span class="flow-nav-copy"><small></small><strong></strong></span></button>
      <div class="flow-location"><small></small><strong></strong><span></span></div>
      <button class="flow-next" id="flowNext" type="button"><span class="flow-nav-copy"><small></small><strong></strong></span><span class="flow-arrow" aria-hidden="true">→</span></button>`;
    app.appendChild(dock);
    document.getElementById('flowPrev').addEventListener('click',() => navigateFlow(-1));
    document.getElementById('flowNext').addEventListener('click',() => navigateFlow(1));
    updateWorkflowDock();
  }

  function updateWorkflowDock() {
    const dock = document.getElementById('workflowDock');
    if (!dock) return;
    const flow = visibleFlow();
    let index = flow.findIndex(item => item.id === currentTab);
    if (index < 0) index = 0;
    const previous = flow[index - 1];
    const next = flow[index + 1];
    const previousButton = document.getElementById('flowPrev');
    const nextButton = document.getElementById('flowNext');
    const locationBox = dock.querySelector('.flow-location');
    previousButton.disabled = !previous;
    nextButton.disabled = !next;
    previousButton.querySelector('small').textContent = text('previous');
    nextButton.querySelector('small').textContent = text('next');
    previousButton.querySelector('strong').textContent = previous ? flowLabel(previous) : '—';
    nextButton.querySelector('strong').textContent = next ? flowLabel(next) : '—';
    previousButton.setAttribute('aria-label',previous ? `${text('previous')}: ${flowLabel(previous)}` : text('previous'));
    nextButton.setAttribute('aria-label',next ? `${text('next')}: ${flowLabel(next)}` : text('next'));
    locationBox.querySelector('small').textContent = text('section');
    locationBox.querySelector('strong').textContent = flowLabel(flow[index] || FLOW[0]);
    locationBox.querySelector('span').textContent = `${index + 1} ${text('of')} ${flow.length}`;
  }

  function navigateFlow(delta) {
    const flow = visibleFlow();
    const index = flow.findIndex(item => item.id === currentTab);
    const target = flow[index + delta];
    if (target) window.switchTab(target.id);
  }

  function installFocusViews() {
    Object.entries(FOCUS_CONFIG).forEach(([tabId,config]) => {
      const tab = document.getElementById(tabId);
      if (!tab || tab.dataset.focusReady === 'true') return;
      const host = tab.querySelector(config.hostSelector);
      if (!host) return;
      const children = [...host.children];
      const targets = config.views.map(view => children[view.index]);
      if (targets.some(target => !target)) return;
      tab.dataset.focusReady = 'true';
      tab.classList.add('focus-enhanced');
      host.classList.add('focus-layout-host');
      const nav = document.createElement('nav');
      nav.className = 'focus-switcher';
      nav.setAttribute('role','tablist');
      nav.setAttribute('aria-label',`${flowLabel(FLOW.find(item => item.id === tabId))} views`);
      config.views.forEach((view,index) => {
        const target = targets[index];
        target.classList.add('focus-view');
        target.dataset.focusView = view.id;
        target.setAttribute('role','tabpanel');
        target.id = target.id || `${tabId}-${view.id}-view`;
        const button = document.createElement('button');
        button.type = 'button';
        button.dataset.focusTarget = view.id;
        button.dataset.labelKey = view.key;
        button.setAttribute('role','tab');
        button.setAttribute('aria-controls',target.id);
        button.textContent = text(view.key);
        button.addEventListener('click',() => setFocusView(tabId,view.id,true,true));
        nav.appendChild(button);
      });
      tab.insertBefore(nav,host);
      localState[tabId] = config.defaultView;
      setFocusView(tabId,config.defaultView,false,false);
    });
  }

  function setFocusView(tabId,viewId,updateHistory,focusHeading) {
    const config = FOCUS_CONFIG[tabId];
    const tab = document.getElementById(tabId);
    if (!config || !tab) return;
    const host = tab.querySelector(config.hostSelector);
    const target = host?.querySelector(`[data-focus-view="${viewId}"]`);
    if (!target) return;
    host.querySelectorAll('[data-focus-view]').forEach(view => {
      const active = view.dataset.focusView === viewId;
      view.hidden = !active;
      view.setAttribute('aria-hidden',String(!active));
    });
    tab.querySelectorAll('.focus-switcher [data-focus-target]').forEach(button => {
      const active = button.dataset.focusTarget === viewId;
      button.setAttribute('aria-selected',String(active));
      button.tabIndex = active ? 0 : -1;
    });
    localState[tabId] = viewId;
    updateWorkflowDock();
    if (updateHistory) writeHistory('push');
    if (focusHeading && tab.classList.contains('active')) {
      const heading = target.querySelector('h2,h3');
      if (heading) {
        heading.tabIndex = -1;
        heading.focus({preventScroll:true});
        heading.scrollIntoView({behavior:'smooth',block:'start'});
      }
    }
  }

  function createStepHeader(titleKey,helpKey,index,total) {
    const header = document.createElement('div');
    header.className = 'form-step-heading';
    header.innerHTML = `<div><h3 data-step-title="${titleKey}">${text(titleKey)}</h3><p data-step-help="${helpKey}">${text(helpKey)}</p></div><span class="form-step-status">${text('step')} ${index + 1} ${text('of')} ${total}</span>`;
    return header;
  }

  function buildFormStepper(formId,definition) {
    const form = document.getElementById(formId);
    if (!form || form.dataset.stepperReady === 'true') return;
    const originalNodes = [...form.children];
    const nav = document.createElement('nav');
    nav.className = 'form-stepper-nav';
    nav.style.setProperty('--step-count',String(definition.steps.length));
    nav.setAttribute('aria-label',`${flowLabel(FLOW.find(item => item.id === definition.tabId))} steps`);
    const stage = document.createElement('div');
    stage.className = 'form-stepper-stage';
    const sections = [];
    let current = 0;
    let maxVisited = 0;

    definition.steps.forEach((step,index) => {
      const navButton = document.createElement('button');
      navButton.type = 'button';
      navButton.dataset.stepIndex = String(index);
      navButton.dataset.labelKey = step.titleKey;
      navButton.innerHTML = `<span>${index + 1}</span><b>${text(step.titleKey)}</b>`;
      nav.appendChild(navButton);

      const section = document.createElement('section');
      section.className = 'form-step';
      section.dataset.formStep = String(index);
      section.setAttribute('role','tabpanel');
      section.appendChild(createStepHeader(step.titleKey,step.helpKey,index,definition.steps.length));
      step.nodes.forEach(nodeIndex => {
        const node = originalNodes[nodeIndex];
        if (node) section.appendChild(node);
      });
      const actions = document.createElement('div');
      actions.className = 'form-step-actions';
      if (index > 0) {
        const back = document.createElement('button');
        back.type = 'button';
        back.className = 'secondary';
        back.dataset.stepBack = '';
        back.textContent = text('back');
        actions.appendChild(back);
      }
      if (index < definition.steps.length - 1) {
        const next = document.createElement('button');
        next.type = 'button';
        next.className = 'primary';
        next.dataset.stepNext = '';
        next.textContent = text('continue');
        actions.appendChild(next);
      } else {
        const submit = section.querySelector('button[type="submit"]');
        if (submit) actions.appendChild(submit);
      }
      section.appendChild(actions);
      sections.push(section);
      stage.appendChild(section);
    });

    form.prepend(stage);
    form.prepend(nav);
    form.dataset.stepperReady = 'true';

    function validateSection(index) {
      const controls = [...sections[index].querySelectorAll('input,select,textarea')].filter(control => control.type !== 'hidden');
      const invalid = controls.find(control => !control.checkValidity());
      if (invalid) {
        invalid.reportValidity();
        invalid.focus();
        return false;
      }
      return true;
    }

    function go(index,focus) {
      const bounded = Math.max(0,Math.min(index,sections.length - 1));
      current = bounded;
      maxVisited = Math.max(maxVisited,current);
      sections.forEach((section,sectionIndex) => {
        const active = sectionIndex === current;
        section.hidden = !active;
        section.setAttribute('aria-hidden',String(!active));
        section.querySelectorAll('input,select,textarea,button[type="submit"]').forEach(control => {
          control.disabled = !active;
        });
        const status = section.querySelector('.form-step-status');
        if (status) status.textContent = `${text('step')} ${sectionIndex + 1} ${text('of')} ${sections.length}`;
        section.querySelectorAll('[data-step-back]').forEach(button => button.textContent = text('back'));
        section.querySelectorAll('[data-step-next]').forEach(button => button.textContent = text('continue'));
      });
      [...nav.children].forEach((button,buttonIndex) => {
        const active = buttonIndex === current;
        button.setAttribute('aria-selected',String(active));
        button.disabled = buttonIndex > maxVisited + 1;
        button.tabIndex = active ? 0 : -1;
      });
      if (focus) {
        const heading = sections[current].querySelector('h3');
        if (heading) {
          heading.tabIndex = -1;
          heading.focus({preventScroll:true});
        }
      }
    }

    nav.addEventListener('click',event => {
      const button = event.target.closest('[data-step-index]');
      if (!button) return;
      const targetIndex = Number(button.dataset.stepIndex);
      if (targetIndex > current && !validateSection(current)) return;
      if (targetIndex <= maxVisited + 1) go(targetIndex,true);
    });
    stage.addEventListener('click',event => {
      if (event.target.closest('[data-step-back]')) go(current - 1,true);
      if (event.target.closest('[data-step-next]') && validateSection(current)) go(current + 1,true);
    });

    steppers.set(formId,{go,reset:() => {maxVisited = 0; go(0,false);},updateLanguage:() => {
      [...nav.querySelectorAll('[data-label-key]')].forEach(button => {
        const bold = button.querySelector('b');
        if (bold) bold.textContent = text(button.dataset.labelKey);
      });
      sections.forEach((section,index) => {
        const title = section.querySelector('[data-step-title]');
        const help = section.querySelector('[data-step-help]');
        if (title) title.textContent = text(title.dataset.stepTitle);
        if (help) help.textContent = text(help.dataset.stepHelp);
        const status = section.querySelector('.form-step-status');
        if (status) status.textContent = `${text('step')} ${index + 1} ${text('of')} ${sections.length}`;
        section.querySelectorAll('[data-step-back]').forEach(button => button.textContent = text('back'));
        section.querySelectorAll('[data-step-next]').forEach(button => button.textContent = text('continue'));
      });
    }});
    go(0,false);
  }

  function installFormSteppers() {
    buildFormStepper('patientForm',{
      tabId:'patients',
      steps:[
        {titleKey:'patientIdentity',helpKey:'patientIdentityHelp',nodes:[0,1,2,6,7]},
        {titleKey:'patientMeasures',helpKey:'patientMeasuresHelp',nodes:[3,4,5]},
        {titleKey:'patientEligibility',helpKey:'patientEligibilityHelp',nodes:[8,9,10]}
      ]
    });
    buildFormStepper('protocolForm',{
      tabId:'prescribe',
      steps:[
        {titleKey:'protocolProgramme',helpKey:'protocolProgrammeHelp',nodes:[0,1,2]},
        {titleKey:'protocolMovement',helpKey:'protocolMovementHelp',nodes:[3,4]},
        {titleKey:'protocolProgression',helpKey:'protocolProgressionHelp',nodes:[5,6,7]}
      ]
    });
  }

  function exercisePageSize() {
    if (window.innerWidth < 620) return 3;
    if (window.innerWidth < 1080) return 4;
    return 6;
  }

  function applyExercisePagination() {
    const grid = document.getElementById('exerciseGrid');
    if (!grid || !exercisePager) return;
    const cards = [...grid.children].filter(child => child.classList.contains('exercise-card'));
    if (!cards.length) {
      exercisePager.hidden = true;
      return;
    }
    exercisePager.hidden = false;
    const size = exercisePageSize();
    const pages = Math.max(1,Math.ceil(cards.length / size));
    exercisePage = Math.max(0,Math.min(exercisePage,pages - 1));
    cards.forEach((card,index) => { card.hidden = Math.floor(index / size) !== exercisePage; });
    exercisePager.querySelector('[data-exercise-prev]').disabled = exercisePage === 0;
    exercisePager.querySelector('[data-exercise-next]').disabled = exercisePage >= pages - 1;
    exercisePager.querySelector('.exercise-page-status').textContent = `${text('page')} ${exercisePage + 1} ${text('of')} ${pages}`;
  }

  function installExercisePager() {
    const grid = document.getElementById('exerciseGrid');
    if (!grid || document.getElementById('exercisePagination')) return;
    exercisePager = document.createElement('nav');
    exercisePager.id = 'exercisePagination';
    exercisePager.className = 'exercise-pagination';
    exercisePager.setAttribute('aria-label','Exercise catalogue pages');
    exercisePager.innerHTML = `<button class="secondary" data-exercise-prev type="button">← ${text('previous')}</button><span class="exercise-page-status" aria-live="polite"></span><button class="secondary" data-exercise-next type="button">${text('next')} →</button>`;
    grid.after(exercisePager);
    exercisePager.addEventListener('click',event => {
      if (event.target.closest('[data-exercise-prev]')) exercisePage--;
      if (event.target.closest('[data-exercise-next]')) exercisePage++;
      applyExercisePagination();
      grid.scrollIntoView({behavior:'smooth',block:'start'});
    });
    new MutationObserver(() => {
      exercisePage = 0;
      applyExercisePagination();
    }).observe(grid,{childList:true});
    ['exerciseFamilyFilter','exerciseLevelFilter'].forEach(id => document.getElementById(id)?.addEventListener('change',() => {exercisePage = 0; setTimeout(applyExercisePagination,0);}));
    let resizeTimer;
    window.addEventListener('resize',() => {clearTimeout(resizeTimer); resizeTimer = setTimeout(applyExercisePagination,120);});
    applyExercisePagination();
  }

  function enforceSingleManualSection() {
    const manual = document.getElementById('manualSections');
    if (!manual) return;
    manual.addEventListener('click',event => {
      const toggle = event.target.closest('.manual-toggle');
      if (!toggle) return;
      setTimeout(() => {
        const selected = toggle.closest('.manual-section');
        if (!selected?.classList.contains('open')) return;
        manual.querySelectorAll('.manual-section.open').forEach(section => {
          if (section !== selected) section.classList.remove('open');
        });
      },0);
    });
  }

  function bindFocusedActions() {
    document.getElementById('newPatientBtn')?.addEventListener('click',() => {
      setFocusView('patients','profile',true,false);
      steppers.get('patientForm')?.reset();
    });
    document.getElementById('patientCards')?.addEventListener('click',event => {
      if (event.target.closest('.edit-patient')) {
        setFocusView('patients','profile',true,false);
        steppers.get('patientForm')?.reset();
      }
    });
    document.getElementById('patientForm')?.addEventListener('submit',() => setTimeout(() => {
      steppers.get('patientForm')?.reset();
      setFocusView('patients','caseload',true,false);
    },0));
    document.getElementById('protocolForm')?.addEventListener('submit',() => setTimeout(() => {
      steppers.get('protocolForm')?.reset();
      setFocusView('prescribe','pathway',true,false);
    },0));
    document.getElementById('outcomeForm')?.addEventListener('submit',() => setTimeout(() => setFocusView('outcomes','trajectory',true,false),0));
  }

  function updateInterfaceLanguage() {
    document.querySelectorAll('.focus-switcher [data-label-key]').forEach(button => {button.textContent = text(button.dataset.labelKey);});
    steppers.forEach(stepper => stepper.updateLanguage());
    if (exercisePager) {
      exercisePager.querySelector('[data-exercise-prev]').textContent = `← ${text('previous')}`;
      exercisePager.querySelector('[data-exercise-next]').textContent = `${text('next')} →`;
      applyExercisePagination();
    }
    updateWorkflowDock();
  }

  function patchTabNavigation() {
    if (typeof baseSwitchTab !== 'function') return;
    window.switchTab = function (tabId,options) {
      const settings = options && typeof options === 'object' ? options : {};
      baseSwitchTab(tabId);
      currentTab = tabId;
      document.body.dataset.currentTab = tabId;
      const config = FOCUS_CONFIG[tabId];
      if (config) setFocusView(tabId,localState[tabId] || config.defaultView,false,false);
      updateWorkflowDock();
      if (!historyLock && settings.history !== false) writeHistory('push');
    };
  }

  function restoreLocation() {
    const locationState = parseLocation();
    if (!locationState.tab) {
      writeHistory('replace');
      return;
    }
    historyLock = true;
    window.switchTab(locationState.tab,{history:false});
    if (locationState.view && FOCUS_CONFIG[locationState.tab]) setFocusView(locationState.tab,locationState.view,false,false);
    historyLock = false;
    writeHistory('replace');
  }

  function bindHistory() {
    window.addEventListener('popstate',event => {
      const state = event.state?.mirrorCoach ? event.state : parseLocation();
      if (!state?.tab) return;
      historyLock = true;
      window.switchTab(state.tab,{history:false});
      if (state.view && FOCUS_CONFIG[state.tab]) setFocusView(state.tab,state.view,false,false);
      historyLock = false;
    });
  }

  function observeRoleAndLanguageChanges() {
    const nav = document.getElementById('tabNav');
    if (nav) new MutationObserver(updateWorkflowDock).observe(nav,{subtree:true,attributes:true,attributeFilter:['hidden','class']});
    new MutationObserver(updateInterfaceLanguage).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
  }

  function initFocusedWorkflow() {
    installFocusViews();
    installFormSteppers();
    installExercisePager();
    installWorkflowDock();
    enforceSingleManualSection();
    bindFocusedActions();
    patchTabNavigation();
    bindHistory();
    observeRoleAndLanguageChanges();
    restoreLocation();
    updateInterfaceLanguage();
    document.body.classList.add('focused-workflow-ready');
  }

  initFocusedWorkflow();
})();
