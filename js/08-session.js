function resetSessionDraft() {
  const patientId = $('sessionPatient')?.value || state.patients[0]?.id;
  const protocolId = $('sessionProtocol')?.value || protocolsForPatient(patientId)[0]?.id;
  const protocol = getProtocol(protocolId) || protocolsForPatient(patientId)[0];
  sessionDraft = {
    patientId, protocolId: protocol?.id || '', date: $('sessionDate')?.value || today(), painPre: getPatient(patientId)?.pain || 0, painPost: getPatient(patientId)?.pain || 0,
    skinChecked: false, sensationChecked: false, toneChecked: false, postureChecked: false,
    sensorFit: false, robotFit: false, alignment: false, synchrony: false,
    primingOpenClose: 5, primingSequence: 3, primingOpposition: 2,
    block1Reps: 20, block2Reps: 20, gaze: 85, assists: 0, compensations: 0,
    transferAttempted: 3, transfer: 0, initiation: 'Not observed', deviceFault: false, deviation: '', notes: ''
  };
  completedPhases = new Set(); phaseIndex = 0; phaseSecondsLeft = PHASES[0].seconds; stopTimer();
}

function renderPhaseTabs() {
  $('phaseTabs').innerHTML = PHASES.map((p, i) => `<button type="button" class="phase-tab ${i === phaseIndex ? 'active' : ''} ${completedPhases.has(i) ? 'done' : ''}" data-phase="${i}">${p.letter} · ${p.name} · ${Math.round(p.seconds / 60)} min</button>`).join('');
}
function updateTimerUI() {
  const phase = PHASES[phaseIndex];
  const total = phase.seconds; const elapsed = total - phaseSecondsLeft; const deg = clamp(elapsed / total * 360, 0, 360);
  const min = String(Math.floor(phaseSecondsLeft / 60)).padStart(2, '0'); const sec = String(phaseSecondsLeft % 60).padStart(2, '0');
  $('phaseLetter').textContent = phase.letter; $('phaseName').textContent = phase.name; $('timerDisplay').textContent = `${min}:${sec}`;
  $('timerRing').style.background = `conic-gradient(var(--accent) ${deg}deg, rgba(255,255,255,.08) ${deg}deg)`;
  renderPhaseTabs();
}
function startTimer() {
  if (timerInterval) return;
  timerInterval = setInterval(() => {
    if (phaseSecondsLeft > 0) phaseSecondsLeft--;
    else { stopTimer(); speak(`${PHASES[phaseIndex].name} time complete`); showStatus(`${PHASES[phaseIndex].name} timer complete.`); }
    updateTimerUI();
  }, 1000);
}
function stopTimer() { if (timerInterval) clearInterval(timerInterval); timerInterval = null; }
function resetPhaseTimer() { stopTimer(); phaseSecondsLeft = PHASES[phaseIndex].seconds; updateTimerUI(); }
function speak(text) { if (state.settings.audio && 'speechSynthesis' in window) { speechSynthesis.cancel(); speechSynthesis.speak(new SpeechSynthesisUtterance(text)); } }

function phaseContentHtml(index) {
  const patient = getPatient(sessionDraft.patientId) || state.patients[0];
  const protocol = getProtocol(sessionDraft.protocolId) || protocolsForPatient(patient?.id)[0];
  if (index === 0) return `<div class="phase-card"><p class="eyebrow">Phase A · 3 minutes</p><h2>Safety & readiness</h2><p class="phase-lead">Confirm today’s status before any robotic movement.</p><div class="grid-2"><label>Current pain (0-10)<input data-draft="painPre" type="number" min="0" max="10" value="${N(sessionDraft.painPre)}"></label><label>Finger flexor MAS today<select data-draft="masToday"><option>0</option><option>1</option><option selected>1+</option><option>2</option><option>3</option><option>4</option></select></label></div><div class="phase-checks"><label class="check-row"><input data-draft="skinChecked" type="checkbox" ${sessionDraft.skinChecked ? 'checked' : ''}><span>Skin and contact areas inspected: no open area, unsafe redness, swelling, or pressure concern.</span></label><label class="check-row"><input data-draft="sensationChecked" type="checkbox" ${sessionDraft.sensationChecked ? 'checked' : ''}><span>No new numbness, tingling, unusual colour, or temperature change.</span></label><label class="check-row"><input data-draft="toneChecked" type="checkbox" ${sessionDraft.toneChecked ? 'checked' : ''}><span>Pain, passive range, tone, and clonus are within today’s clinician-approved boundaries.</span></label><label class="check-row"><input data-draft="postureChecked" type="checkbox" ${sessionDraft.postureChecked ? 'checked' : ''}><span>Patient upright, feet and forearms supported, shoulders level, mirror aligned at midline.</span></label></div><div class="stop-box"><strong>Stop before starting</strong><p>Do not proceed if pain, skin, neurovascular status, mechanical range, cognition/behaviour, or physiological status is unsafe.</p></div></div>`;
  if (index === 1) return `<div class="phase-card"><p class="eyebrow">Phase B · 4 minutes</p><h2>Calibration & familiarisation</h2><p class="phase-lead">Fit the guiding sensor glove and affected robotic hand, then verify low-range synchrony.</p><div class="movement-grid"><article class="movement-card"><img src="assets/sensor-glove.svg" alt="Sensor glove"><h3>Guiding hand</h3><p>Align fingers with sensor channels and secure without constriction.</p></article><article class="movement-card"><img src="assets/robotic-hand.svg" alt="Robotic hand exoskeleton"><h3>Affected hand</h3><p>Support the limb, align finger joints and thumb, and avoid forced range.</p></article></div><div class="phase-checks"><label class="check-row"><input data-draft="sensorFit" type="checkbox" ${sessionDraft.sensorFit ? 'checked' : ''}><span>Sensor glove fitted and guiding fingers detected.</span></label><label class="check-row"><input data-draft="robotFit" type="checkbox" ${sessionDraft.robotFit ? 'checked' : ''}><span>Robotic hand fitted without pressure, pinching, or painful end range.</span></label><label class="check-row"><input data-draft="alignment" type="checkbox" ${sessionDraft.alignment ? 'checked' : ''}><span>Wrist, fingers, thumb, cables, and tabletop workspace aligned safely.</span></label><label class="check-row"><input data-draft="synchrony" type="checkbox" ${sessionDraft.synchrony ? 'checked' : ''}><span>Slow open-close test is smooth, predictable, and synchronous.</span></label></div><div class="cue-box"><strong>Therapist cue</strong><p>“Open your guiding hand slowly. Watch the mirror image only. Tell me immediately if you feel pressure, pain, or unexpected movement.”</p></div></div>`;
  if (index === 2) return `<div class="phase-card"><p class="eyebrow">Phase C · 5 minutes</p><h2>Sensorimotor priming</h2><p class="phase-lead">Create a convincing visual-sensory event before task practice.</p><div class="grid-3"><label>Full hand open-close cycles<input data-draft="primingOpenClose" type="number" min="0" value="${N(sessionDraft.primingOpenClose)}"></label><label>Sequential finger rounds<input data-draft="primingSequence" type="number" min="0" value="${N(sessionDraft.primingSequence)}"></label><label>Thumb opposition rounds<input data-draft="primingOpposition" type="number" min="0" value="${N(sessionDraft.primingOpposition)}"></label></div><div class="cue-box"><strong>Core RMHT script</strong><p>“Eyes on the reflected hand. Imagine that it is your affected hand. Begin your own effort just before the glove moves. Feel the affected fingers moving at the same time as the movement you see.”</p></div><ol class="architecture-list"><li><b>5×</b><span>Slow full-hand opening and closing</span></li><li><b>3×</b><span>Index-to-little-finger sequence, then reverse if appropriate</span></li><li><b>2×</b><span>Thumb to each fingertip within approved range</span></li></ol></div>`;
  if (index === 3) return `<div class="phase-card"><p class="eyebrow">Phase D · 15 minutes</p><h2>High-repetition task blocks</h2><p class="phase-lead">Two prescribed movement families. Record delivered cycles and treatment fidelity, not only scheduled time.</p><div class="movement-grid"><article class="movement-card"><h3>Block 1 · ${E(protocol?.family1 || 'Movement family 1')}</h3><p>${E(EXERCISES.find(x => x.family === protocol?.family1)?.pattern || 'Clinician-prescribed movement pattern.')}</p><label>Completed cycles<input data-draft="block1Reps" type="number" min="0" value="${N(sessionDraft.block1Reps)}"></label></article><article class="movement-card"><h3>Block 2 · ${E(protocol?.family2 || 'Movement family 2')}</h3><p>${E(EXERCISES.find(x => x.family === protocol?.family2)?.pattern || 'Clinician-prescribed movement pattern.')}</p><label>Completed cycles<input data-draft="block2Reps" type="number" min="0" value="${N(sessionDraft.block2Reps)}"></label></article></div><div class="grid-3"><label>Mirror-gaze adherence (%)<input data-draft="gaze" type="number" min="0" max="100" value="${N(sessionDraft.gaze)}"></label><label>Robotic / therapist assists<input data-draft="assists" type="number" min="0" value="${N(sessionDraft.assists)}"></label><label>Compensation corrections<input data-draft="compensations" type="number" min="0" value="${N(sessionDraft.compensations)}"></label></div><div class="cue-box"><strong>Volitional demand</strong><p>${E(protocol?.demand || 'Attempt-to-move before the robot completes the movement.')} Start the patient’s effort just before robotic motion and preserve task quality.</p></div><div class="stop-box"><strong>Immediate stop rules remain active</strong><p>Stop for pain escalation, skin/neurovascular concern, sustained tone/clonus, obstruction, loss of synchrony, unexpected movement, warning indicator, unusual sound, odour, or heat.</p></div></div>`;
  return `<div class="phase-card"><p class="eyebrow">Phase E · 3 minutes</p><h2>Functional transfer & cooldown</h2><p class="phase-lead">Remove the mirror/device safely and test whether the primed movement transfers to real activity.</p><div class="transfer-box"><strong>Prescribed transfer target</strong><p>${E(protocol?.transfer || 'Attempt 2-3 unassisted real-world movements.')}</p></div><div class="grid-3"><label>Attempts<input data-draft="transferAttempted" type="number" min="0" value="${N(sessionDraft.transferAttempted)}"></label><label>Successful attempts<input data-draft="transfer" type="number" min="0" value="${N(sessionDraft.transfer)}"></label><label>Voluntary initiation<select data-draft="initiation"><option ${sessionDraft.initiation === 'Not observed' ? 'selected' : ''}>Not observed</option><option ${sessionDraft.initiation === 'Trace' ? 'selected' : ''}>Trace</option><option ${sessionDraft.initiation === 'Observed' ? 'selected' : ''}>Observed</option></select></label></div><div class="grid-2"><label>Post-session pain (0-10)<input data-draft="painPost" type="number" min="0" max="10" value="${N(sessionDraft.painPost)}"></label><label class="check-row"><input data-draft="deviceFault" type="checkbox" ${sessionDraft.deviceFault ? 'checked' : ''}><span>Device or synchrony fault occurred</span></label></div><label>Protocol deviation<input data-draft="deviation" type="text" value="${E(sessionDraft.deviation)}" placeholder="Leave blank when none"></label><label>Session note<textarea data-draft="notes" rows="4" placeholder="Movement quality, fatigue, skin, tone, transfer, caregiver or therapist observations">${E(sessionDraft.notes)}</textarea></label><div class="phase-checks"><label class="check-row"><input data-draft="postSkin" type="checkbox" ${sessionDraft.postSkin ? 'checked' : ''}><span>Post-session skin, sensation, pain, swelling, and tone rechecked.</span></label><label class="check-row"><input data-draft="documented" type="checkbox" ${sessionDraft.documented ? 'checked' : ''}><span>Dose, fidelity, transfer, and any event are ready to document.</span></label></div></div>`;
}

function renderSession() {
  if (!state.patients.length) { $('phaseContent').innerHTML = '<div class="empty">Create a patient record first.</div>'; return; }
  renderPatientOptions();
  if (!sessionDraft.patientId || !getPatient(sessionDraft.patientId)) resetSessionDraft();
  $('sessionPatient').value = sessionDraft.patientId;
  populateSelect('sessionProtocol', protocolsForPatient(sessionDraft.patientId), sessionDraft.protocolId, p => `${pathwayLabel(p.pathway)} · ${p.family1} + ${p.family2}`);
  sessionDraft.protocolId = $('sessionProtocol').value;
  $('sessionDate').value = sessionDraft.date || today();
  $('phaseContent').innerHTML = phaseContentHtml(phaseIndex);
  $('prevPhaseBtn').disabled = phaseIndex === 0;
  $('completePhaseBtn').textContent = phaseIndex === PHASES.length - 1 ? 'Complete & save session' : 'Complete & continue';
  updateTimerUI();
}

function collectPhaseInputs() {
  $('phaseContent').querySelectorAll('[data-draft]').forEach(el => {
    const key = el.dataset.draft;
    sessionDraft[key] = el.type === 'checkbox' ? el.checked : (el.type === 'number' ? N(el.value) : el.value);
  });
  sessionDraft.patientId = $('sessionPatient').value;
  sessionDraft.protocolId = $('sessionProtocol').value;
  sessionDraft.date = $('sessionDate').value;
}

function phaseValid(index) {
  collectPhaseInputs();
  if (index === 0 && !(sessionDraft.skinChecked && sessionDraft.sensationChecked && sessionDraft.toneChecked && sessionDraft.postureChecked)) return 'Complete all safety and readiness checks before proceeding.';
  if (index === 1 && !(sessionDraft.sensorFit && sessionDraft.robotFit && sessionDraft.alignment && sessionDraft.synchrony)) return 'Verify fit, alignment, and synchrony before proceeding.';
  if (index === 4 && !(sessionDraft.postSkin && sessionDraft.documented)) return 'Complete post-session checks and documentation confirmation.';
  return '';
}

function saveSession() {
  const session = {
    id: uid('session'), patientId: sessionDraft.patientId, protocolId: sessionDraft.protocolId, date: sessionDraft.date || today(), activeMinutes: 30,
    reps: N(sessionDraft.block1Reps) + N(sessionDraft.block2Reps), painPre: N(sessionDraft.painPre), painPost: N(sessionDraft.painPost), gaze: N(sessionDraft.gaze),
    transfer: N(sessionDraft.transfer), transferAttempted: N(sessionDraft.transferAttempted), initiation: sessionDraft.initiation, deviceFault: !!sessionDraft.deviceFault,
    deviation: sessionDraft.deviation || '', notes: sessionDraft.notes || '', assistanceEvents: N(sessionDraft.assists), compensationCorrections: N(sessionDraft.compensations),
    priming: { openClose: N(sessionDraft.primingOpenClose), sequence: N(sessionDraft.primingSequence), opposition: N(sessionDraft.primingOpposition) }, createdAt: new Date().toISOString()
  };
  state.sessions.unshift(session);
  if (session.deviation || session.deviceFault || session.painPost - session.painPre > 2) state.events.unshift({ id: uid('event'), patientId: session.patientId, date: session.date, type: session.deviceFault ? 'Device synchronisation fault' : session.deviation ? 'Protocol deviation' : 'Pain escalation', severity: 'Minor', description: session.deviation || 'Automatically flagged from session record.', createdAt: new Date().toISOString() });
  saveState(); renderAll(); resetSessionDraft(); renderSession(); showStatus('Session saved to the local prototype record.');
}

function completePhase() {
  const error = phaseValid(phaseIndex); if (error) return showStatus(error, 'error');
  completedPhases.add(phaseIndex); stopTimer();
  if (phaseIndex === PHASES.length - 1) return saveSession();
  phaseIndex++; phaseSecondsLeft = PHASES[phaseIndex].seconds; renderSession(); speak(PHASES[phaseIndex].name);
}
function goToPhase(index) { collectPhaseInputs(); stopTimer(); phaseIndex = clamp(index, 0, PHASES.length - 1); phaseSecondsLeft = PHASES[phaseIndex].seconds; renderSession(); }
