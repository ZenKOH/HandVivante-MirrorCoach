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
