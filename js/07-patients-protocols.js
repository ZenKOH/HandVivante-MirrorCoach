function renderDashboard() {
  const filter = $('dashboardPatientFilter')?.value || 'all';
  const patients = filter === 'all' ? state.patients : state.patients.filter(p => p.id === filter);
  const recentSessions = state.sessions.filter(s => isWithin7Days(s.date) && (filter === 'all' || s.patientId === filter));
  $('statMinutes').textContent = recentSessions.reduce((a, s) => a + N(s.activeMinutes), 0);
  $('statReps').textContent = recentSessions.reduce((a, s) => a + N(s.reps), 0);
  $('statSessions').textContent = recentSessions.length;
  $('statFlags').textContent = patients.reduce((n, p) => n + reviewFlags(p).filter(f => f.type !== 'good').length, 0);

  $('doseChart').innerHTML = patients.length ? patients.map(p => {
    const protocol = protocolsForPatient(p.id)[0];
    const actual = sessionsForPatient(p.id).filter(s => isWithin7Days(s.date)).reduce((a, s) => a + N(s.activeMinutes), 0);
    const target = protocol ? protocol.frequency * protocol.minutes : 0;
    const percent = target ? clamp(Math.round(actual / target * 100), 0, 120) : 0;
    return `<div class="dose-row"><div class="label"><strong>${E(p.label)}</strong><small>${E(protocol ? `${protocol.frequency} × ${protocol.minutes} min` : 'No prescription')}</small></div><div class="dose-track"><i style="width:${Math.min(percent, 100)}%"></i></div><strong>${actual}/${target || '—'} min</strong></div>`;
  }).join('') : '<div class="empty">No patients in scope.</div>';

  const prompts = patients.flatMap(p => reviewFlags(p).slice(0, 2).map(f => ({ ...f, patient: p.label }))).slice(0, 6);
  $('reviewPrompts').innerHTML = prompts.map(f => `<article class="prompt-card ${f.type}"><strong>${E(f.title)} · ${E(f.patient)}</strong><p>${E(f.text)}</p></article>`).join('');

  $('dashboardPatientTable').innerHTML = patients.map(p => {
    const status = patientEligibility(p).suitable ? (reviewFlags(p).some(f => f.type === 'risk') ? ['risk', 'Review'] : ['good', 'Eligible']) : ['risk', 'Screen'];
    return `<tr><td><strong>${E(p.label)}</strong><br><span>${E(p.goal)}</span></td><td>${E(p.phase)}</td><td>${E(p.brunnstrom)}</td><td>${E(p.mas)}</td><td>${E(p.fma)}</td><td>${E(p.arat)}</td><td>${adherenceFor(p.id)}%</td><td><span class="badge ${status[0]}">${status[1]}</span></td></tr>`;
  }).join('');
}

function clearPatientForm() {
  $('patientForm').reset();
  $('patientId').value = '';
  $('patientBrunnstrom').value = 3;
  $('patientMas').value = '1+';
  $('patientMmse').value = 27;
  $('patientFma').value = 28;
  $('patientArat').value = 14;
  $('patientPain').value = 1;
  renderEligibilitySummary();
}

function renderEligibilitySummary() {
  const pseudo = {
    brunnstrom: N($('patientBrunnstrom')?.value), mas: $('patientMas')?.value,
    mmse: N($('patientMmse')?.value), skin: $('patientSkin')?.value,
    eligibleChecks: { stable: $('eligStable')?.checked, msk: $('eligMsk')?.checked, skin: $('eligSkin')?.checked, cognition: $('eligCognition')?.checked }
  };
  const result = patientEligibility(pseudo);
  const el = $('eligibilitySummary'); if (!el) return;
  el.className = `eligibility-summary ${result.suitable ? '' : 'risk'}`;
  el.innerHTML = result.suitable
    ? '<strong>Screening criteria appear complete.</strong> Final suitability, mode, range, and dose remain clinician decisions.'
    : '<strong>Eligibility requires review.</strong> Check Brunnstrom ≥2, MAS &lt;3, cognition/support, physiological stability, musculoskeletal tolerance, and skin integrity.';
}

function renderPatients() {
  $('patientCards').innerHTML = state.patients.length ? state.patients.map(p => {
    const eligible = patientEligibility(p).suitable;
    return `<article class="patient-card"><div class="card-top"><div><h3>${E(p.label)}</h3><p>${E(p.condition)} · ${E(p.phase)}</p></div><span class="badge ${eligible ? 'good' : 'risk'}">${eligible ? 'Eligible screen' : 'Review screen'}</span></div><p>${E(p.goal)}</p><div class="mini-metrics"><span>BRS ${E(p.brunnstrom)}</span><span>MAS ${E(p.mas)}</span><span>FMA-UE ${E(p.fma)}</span><span>ARAT ${E(p.arat)}</span><span>${adherenceFor(p.id)}% weekly adherence</span></div><div class="card-actions"><button class="secondary mini edit-patient" data-id="${E(p.id)}">Edit</button><button class="secondary mini go-prescribe" data-id="${E(p.id)}">Prescribe</button><button class="secondary mini go-session" data-id="${E(p.id)}">Session</button></div></article>`;
  }).join('') : '<div class="empty">No patient records.</div>';
}

function editPatient(id) {
  const p = getPatient(id); if (!p) return;
  $('patientId').value = p.id; $('patientLabel').value = p.label; $('patientCondition').value = p.condition; $('patientPhase').value = p.phase;
  $('patientBrunnstrom').value = p.brunnstrom; $('patientMas').value = p.mas; $('patientMmse').value = p.mmse; $('patientFma').value = p.fma; $('patientArat').value = p.arat;
  $('patientPain').value = p.pain; $('patientSkin').value = p.skin; $('patientGoal').value = p.goal; $('patientPrecautions').value = p.precautions || '';
  $('eligStable').checked = !!p.eligibleChecks?.stable; $('eligMsk').checked = !!p.eligibleChecks?.msk; $('eligSkin').checked = !!p.eligibleChecks?.skin; $('eligCognition').checked = !!p.eligibleChecks?.cognition;
  renderEligibilitySummary();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function savePatient(event) {
  event.preventDefault();
  const id = $('patientId').value || uid('case');
  const existing = getPatient(id);
  const patient = {
    id, label: $('patientLabel').value.trim(), condition: $('patientCondition').value, phase: $('patientPhase').value,
    brunnstrom: N($('patientBrunnstrom').value), mas: $('patientMas').value, mmse: N($('patientMmse').value), fma: N($('patientFma').value), arat: N($('patientArat').value),
    pain: N($('patientPain').value), skin: $('patientSkin').value, goal: $('patientGoal').value.trim(), precautions: $('patientPrecautions').value.trim(),
    eligibleChecks: { stable: $('eligStable').checked, msk: $('eligMsk').checked, skin: $('eligSkin').checked, cognition: $('eligCognition').checked },
    createdAt: existing?.createdAt || new Date().toISOString(), updatedAt: new Date().toISOString()
  };
  if (existing) state.patients = state.patients.map(p => p.id === id ? patient : p); else state.patients.push(patient);
  saveState(); clearPatientForm(); renderAll(); showStatus('Patient record saved.');
}

function populateMovementFamilySelects() {
  ['protocolFamily1', 'protocolFamily2'].forEach((id, idx) => {
    const el = $(id); if (!el) return;
    const current = el.value;
    el.innerHTML = MOVEMENT_FAMILIES.map(f => `<option>${E(f)}</option>`).join('');
    if (current && MOVEMENT_FAMILIES.includes(current)) el.value = current;
    else el.value = idx === 0 ? 'Finger individuation' : 'Cylindrical power grasp / release';
  });
  const families = ['all', ...MOVEMENT_FAMILIES];
  $('exerciseFamilyFilter').innerHTML = families.map(f => `<option value="${E(f)}">${f === 'all' ? 'All movement families' : E(f)}</option>`).join('');
}

function protocolFromForm() {
  return {
    patientId: $('protocolPatient').value, pathway: $('protocolPathway').value, setting: $('protocolSetting').value,
    frequency: N($('protocolFrequency').value), minutes: N($('protocolMinutes').value), weeks: N($('protocolWeeks').value),
    family1: $('protocolFamily1').value, family2: $('protocolFamily2').value, range: $('protocolRange').value, speed: $('protocolSpeed').value,
    demand: $('protocolDemand').value, gate: $('protocolGate').value.trim(), transfer: $('protocolTransfer').value.trim()
  };
}

function renderProtocolPreview() {
  const p = protocolFromForm();
  if (!$('protocolPreview')) return;
  const content = [
    { week: 1, title: 'Fit, safety and embodiment', bullets: [`${p.range}; ${p.speed.toLowerCase()} movement`, p.pathway === 'severe' ? 'Passive-follow with explicit motor imagery and attempted initiation' : p.demand, `Families: ${p.family1} + ${p.family2}`, 'Immediate unassisted transfer after every session'] },
    { week: 2, title: 'Range and repetition', bullets: ['Increase comfortable range before speed', 'Increase cycles only when pain, skin, tone and quality remain acceptable', 'Reduce cue frequency without reducing mirror attention', `Review gate: ${p.gate}`] },
    { week: 3, title: 'Task complexity', bullets: ['Introduce lightweight, non-breakable real objects', 'Link both movement families to the functional goal', 'Monitor trunk and shoulder compensation', 'Keep one main progression variable at a time'] },
    { week: 4, title: 'Volitional demand and transfer', bullets: ['Patient initiates immediately before robotic movement', 'Trial reduced assistance when approved', `Transfer target: ${p.transfer}`, 'Repeat baseline outcome conditions at block completion'] }
  ];
  $('protocolPreview').innerHTML = `<div class="protocol-card"><h3>${pathwayLabel(p.pathway)} pathway</h3><p>${p.frequency} sessions/week · ${p.minutes} minutes · ${p.weeks} weeks · ${E(p.setting)}</p><div class="mini-metrics"><span>${E(p.family1)}</span><span>${E(p.family2)}</span><span>${E(p.demand)}</span></div></div><div class="protocol-weeks">${content.map(w => `<article class="week-card"><b>Week ${w.week}</b><h3>${E(w.title)}</h3><ul>${w.bullets.map(x => `<li>${E(x)}</li>`).join('')}</ul></article>`).join('')}</div>`;
}

function saveProtocol(event) {
  event.preventDefault();
  const data = protocolFromForm();
  const existing = state.protocols.find(p => p.patientId === data.patientId);
  const protocol = { id: existing?.id || uid('protocol'), ...data, createdAt: existing?.createdAt || new Date().toISOString(), updatedAt: new Date().toISOString() };
  if (existing) state.protocols = state.protocols.map(p => p.id === existing.id ? protocol : p); else state.protocols.push(protocol);
  saveState(); renderAll(); showStatus('Prescription saved.');
}

function loadProtocolForPatient(patientId) {
  const p = protocolsForPatient(patientId)[0];
  if (!p) return renderProtocolPreview();
  $('protocolPathway').value = p.pathway; $('protocolSetting').value = p.setting; $('protocolFrequency').value = p.frequency; $('protocolMinutes').value = p.minutes; $('protocolWeeks').value = p.weeks;
  $('protocolFamily1').value = p.family1; $('protocolFamily2').value = p.family2; $('protocolRange').value = p.range; $('protocolSpeed').value = p.speed; $('protocolDemand').value = p.demand;
  $('protocolGate').value = p.gate; $('protocolTransfer').value = p.transfer;
  renderProtocolPreview();
}
