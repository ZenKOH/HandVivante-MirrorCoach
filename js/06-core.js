function initials(name) {
  return String(name || 'User').split(/\s+/).filter(Boolean).slice(0, 2).map(x => x[0].toUpperCase()).join('');
}
function roleLabel(role) {
  return ({ clinician: 'Clinician', patient: 'Patient / caregiver', researcher: 'Researcher', admin: 'Clinic administrator' })[role] || role;
}
function getPatient(id) { return state.patients.find(p => p.id === id); }
function getProtocol(id) { return state.protocols.find(p => p.id === id); }
function protocolsForPatient(patientId) { return state.protocols.filter(p => p.patientId === patientId); }
function sessionsForPatient(patientId) { return state.sessions.filter(s => s.patientId === patientId); }
function outcomesForPatient(patientId) { return state.outcomes.filter(o => o.patientId === patientId); }

function showLogin() {
  $('loginView').hidden = false;
  $('appView').hidden = true;
  if (user) {
    $('loginName').value = user.name || '';
    $('loginRole').value = user.role || 'clinician';
    $('loginOrg').value = user.org || '';
  }
}

function showApp() {
  $('loginView').hidden = true;
  $('appView').hidden = false;
  $('userInitials').textContent = initials(user.name);
  $('userName').textContent = user.name;
  $('userMeta').textContent = `${roleLabel(user.role)} · ${user.org || state.settings.organisation}`;
  document.querySelectorAll('[data-roles]').forEach((el) => {
    const roles = el.dataset.roles.split(',');
    el.hidden = !roles.includes(user.role);
  });
  const active = document.querySelector('.tab-button.active:not([hidden])') || document.querySelector('.tab-button:not([hidden])');
  if (active) switchTab(active.dataset.tab);
  renderAll();
}

function switchTab(tabId) {
  const targetButton = document.querySelector(`.tab-button[data-tab="${tabId}"]`);
  if (!targetButton || targetButton.hidden) return;
  document.querySelectorAll('.tab-button').forEach(b => b.classList.toggle('active', b.dataset.tab === tabId));
  document.querySelectorAll('.tab-panel').forEach(panel => {
    const isTarget = panel.id === tabId;
    panel.classList.toggle('active', isTarget);
    panel.hidden = !isTarget;
  });
  if (tabId === 'session') renderSession();
  if (tabId === 'tutorial') renderTutorial();
  if (tabId === 'manual') renderManual();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function populateSelect(selectId, items, selectedValue, labelFn = (x) => x.label, valueFn = (x) => x.id, includeAll = false) {
  const select = $(selectId); if (!select) return;
  const previous = selectedValue ?? select.value;
  select.innerHTML = `${includeAll ? '<option value="all">All patients</option>' : ''}${items.map(x => `<option value="${E(valueFn(x))}">${E(labelFn(x))}</option>`).join('')}`;
  if ([...select.options].some(o => o.value === previous)) select.value = previous;
}

function renderPatientOptions() {
  ['protocolPatient', 'sessionPatient', 'outcomePatient', 'eventPatient'].forEach(id => populateSelect(id, state.patients));
  populateSelect('dashboardPatientFilter', state.patients, $('dashboardPatientFilter')?.value, p => p.label, p => p.id, true);
  const patientId = $('sessionPatient')?.value || state.patients[0]?.id;
  populateSelect('sessionProtocol', protocolsForPatient(patientId), $('sessionProtocol')?.value, p => `${pathwayLabel(p.pathway)} · ${p.family1} + ${p.family2}`);
}

function pathwayLabel(pathway) {
  return ({ severe: 'Severe', moderate: 'Moderate', mild: 'Mild' })[pathway] || pathway;
}

function adherenceFor(patientId) {
  const protocol = protocolsForPatient(patientId)[0];
  if (!protocol) return 0;
  const completed = sessionsForPatient(patientId).filter(s => isWithin7Days(s.date)).length;
  return clamp(Math.round((completed / protocol.frequency) * 100), 0, 100);
}

function patientEligibility(patient) {
  const checks = patient.eligibleChecks || {};
  const numeric = N(patient.brunnstrom) >= 2 && N(String(patient.mas).replace('+', '.5')) < 3 && (!patient.mmse || N(patient.mmse) >= 24);
  const checksPass = checks.stable && checks.msk && checks.skin && checks.cognition;
  return { numeric, checksPass, suitable: numeric && checksPass && patient.skin === 'Intact' };
}

function reviewFlags(patient) {
  const flags = [];
  const recent = sessionsForPatient(patient.id).filter(s => isWithin7Days(s.date));
  const threshold = N(state.settings.painThreshold, 4);
  if (!recent.length) flags.push({ type: 'warning', title: 'No session in the last 7 days', text: 'Review continuity, documentation, and prescribed frequency.' });
  if (recent.some(s => N(s.painPost) > threshold || N(s.painPost) - N(s.painPre) > 2)) flags.push({ type: 'risk', title: 'Pain threshold crossed', text: 'Review task, range, fit, tone, and the need for clinical reassessment.' });
  if (recent.some(s => s.deviceFault)) flags.push({ type: 'risk', title: 'Device synchronisation or fault event', text: 'Remove equipment from use until the issue is resolved under the IFU and local process.' });
  if (recent.length >= 2 && avg(recent.map(s => N(s.gaze))) < 75) flags.push({ type: 'warning', title: 'Mirror-gaze fidelity is low', text: 'Review mirror alignment, cueing, visual attention, and task complexity.' });
  if (recent.length >= 2 && recent.every(s => N(s.transfer) === 0)) flags.push({ type: 'warning', title: 'No functional transfer documented', text: 'Revisit task specificity and immediate post-device practice.' });
  if (!patientEligibility(patient).suitable) flags.push({ type: 'risk', title: 'Eligibility requires review', text: 'One or more screening criteria or readiness checks are not met.' });
  if (!flags.length) flags.push({ type: 'good', title: 'No major rule-based flags', text: 'Continue monitoring dose, quality, pain, skin, synchrony, and functional transfer.' });
  return flags;
}
