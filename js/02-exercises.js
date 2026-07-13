const EXERCISES = [
  {
    id: 'open-close', title: 'Slow full-hand opening and closing', family: 'Gross hand opening / closing', levels: ['severe', 'moderate', 'mild'], image: 'assets/exercise-assisted-open-close.webp', imageAlt: 'HandVivante robotic hand supporting assisted finger opening and closing',
    purpose: 'Prime the mirror illusion, expose the affected hand to synchronised movement, and practise controlled flexion-extension.',
    setup: 'Forearms supported, mirror aligned at midline, affected hand fitted in the robotic hand, less-affected hand in the sensor glove.',
    pattern: 'Slowly open to the clinician-approved range, pause briefly, then close without forcing end range.',
    dose: 'Start with 5 priming cycles, then 15-30 task cycles according to tolerance.',
    measure: 'Completed cycles, delivered range, pain, tone response, mirror-gaze adherence, and interruptions.',
    compensation: 'Shoulder elevation, trunk lean, wrist collapse, rushing, or looking away from the mirror.',
    progression: 'Increase comfortable range first, then repetitions, then speed or reduced assistance.'
  },
  {
    id: 'finger-sequence', title: 'Sequential finger activation', family: 'Finger individuation', levels: ['moderate', 'mild'], image: 'assets/exercise-peg-transfer.webp', imageAlt: 'HandVivante bilateral system performing a peg-board finger-control task',
    purpose: 'Practise selective finger timing and reduce whole-hand mass-pattern dominance.',
    setup: 'Use no object initially. Progress to touching large pegs or targets while the forearm remains supported.',
    pattern: 'Index to little finger, then reverse. The patient attempts each movement immediately before robotic assistance.',
    dose: '3 priming rounds, then 12-24 forward/reverse sequences.',
    measure: 'Correct sequence, completed rounds, robotic assists, cue frequency, and compensatory movement.',
    compensation: 'Global flexor synergy, excessive shoulder movement, wrist flexion, or loss of attention.',
    progression: 'Reverse order, random sequence, smaller targets, or reduced assistance.'
  },
  {
    id: 'opposition', title: 'Thumb-to-fingertip opposition', family: 'Thumb opposition', levels: ['moderate', 'mild'], image: 'assets/exercise-robotic-hand-closeup.webp', imageAlt: 'Close-up of the HandVivante robotic hand exoskeleton supporting the fingers and thumb',
    purpose: 'Develop thumb positioning and prepare for pinch and object manipulation.',
    setup: 'Adjust thumb position only within the clinician-approved and device-supported configuration.',
    pattern: 'Thumb to index, middle, ring, and little finger, then return to neutral.',
    dose: '2 priming rounds; 8-16 task rounds depending on quality.',
    measure: 'Assisted contacts, active initiation, pain, and movement quality.',
    compensation: 'Forearm rotation, shoulder abduction, or forcing the thumb into a painful position.',
    progression: 'Smaller targets, varied sequence, or functional pinch tasks.'
  },
  {
    id: 'cylinder', title: 'Cylindrical grasp, hold and release', family: 'Cylindrical power grasp / release', levels: ['severe', 'moderate', 'mild'], image: 'assets/exercise-cup-grasp.webp', imageAlt: 'HandVivante sensor glove and robotic hand grasping lightweight cups',
    purpose: 'Practise a functional grasp pattern with controlled release.',
    setup: 'Use a lightweight, non-breakable foam cylinder or empty cup that can be released easily.',
    pattern: 'Open, approach, grasp, hold 2-3 seconds, release fully, and return.',
    dose: '15-25 cycles in short sets with rest as needed.',
    measure: 'Successful grasp-hold-release cycles, hold time, release latency, assistance, and compensation.',
    compensation: 'Trunk lean, shoulder hiking, wrist collapse, excessive grip pressure, or incomplete release.',
    progression: 'Vary diameter, add a short transport, reduce assistance, or narrow the target zone.'
  },
  {
    id: 'ball', title: 'Spherical grasp with soft ball', family: 'Spherical grasp / release', levels: ['moderate', 'mild'], image: 'assets/exercise-bilateral-grasp.webp', imageAlt: 'HandVivante sensor glove and robotic hand holding soft balls during bilateral practice',
    purpose: 'Practise palmar shaping and graded opening for a rounded object.',
    setup: 'Use a soft, lightweight ball sized so the fingers are not forced beyond comfortable range.',
    pattern: 'Open, shape the hand around the ball, hold, and release into a marked area.',
    dose: '12-20 cycles.',
    measure: 'Object contact, hold duration, release success, pain, and assistance.',
    compensation: 'Pressing the object against the body, shoulder hiking, or excessive wrist flexion.',
    progression: 'Use different ball sizes or increase placement distance while maintaining support.'
  },
  {
    id: 'lateral-pinch', title: 'Card or cloth lateral pinch', family: 'Lateral pinch', levels: ['moderate', 'mild'], image: 'assets/exercise-peg-transfer.webp', imageAlt: 'HandVivante bilateral system performing a controlled peg-board pinch task',
    purpose: 'Prepare for stabilising cards, paper, cloth, or a zipper tab.',
    setup: 'Use a large card or soft fabric strip; avoid sharp edges.',
    pattern: 'Open, position thumb against the side of the index finger, hold, then release.',
    dose: '8-15 controlled attempts.',
    measure: 'Successful contacts, hold time, assistance, and skin comfort.',
    compensation: 'Twisting the trunk, gripping with the whole hand, or painful thumb pressure.',
    progression: 'Lighter support, longer hold, or a gentle pull by the therapist.'
  },
  {
    id: 'tripod', title: 'Large peg tripod pinch', family: 'Tripod pinch', levels: ['moderate', 'mild'], image: 'assets/exercise-peg-transfer.webp', imageAlt: 'HandVivante robotic hand and sensor glove completing a large-peg placement task',
    purpose: 'Train thumb-index-middle finger coordination for small-object tasks.',
    setup: 'Begin with a large peg positioned close to the hand and forearm support.',
    pattern: 'Approach, form tripod contact, lift minimally, place in a wide target.',
    dose: '6-12 successful contacts or lifts.',
    measure: 'Successful contacts, lifts, placement accuracy, assistance, and release latency.',
    compensation: 'Whole-hand grasp, shoulder hiking, or using momentum.',
    progression: 'Smaller peg, narrower target, or reduced robotic assistance.'
  },
  {
    id: 'release', title: 'Release into a target zone', family: 'Release control', levels: ['severe', 'moderate', 'mild'], image: 'assets/exercise-peg-transfer.webp', imageAlt: 'HandVivante system guiding a controlled release into a peg-board target',
    purpose: 'Emphasise opening and prevent the training dose from becoming grasp-dominant.',
    setup: 'Use a foam block or lightweight object and a large high-contrast target.',
    pattern: 'Grasp with assistance, transport a short distance, then fully open to release.',
    dose: '10-20 releases.',
    measure: 'Successful releases, release latency, target accuracy, and compensations.',
    compensation: 'Dropping by arm movement instead of finger opening or using the other hand to remove the object.',
    progression: 'Smaller target, longer transport, faster initiation, or reduced assistance.'
  },
  {
    id: 'stabilise', title: 'Affected-hand stabilisation', family: 'Bimanual stabilisation', levels: ['moderate', 'mild'], image: 'assets/exercise-cup-grasp.webp', imageAlt: 'HandVivante sensor glove and robotic hand stabilising lightweight cups',
    purpose: 'Link robotic practice to a realistic bimanual role and counter learned non-use.',
    setup: 'Use an empty, non-breakable container on a non-slip mat.',
    pattern: 'Affected hand holds the container while the less-affected hand manipulates a lid or object.',
    dose: '3-5 holds of 5-10 seconds after robotic priming.',
    measure: 'Hold duration, assistance, stability, and spontaneous affected-hand use.',
    compensation: 'Pinning the object against the body or relying entirely on the less-affected hand.',
    progression: 'Reduce external support or use a more realistic daily-life object.'
  },
  {
    id: 'reach-place', title: 'Reach, grasp and place', family: 'Task-oriented reach, grasp and place', levels: ['moderate', 'mild'], image: 'assets/exercise-peg-transfer.webp', imageAlt: 'HandVivante robotic hand and sensor glove practising reach, grasp and peg placement',
    purpose: 'Integrate hand opening and grasp with proximal movement and functional placement.',
    setup: 'Forearm support may be reduced only when shoulder and trunk control are adequate.',
    pattern: 'Reach a short distance, grasp a lightweight object, place it in a wide target, and return.',
    dose: '8-16 task cycles.',
    measure: 'Completed cycles, movement quality, trunk compensation, placement accuracy, and assistance.',
    compensation: 'Excessive trunk flexion, shoulder elevation, unsafe reach, or poor release.',
    progression: 'Increase reach distance, vary target location, or reduce assistance.'
  }
];

const PHASES = [
  { id: 'safety', letter: 'A', name: 'Safety & readiness', seconds: 180 },
  { id: 'calibration', letter: 'B', name: 'Calibration & familiarisation', seconds: 240 },
  { id: 'priming', letter: 'C', name: 'Sensorimotor priming', seconds: 300 },
  { id: 'training', letter: 'D', name: 'High-repetition task blocks', seconds: 900 },
  { id: 'transfer', letter: 'E', name: 'Transfer & cooldown', seconds: 180 }
];

const SESSION_ARCHITECTURE_REFERENCES = {
  thieme2018: 'Thieme H, Morkisch N, Mehrholz J, Pohl M, Behrens J, Borgetto B, Dohle C. Mirror therapy for improving motor function after stroke. Cochrane Database of Systematic Reviews. 2018;7:CD008449.',
  nisar2024: 'Nisar H, Annamraju S, Deka S, Horowitz A, Stipanovic D. Robotic mirror therapy for stroke rehabilitation through virtual activities of daily living. Computational and Structural Biotechnology Journal. 2024;24:126-135.',
  chen2023: 'Chen Y-W, Li K-Y, Lin C-H, Hung P-H, Lai H-T, Wu C-Y. The effect of sequential combination of mirror therapy and robot-assisted therapy on motor recovery and self-efficacy in stroke patients. Scientific Reports. 2023;13:16841.',
  wu2025: 'Wu X, Qiao X, Xie Y, Yang Q, An W, Xia L, Li J, Lu X. Rehabilitation training robot using mirror therapy for the upper and lower limb after stroke: a prospective cohort study. Journal of NeuroEngineering and Rehabilitation. 2025;22:45.',
  chen2020: 'Chen YM, Lai SS, Pei YC, Hsieh CJ, Chang WH. Development of a Novel Task-oriented Rehabilitation Program using a Bimanual Exoskeleton Robotic Hand. Journal of Visualized Experiments. 2020;(159).',
  ma2022: 'Ma D, Li X, Xu Q, Yang F, Feng Y, Wang W, Huang JJ, Pei YC, Pan Y. Robot-Assisted Bimanual Training Improves Hand Function in Patients With Subacute Stroke: A Randomized Controlled Pilot Study. Frontiers in Neurology. 2022;13:884261.'
};

const SESSION_ARCHITECTURE = {
  safety: {
    phase: 'Phase A', duration: '3 min', title: 'Safety & readiness',
    aim: 'Establish that the patient, affected upper limb, device and environment are suitable for today’s prescribed RMHT session before any powered movement begins.',
    sequence: [
      'Confirm patient, affected side, prescribed mode, range, speed, task families and clinician-defined stop thresholds.',
      'Check alertness, communication, ability to follow a stop instruction, fatigue and any relevant change in medical status since the previous session.',
      'Record pre-session pain; inspect skin, swelling, colour, temperature and pressure-sensitive areas; ask about new numbness, tingling or cramping.',
      'Check comfortable passive range and current tone response without forcing the wrist, thumb or fingers.',
      'Position the patient upright with feet supported, shoulders level and both forearms supported; clear cables, objects and pinch hazards.',
      'Agree a simple stop signal and show the patient how the therapist will pause the session.'
    ],
    gate: 'Proceed only when findings remain within the therapist-approved boundaries and the patient can communicate discomfort. Modify, postpone or escalate for new neurological or medical symptoms, broken skin, unsafe pain, marked swelling, fixed or painful range, uncontrolled tone, or inability to participate safely.',
    record: ['Pre-session pain and fatigue', 'Skin and sensory status', 'Tone / range observations', 'Positioning or protocol modifications', 'Reason for delay, modification or cancellation'],
    cue: '“Before we move, tell me immediately if you notice pain, pressure, numbness, pulling or anything unexpected.”',
    evidence: 'The mirror-therapy literature supports possible motor and activity benefits after stroke, but protocols and populations are heterogeneous. A deliberate readiness gate therefore protects safety and makes treatment fidelity interpretable rather than assuming every planned session should proceed unchanged.',
    refs: ['thieme2018', 'chen2023', 'wu2025']
  },
  calibration: {
    phase: 'Phase B', duration: '4 min', title: 'Calibration & familiarisation',
    aim: 'Fit the bilateral system, establish a comfortable starting configuration and verify that guiding-hand movement produces smooth, predictable affected-hand movement.',
    sequence: [
      'Inspect the robotic hand, sensor glove, straps, finger interfaces, cables, connectors and control unit before donning.',
      'Fit the guiding sensor glove and align each sensing channel with the intended finger movement.',
      'Support the affected forearm while fitting the robotic hand; align the wrist, thumb and finger joints without forcing end range.',
      'Begin at low speed and limited range. Complete three to five slow open-close cycles before adding individual-finger patterns.',
      'Observe direction, timing, range, pressure, mechanical clearance, unexpected sound, heat, warning indicators and the patient’s facial response.',
      'Place the mirror at midline and confirm that the reflected movement is clear, believable and not visually confusing.'
    ],
    gate: 'Advance only when movement is smooth and repeatable, the patient is comfortable, the mirror view is usable and the patient can identify the pause/stop process. Refit or stop for delay, obstruction, unexpected motion, painful end range, pressure concentration or a sustained tone response.',
    record: ['Device side and mode', 'Starting range and speed', 'Fit or alignment adjustments', 'Synchrony result', 'Pressure, tone or comfort observations', 'Any component or cable concern'],
    cue: '“Move slowly. I am checking that the robotic hand follows in the same direction, at the expected time and within a comfortable range.”',
    evidence: 'Published bimanual exoskeleton programmes describe structured fitting, task setup and therapist supervision before functional practice. Calibration is not a one-time technical event; it is a clinical quality gate that should be repeated when the patient, task or configuration changes.',
    refs: ['chen2020', 'ma2022', 'nisar2024']
  },
  priming: {
    phase: 'Phase C', duration: '5 min', title: 'Sensorimotor priming',
    aim: 'Create a coherent movement experience in which the patient sees the reflected hand, feels the affected hand move and attempts the intended movement at approximately the same time.',
    sequence: [
      'Begin with about five slow full-hand open-close cycles within the verified range.',
      'Add two or three rounds of sequential finger movement, followed by one or two comfortable thumb-opposition sequences when appropriate.',
      'Ask the patient to keep attention on the mirror image rather than repeatedly checking the hidden affected hand.',
      'Use brief motor imagery: name the movement, ask the patient to imagine the affected hand performing it, then initiate effort immediately before assistance begins.',
      'Keep the pace slow enough to perceive opening, closing, contact and release; do not trade movement quality for a higher count.',
      'Recheck pain, pressure, tone, visual comfort and attention before entering the longer task blocks.'
    ],
    gate: 'The patient should demonstrate tolerable movement, sustained attention to the mirror for most cycles and at least an observable attempt or intention cue when possible. Reduce complexity, range or speed if attention, comfort or movement quality deteriorates.',
    record: ['Mirror-gaze adherence', 'Active initiation / attempted movement', 'Patterns completed', 'Cue frequency', 'Pain, tone or visual discomfort', 'Reason for any priming modification'],
    cue: '“Watch the reflected hand. Imagine it is your affected hand. Begin your own effort just before the robot moves, and notice the movement you see and feel.”',
    evidence: 'Mirror therapy is best understood as an adjunct that couples visual feedback with focused movement practice. Sequential mirror-plus-robot approaches and robotic mirror systems suggest a rationale for combining attention, motor intent and assisted movement, but the optimal timing and dose remain uncertain and should be individualised.',
    refs: ['thieme2018', 'chen2023', 'nisar2024', 'wu2025']
  },
  training: {
    phase: 'Phase D', duration: '15 min', title: 'Two high-repetition task blocks',
    aim: 'Deliver a measurable dose of purposeful, task-specific practice while preserving active contribution, alignment, release quality and clinically acceptable compensation.',
    sequence: [
      'Block A — 6 minutes: select one prescribed movement family such as opening/release, finger sequencing, opposition or cylindrical grasp.',
      'Micro-rest and recheck — 1 minute: reassess pain, tone, pressure, fatigue, mirror attention and movement quality; adjust only one main variable at a time.',
      'Block B — 6 minutes: use a second movement family or a lightweight object task linked to the patient’s functional goal.',
      'Quality-consolidation set — 2 minutes: repeat the best-quality pattern at a sustainable pace, or stop earlier when quality no longer meets the agreed threshold.',
      'Ask for patient initiation before assistance where feasible; distinguish attempted cycles, completed cycles and clinically valid cycles.',
      'Correct trunk lean, shoulder elevation, wrist collapse, mass flexor pattern, excessive grip pressure and incomplete release rather than counting them as successful practice.'
    ],
    gate: '“High repetition” means enough purposeful practice to challenge learning—not moving as fast as possible. Progress range, repetitions, object demand or reduced assistance only when pain, skin, tone and quality remain stable. Regress by simplifying the pattern, increasing support, slowing the pace or returning to no-object practice.',
    record: ['Attempted, completed and valid cycles', 'Active versus assisted contribution', 'Range, speed and assistance setting', 'Grasp / hold / release success', 'Compensation corrections', 'Rest time, pain, fatigue and interruptions'],
    cue: '“Start the movement, let the system help only as prescribed, complete the release, and keep the shoulder and trunk quiet.”',
    evidence: 'Task-oriented and bimanual robotic studies support the feasibility of practising large numbers of structured hand movements and real-object tasks. Pilot findings are promising but do not justify a universal repetition target or guaranteed functional gain; dose must be interpreted alongside quality, assistance and task relevance.',
    refs: ['chen2020', 'ma2022', 'nisar2024', 'wu2025']
  },
  transfer: {
    phase: 'Phase E', duration: '3 min', title: 'Functional transfer & cooldown',
    aim: 'Test whether the movement prepared during RMHT can be expressed immediately in a simpler real-world action, then complete safe doffing and post-session review.',
    sequence: [
      'Pause or stop the device according to the current IFU before releasing straps or changing hand position.',
      'Support the affected limb during doffing and recheck skin, sensation, pain, swelling and tone.',
      'Remove or reduce the mirror cue and attempt two or three goal-linked movements with the least safe assistance: open for hygiene, stabilise a cup, release into a target, touch a large object or perform another prescribed task.',
      'Compare the transfer attempt with the pre-session baseline for initiation, range, assistance, compensation and confidence—not only task completion.',
      'Return the hand to a comfortable supported position and confirm that no delayed pressure, numbness, pain or device concern is present.',
      'Agree the next-session focus and any therapist-approved carryover task.'
    ],
    gate: 'Treat immediate transfer as a within-session probe, not proof of recovery. Stop or modify when the patient relies on unsafe compensation, pain rises, skin changes appear or the task cannot be completed within the prescribed support level.',
    record: ['Transfer task attempted', 'Attempts and successful completions', 'Assistance and compensation', 'Post-session pain, skin and tone', 'Patient confidence / self-efficacy note', 'Next-session progression or regression'],
    cue: '“Now try the same movement in a simple real task. Quality and safety matter more than finishing it independently today.”',
    evidence: 'Functional task practice and self-efficacy are important outcomes, yet impairment change does not automatically become spontaneous real-world hand use. A brief transfer probe makes this gap visible and creates a concrete target for the next prescription.',
    refs: ['chen2023', 'chen2020', 'ma2022', 'nisar2024']
  }
};

function architectureList(items) {
  return `<ul>${items.map(item => `<li>${E(item)}</li>`).join('')}</ul>`;
}

function openArchitecturePhase(id) {
  const phase = SESSION_ARCHITECTURE[id];
  if (!phase) return;
  const references = phase.refs.map(key => SESSION_ARCHITECTURE_REFERENCES[key]).filter(Boolean);
  $('architectureDialogContent').innerHTML = `
    <div class="architecture-detail-header">
      <div><p class="eyebrow">${E(phase.phase)} · ${E(phase.duration)}</p><h2 id="architectureDialogTitle">${E(phase.title)}</h2><p>${E(phase.aim)}</p></div>
      <span class="architecture-phase-badge">${E(phase.duration)}</span>
    </div>
    <div class="architecture-protocol-note"><strong>Clinical implementation note</strong><p>This is an evidence-informed, clinician-controlled session template. It is not a validated HandVivante device setting, a substitute for the current manufacturer IFU, or a universal prescription.</p></div>
    <div class="architecture-detail-grid">
      <article class="architecture-detail-card wide"><strong>Clinical sequence</strong>${architectureList(phase.sequence)}</article>
      <article class="architecture-detail-card"><strong>Advance / modify gate</strong><p>${E(phase.gate)}</p></article>
      <article class="architecture-detail-card"><strong>Therapist cue</strong><blockquote>${E(phase.cue)}</blockquote></article>
      <article class="architecture-detail-card wide"><strong>Minimum documentation</strong><div class="architecture-record-grid">${phase.record.map(item => `<span>${E(item)}</span>`).join('')}</div></article>
      <article class="architecture-detail-card wide evidence"><strong>Evidence interpretation</strong><p>${E(phase.evidence)}</p></article>
    </div>
    <section class="architecture-references"><h3>Evidence anchors</h3><ol>${references.map(reference => `<li>${E(reference)}</li>`).join('')}</ol><p>Bibliographic details follow the project-supplied reference set. Local research governance should verify the final citation list before formal clinical or research use.</p></section>
    <div class="architecture-actions"><button class="primary" data-architecture-go-session type="button">Open guided session</button><button class="secondary" data-architecture-close type="button">Close details</button></div>`;
  $('architectureDialog').showModal();
}
