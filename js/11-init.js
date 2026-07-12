function bindEvents() {
  $('loginForm').addEventListener('submit', (event) => { event.preventDefault(); user = { name: $('loginName').value.trim(), role: $('loginRole').value, org: $('loginOrg').value.trim() }; saveUser(); showApp(); });
  $('logoutBtn').addEventListener('click', () => { localStorage.removeItem(USER_KEY); user = null; stopTimer(); showLogin(); });
  $('tabNav').addEventListener('click', (event) => { const btn = event.target.closest('.tab-button'); if (btn) switchTab(btn.dataset.tab); });
  document.addEventListener('click', (event) => { const go = event.target.closest('[data-go]'); if (go) switchTab(go.dataset.go); });
  $('loadDemoBtn').addEventListener('click', () => { if (confirm('Replace local prototype records with the synthetic demonstration dataset?')) { state = sampleData(); saveState(); resetSessionDraft(); renderAll(); showStatus('Synthetic demo reloaded.'); } });
  $('exportJsonBtn').addEventListener('click', exportJson); $('backupBtn').addEventListener('click', exportJson); $('exportCsvBtn').addEventListener('click', exportCsv);
  $('patientForm').addEventListener('submit', savePatient); $('newPatientBtn').addEventListener('click', clearPatientForm);
  ['patientBrunnstrom','patientMas','patientMmse','patientSkin','eligStable','eligMsk','eligSkin','eligCognition'].forEach(id => $(id).addEventListener('input', renderEligibilitySummary));
  $('patientCards').addEventListener('click', (event) => {
    const edit = event.target.closest('.edit-patient'); if (edit) return editPatient(edit.dataset.id);
    const prescribe = event.target.closest('.go-prescribe'); if (prescribe) { switchTab('prescribe'); $('protocolPatient').value = prescribe.dataset.id; loadProtocolForPatient(prescribe.dataset.id); }
    const session = event.target.closest('.go-session'); if (session) { switchTab('session'); $('sessionPatient').value = session.dataset.id; resetSessionDraft(); renderSession(); }
  });
  $('protocolForm').addEventListener('submit', saveProtocol); $('protocolPatient').addEventListener('change', () => loadProtocolForPatient($('protocolPatient').value));
  $('protocolForm').addEventListener('input', renderProtocolPreview);
  $('dashboardPatientFilter').addEventListener('change', renderDashboard);
  $('sessionPatient').addEventListener('change', () => { resetSessionDraft(); renderSession(); }); $('sessionProtocol').addEventListener('change', () => { collectPhaseInputs(); sessionDraft.protocolId = $('sessionProtocol').value; renderSession(); });
  $('timerStartBtn').addEventListener('click', startTimer); $('timerPauseBtn').addEventListener('click', stopTimer); $('timerResetBtn').addEventListener('click', resetPhaseTimer);
  $('phaseTabs').addEventListener('click', e => { const b = e.target.closest('[data-phase]'); if (b) goToPhase(N(b.dataset.phase)); });
  $('prevPhaseBtn').addEventListener('click', () => goToPhase(phaseIndex - 1)); $('completePhaseBtn').addEventListener('click', completePhase);
  $('phaseContent').addEventListener('input', collectPhaseInputs);
  $('exerciseFamilyFilter').addEventListener('change', renderExercises); $('exerciseLevelFilter').addEventListener('change', renderExercises);
  $('exerciseGrid').addEventListener('click', e => { const b = e.target.closest('.exercise-details'); if (b) openExercise(b.dataset.id); });
  $('closeExerciseDialog').addEventListener('click', () => $('exerciseDialog').close());
  $('tutorialSteps').addEventListener('click', e => { const b = e.target.closest('[data-tutorial]'); if (b) { tutorialIndex = N(b.dataset.tutorial); renderTutorial(); } });
  $('tutorialPrevBtn').addEventListener('click', () => { tutorialIndex = clamp(tutorialIndex - 1, 0, TUTORIAL_STEPS.length - 1); renderTutorial(); }); $('tutorialNextBtn').addEventListener('click', completeTutorialStep);
  $('tutorialContent').addEventListener('submit', e => { if (e.target.id === 'tutorialQuiz') scoreQuiz(e); });
  $('manualSearch').addEventListener('input', renderManual); $('manualSections').addEventListener('click', e => { const b = e.target.closest('.manual-toggle'); if (b) b.closest('.manual-section').classList.toggle('open'); }); $('printManualBtn').addEventListener('click', () => window.print());
  $('outcomePatient').addEventListener('change', renderOutcomes); $('outcomeForm').addEventListener('submit', saveOutcome); $('outcomeDate').value = today();
  $('eventForm').addEventListener('submit', saveEvent); $('saveSettingsBtn').addEventListener('click', saveSettings);
  $('clearDataBtn').addEventListener('click', () => { if (confirm('Erase all local MirrorCoach prototype records from this browser?')) { state = { ...sampleData(), patients: [], protocols: [], sessions: [], outcomes: [], events: [] }; saveState(); resetSessionDraft(); renderAll(); showStatus('Local prototype data erased.'); } });
  $('restoreInput').addEventListener('change', e => { const file = e.target.files?.[0]; if (file) restoreJson(file); e.target.value = ''; });
}

function init() {
  bindEvents();
  populateMovementFamilySelects();
  $('sessionDate').value = today();
  resetSessionDraft();
  clearPatientForm();
  if (user) showApp(); else showLogin();
  if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js').catch(() => {});
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
