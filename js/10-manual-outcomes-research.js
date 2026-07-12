function renderManual() {
  const term = ($('manualSearch')?.value || '').trim().toLowerCase();
  const list = MANUAL_SECTIONS.filter(s => !term || `${s.title} ${s.keywords} ${s.html.replace(/<[^>]*>/g, ' ')}`.toLowerCase().includes(term));
  $('manualSections').innerHTML = list.length ? list.map((s, i) => `<article class="manual-section ${term || i === 0 ? 'open' : ''}" data-manual="${E(s.id)}"><button type="button" class="manual-toggle"><span>${E(s.title)}</span></button><div class="manual-content">${s.html}</div></article>`).join('') : '<div class="empty">No manual section matches the search.</div>';
}

function renderOutcomes() {
  const patientId = $('outcomePatient')?.value || state.patients[0]?.id;
  const list = outcomesForPatient(patientId);
  $('outcomeVisuals').innerHTML = list.length ? list.map(o => {
    const base = N(o.baseline), current = N(o.current), target = N(o.target);
    let progress = 0;
    if (o.direction === 'Lower is better') progress = base === target ? 100 : clamp((base - current) / (base - target) * 100, 0, 100);
    else progress = target === base ? 100 : clamp((current - base) / (target - base) * 100, 0, 100);
    return `<article class="trajectory-card"><h3>${E(o.measure)}</h3><div class="trajectory-values"><span>Baseline<b>${E(o.baseline)}</b></span><span>Current<b>${E(o.current)}</b></span><span>Target<b>${E(o.target)}</b></span></div><div class="trajectory-bar"><i style="width:${progress}%"></i></div><small>${Math.round(progress)}% of numeric baseline-to-target path · no clinical significance inferred</small></article>`;
  }).join('') : '<div class="empty">No outcomes recorded for this patient.</div>';
  $('outcomeList').innerHTML = list.map(o => `<article class="outcome-card"><div class="card-top"><div><h3>${E(o.measure)}</h3><p>${fmtDate(o.date)} · ${E(o.direction)}</p></div><span class="badge info">Recorded</span></div><p>${E(o.note || 'No context note.')}</p></article>`).join('');
}

function saveOutcome(event) {
  event.preventDefault();
  state.outcomes.unshift({ id: uid('outcome'), patientId: $('outcomePatient').value, measure: $('outcomeMeasure').value, baseline: N($('outcomeBaseline').value), current: N($('outcomeCurrent').value), target: N($('outcomeTarget').value), date: $('outcomeDate').value || today(), direction: $('outcomeDirection').value, note: $('outcomeNote').value.trim(), createdAt: new Date().toISOString() });
  saveState(); event.target.reset(); $('outcomeDate').value = today(); renderAll(); showStatus('Outcome recorded.');
}

function renderResearch() {
  const sessions = state.sessions;
  const total = sessions.length; const withGaze = sessions.filter(s => Number.isFinite(Number(s.gaze))).length; const withTransfer = sessions.filter(s => Number.isFinite(Number(s.transferAttempted))).length; const deviations = sessions.filter(s => s.deviation).length;
  $('fidelitySummary').innerHTML = [
    ['Sessions documented', total], ['Mirror-gaze field complete', `${withGaze}/${total || 0}`], ['Transfer field complete', `${withTransfer}/${total || 0}`], ['Protocol deviations', deviations], ['Safety register entries', state.events.length]
  ].map(([k, v]) => `<div class="metric-row"><span>${E(k)}</span><strong>${E(v)}</strong></div>`).join('');
  $('researchTable').innerHTML = sessions.map(s => { const p = getPatient(s.patientId); return `<tr><td>${fmtDate(s.date)}</td><td>${E(p?.label || s.patientId)}</td><td>${E(s.activeMinutes)}</td><td>${E(s.reps)}</td><td>${E(s.painPre)} / ${E(s.painPost)}</td><td>${E(s.gaze)}%</td><td>${E(s.transfer)}/${E(s.transferAttempted)}</td><td>${E(s.deviation || 'None')}</td></tr>`; }).join('');
}

function saveEvent(event) {
  event.preventDefault();
  state.events.unshift({ id: uid('event'), patientId: $('eventPatient').value, date: today(), type: $('eventType').value, severity: $('eventSeverity').value, description: $('eventDescription').value.trim(), createdAt: new Date().toISOString() });
  saveState(); event.target.reset(); renderAll(); showStatus('Event added to the local safety register.');
}

function renderSettings() {
  $('settingsOrg').value = state.settings.organisation || '';
  $('settingsPain').value = N(state.settings.painThreshold, 4);
  $('settingsAudio').checked = !!state.settings.audio;
}

function saveSettings() {
  state.settings = { organisation: $('settingsOrg').value.trim(), painThreshold: N($('settingsPain').value, 4), audio: $('settingsAudio').checked };
  saveState(); if (user) { user.org = state.settings.organisation; saveUser(); showApp(); } showStatus('Settings saved.');
}

function download(name, text, type = 'application/json') {
  const blob = new Blob([text], { type }); const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = name; a.click(); setTimeout(() => URL.revokeObjectURL(url), 1000);
}
function exportJson() { download(`mirrorcoach-backup-${today()}.json`, JSON.stringify(state, null, 2)); }
function exportCsv() {
  const columns = ['date','patientId','caseLabel','protocolId','activeMinutes','reps','painPre','painPost','gaze','transfer','transferAttempted','initiation','deviceFault','deviation','notes'];
  const rows = state.sessions.map(s => ({ ...s, caseLabel: getPatient(s.patientId)?.label || '' }));
  const csv = [columns.join(','), ...rows.map(r => columns.map(c => `"${String(r[c] ?? '').replaceAll('"','""')}"`).join(','))].join('\n');
  download(`mirrorcoach-sessions-${today()}.csv`, csv, 'text/csv');
}
function restoreJson(file) {
  const reader = new FileReader(); reader.onload = () => { try { state = normaliseState(JSON.parse(reader.result)); saveState(); resetSessionDraft(); renderAll(); showStatus('Backup restored.'); } catch { showStatus('The selected file is not a valid MirrorCoach backup.', 'error'); } }; reader.readAsText(file);
}

function renderAll() {
  populateMovementFamilySelects(); renderPatientOptions(); renderDashboard(); renderPatients(); renderProtocolPreview(); renderExercises(); renderTutorialSteps(); renderManual(); renderOutcomes(); renderResearch(); renderSettings();
}
