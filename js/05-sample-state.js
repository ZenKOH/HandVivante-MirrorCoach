function sampleData() {
  const patients = [
    { id: 'case-a', label: 'Case A · Left MCA stroke', condition: 'Stroke', phase: 'Chronic', brunnstrom: 4, mas: '1+', mmse: 28, fma: 29, arat: 14, pain: 1, skin: 'Intact', goal: 'Use the affected hand to stabilise a cup and assist with breakfast preparation.', precautions: 'Monitor flexor tone and shoulder hiking. Forearm support during reach.', eligibleChecks: { stable: true, msk: true, skin: true, cognition: true }, createdAt: new Date().toISOString() },
    { id: 'case-b', label: 'Case B · Subacute haemorrhagic stroke', condition: 'Stroke', phase: 'Subacute', brunnstrom: 2, mas: '1', mmse: 26, fma: 18, arat: 4, pain: 0, skin: 'Intact', goal: 'Initiate hand opening and release a lightweight foam block.', precautions: 'Severe paresis. Use passive-follow with explicit motor attempt and close skin monitoring.', eligibleChecks: { stable: true, msk: true, skin: true, cognition: true }, createdAt: new Date().toISOString() },
    { id: 'case-c', label: 'Case C · Chronic right hemiparesis', condition: 'Stroke', phase: 'Outpatient', brunnstrom: 5, mas: '1', mmse: 29, fma: 47, arat: 35, pain: 1, skin: 'Intact', goal: 'Improve pinch and controlled release for dressing and meal tasks.', precautions: 'Prioritise quality and reduce robotic assistance; avoid compensatory trunk flexion.', eligibleChecks: { stable: true, msk: true, skin: true, cognition: true }, createdAt: new Date().toISOString() }
  ];
  const protocols = [
    { id: 'protocol-a', patientId: 'case-a', pathway: 'moderate', setting: 'Supervised clinic', frequency: 5, minutes: 30, weeks: 4, family1: 'Finger individuation', family2: 'Cylindrical power grasp / release', range: 'Comfort-limited 50-70%', speed: 'Slow', demand: 'Attempt-to-move + active-assist', gate: 'Finger-flexor MAS remains ≤1+ for two consecutive sessions; pain does not rise >2 points; no skin or device safety event; ≥80% prescribed cycles completed.', transfer: 'Affected hand stabilises a lightweight cup for 3 seconds, 3 attempts after device removal.', createdAt: new Date().toISOString() },
    { id: 'protocol-b', patientId: 'case-b', pathway: 'severe', setting: 'Inpatient rehabilitation', frequency: 5, minutes: 30, weeks: 4, family1: 'Gross hand opening / closing', family2: 'Release control', range: 'Comfort-limited 40-50%', speed: 'Slow', demand: 'Passive-follow + imagery', gate: 'Pain stable; skin intact; no clonus interfering with movement; ≥80% of low-range cycles completed.', transfer: 'Supported tabletop hand opening, 5 attempts, documenting voluntary initiation.', createdAt: new Date().toISOString() },
    { id: 'protocol-c', patientId: 'case-c', pathway: 'mild', setting: 'Supervised clinic', frequency: 4, minutes: 30, weeks: 4, family1: 'Tripod pinch', family2: 'Task-oriented reach, grasp and place', range: 'Clinician-defined functional range', speed: 'Slow-moderate', demand: 'Reduced assistance / active', gate: 'Movement quality ≥4/5, pain stable, no safety event, and ≥80% task success for two sessions.', transfer: 'Lift and place three large pegs without robotic assistance.', createdAt: new Date().toISOString() }
  ];
  const sessions = [
    { id: 's1', patientId: 'case-a', protocolId: 'protocol-a', date: ago(1), activeMinutes: 30, reps: 44, painPre: 1, painPost: 2, gaze: 90, transfer: 2, transferAttempted: 3, initiation: 'Observed', deviceFault: false, deviation: '', notes: 'Improved release after priming.' },
    { id: 's2', patientId: 'case-a', protocolId: 'protocol-a', date: ago(3), activeMinutes: 30, reps: 40, painPre: 1, painPost: 1, gaze: 85, transfer: 1, transferAttempted: 3, initiation: 'Trace', deviceFault: false, deviation: '', notes: 'Needed shoulder cueing.' },
    { id: 's3', patientId: 'case-b', protocolId: 'protocol-b', date: ago(2), activeMinutes: 26, reps: 30, painPre: 0, painPost: 0, gaze: 75, transfer: 0, transferAttempted: 5, initiation: 'Not observed', deviceFault: false, deviation: 'Priming shortened because of fatigue.', notes: 'Tolerated low range.' },
    { id: 's4', patientId: 'case-c', protocolId: 'protocol-c', date: ago(1), activeMinutes: 30, reps: 36, painPre: 1, painPost: 1, gaze: 95, transfer: 3, transferAttempted: 3, initiation: 'Observed', deviceFault: false, deviation: '', notes: 'Reduced assistance during final set.' },
    { id: 's5', patientId: 'case-c', protocolId: 'protocol-c', date: ago(5), activeMinutes: 30, reps: 32, painPre: 1, painPost: 1, gaze: 90, transfer: 2, transferAttempted: 3, initiation: 'Observed', deviceFault: false, deviation: '', notes: 'Good tripod contact.' }
  ];
  const outcomes = [
    { id: 'o1', patientId: 'case-a', measure: 'FMA-UE', baseline: 29, current: 34, target: 40, direction: 'Higher is better', date: ago(1), note: 'Same assessor and supported sitting.' },
    { id: 'o2', patientId: 'case-a', measure: 'ARAT', baseline: 14, current: 19, target: 28, direction: 'Higher is better', date: ago(1), note: 'Standardised setup.' },
    { id: 'o3', patientId: 'case-b', measure: 'FMA-UE', baseline: 18, current: 21, target: 28, direction: 'Higher is better', date: ago(2), note: 'Severe pathway.' },
    { id: 'o4', patientId: 'case-c', measure: 'ARAT', baseline: 35, current: 41, target: 48, direction: 'Higher is better', date: ago(1), note: 'Focus on pinch and release.' }
  ];
  return {
    version: 1,
    patients, protocols, sessions, outcomes,
    events: [],
    tutorial: { completed: [] },
    settings: { organisation: 'MirrorCoach Demonstration Site', painThreshold: 4, audio: false }
  };
}

function normaliseState(raw) {
  if (!raw || !Array.isArray(raw.patients)) return sampleData();
  const base = sampleData();
  return {
    version: 1,
    patients: raw.patients || [],
    protocols: raw.protocols || [],
    sessions: raw.sessions || [],
    outcomes: raw.outcomes || [],
    events: raw.events || [],
    tutorial: raw.tutorial || { completed: [] },
    settings: { ...base.settings, ...(raw.settings || {}) }
  };
}

function loadState() {
  try { return normaliseState(JSON.parse(localStorage.getItem(APP_KEY))); }
  catch { return sampleData(); }
}
function saveState() { localStorage.setItem(APP_KEY, JSON.stringify(state)); }
function loadUser() { try { return JSON.parse(localStorage.getItem(USER_KEY)); } catch { return null; } }
function saveUser() { localStorage.setItem(USER_KEY, JSON.stringify(user)); }

let state = loadState();
let user = loadUser();
let statusTimer;
let tutorialIndex = 0;
let phaseIndex = 0;
let phaseSecondsLeft = PHASES[0].seconds;
let timerInterval = null;
let completedPhases = new Set();
let sessionDraft = {};

function showStatus(message, type = '') {
  const el = $('appStatus');
  el.textContent = message;
  el.className = `app-status show ${type}`;
  clearTimeout(statusTimer);
  statusTimer = setTimeout(() => { el.className = 'app-status'; }, 3200);
}
