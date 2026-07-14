const FRAGMENTS = ['fragments/00-shell-dashboard.html', 'fragments/01-clinical-planning.html', 'fragments/02-session-learning.html', 'fragments/03-outcomes-research-close.html'];
const APP_SCRIPTS = ['js/01-base.js', 'js/02-exercises.js', 'js/03-tutorial-content.js', 'js/04-manual-content.js', 'js/05-sample-state.js', 'js/06-core.js', 'js/07-patients-protocols.js', 'js/08-session.js', 'js/09-library-tutorial.js', 'js/10-manual-outcomes-research.js', 'js/11-init.js', 'js/12-international-ui.js', 'js/13-focus-navigation.js', 'js/14-metric-insights.js'];
const BUILD_VERSION = '20260714-3';
async function loadMirrorCoach() {
  const root = document.getElementById('mirrorcoachRoot');
  try {
    const responses = await Promise.all(FRAGMENTS.map(path => fetch(`${path}?v=${BUILD_VERSION}`)));
    if (responses.some(response => !response.ok)) throw new Error('One or more interface fragments could not be loaded.');
    root.innerHTML = (await Promise.all(responses.map(response => response.text()))).join('');
    for (const src of APP_SCRIPTS) {
      await new Promise((resolve, reject) => {
        const script = document.createElement('script'); script.src = `${src}?v=${BUILD_VERSION}`; script.onload = resolve; script.onerror = reject; document.body.appendChild(script);
      });
    }
  } catch (error) {
    root.innerHTML = `<main class="boot-error"><h1>MirrorCoach could not load</h1><p>${String(error.message || error)}</p><button onclick="location.reload()">Try again</button></main>`;
  }
}
loadMirrorCoach();
