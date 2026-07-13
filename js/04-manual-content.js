const MANUAL_SECTIONS = [
  {
    id: 'scope', title: '1. Scope, intended audience and document control', keywords: 'scope ifu clinician therapist manual governance',
    html: `<p>This web manual supports occupational therapists, physical therapists, trained assistants, clinical researchers, and supervised patients or caregivers using HandVivante™ MirrorHand in an approved rehabilitation programme.</p>
      <div class="callout"><strong>Document hierarchy:</strong> the current manufacturer-controlled Instructions for Use (IFU), device labelling, local regulations, institutional policy, and clinician judgement take precedence over this prototype.</div>
      <h4>Use this manual to</h4><ul><li>orient staff to the system and training modes;</li><li>standardise pre-use checks, positioning, therapist cueing, dose recording, and functional transfer;</li><li>support competency assessment and research protocol fidelity.</li></ul>`
  },
  {
    id: 'overview', title: '2. Product overview and system components', keywords: 'product components robotic hand sensor glove control box weight',
    html: `<p>The supplied brochure describes a bilateral exoskeleton system that uses sensors on the less-affected hand to guide an actuator-driven robotic hand on the affected side.</p>
      <figure class="manual-photo"><img src="assets/exercise-bilateral-grasp.webp" alt="HandVivante sensor glove, robotic hand and control unit arranged for bilateral grasp practice"><figcaption>HandVivante™ MirrorHand bilateral configuration with the guiding sensor glove, affected-side robotic hand and control unit.</figcaption></figure>
      <h4>Robotic hand</h4><ul><li>Lightweight exoskeleton described as under 800 g.</li><li>Metallic structure with adjustable thumb positioning according to training needs.</li><li>Designed to permit individual finger and multi-finger movement and interaction with real objects.</li></ul>
      <h4>Sensor glove</h4><ul><li>Lightweight glove described as under 200 g.</li><li>Built-in sensors detect individual finger movements of the guiding hand.</li></ul>
      <h4>Control unit</h4><ul><li>Compact, lightweight control unit supporting the available operating modes.</li><li>Exact controls, connectors, indicators, and configuration-specific specifications must be verified against the current IFU.</li></ul>`
  },
  {
    id: 'indications', title: '3. Indicated use and eligibility screen', keywords: 'indicated use eligibility mas mmse brunnstrom frequency duration',
    html: `<p>The supplied training material identifies hand motor impairment associated with neuro-muscular-skeletal system injury as the broad use context and lists the following screening conditions:</p>
      <ul><li>Modified Ashworth Scale (MAS) &lt; 3;</li><li>stable physiological condition;</li><li>Mini-Mental State Examination (MMSE) ≥ 24;</li><li>Brunnstrom Recovery Stage of the arm ≥ 2.</li></ul>
      <p>It suggests once-daily use for approximately 30-40 minutes, with frequency and duration adjusted to the patient’s condition. MirrorCoach uses a 30-minute standard template, but the clinician must individualise dose.</p>
      <div class="callout">Passing a numerical screen does not automatically establish suitability. Confirm range, pain, skin integrity, cognition/communication, sensory status, goals, and the ability to tolerate external movement.</div>`
  },
  {
    id: 'contraindications', title: '4. Contraindications and precautions', keywords: 'contraindications fracture tendon contracture skin wound cellulitis cerebellar cognitive convulsion pain',
    html: `<p>The supplied training material states that patients diagnosed with the following should not use the product:</p>
      <ul><li>poor cognitive ability such as moderate-to-severe dementia, or the listed mental/neurological concern such as convulsions;</li><li>wrist musculoskeletal disease that cannot withstand external force, including fracture, tendon rupture, or contracture;</li><li>skin disorders such as pressure sores, trauma, or cellulitis;</li><li>cerebellar stroke, as specifically listed in the supplied training slide.</li></ul>
      <p>Confirm the current manufacturer labelling because indications and contraindications may vary by market, device version, and updated regulatory documentation.</p>
      <h4>Additional clinician review considerations</h4><ul><li>painful or unstable shoulder/upper-limb condition;</li><li>marked spasticity, clonus, or fixed range limitation;</li><li>visual-perceptual, neglect, aphasia, behavioural, or sensory factors affecting safe participation;</li><li>recent medical change, fatigue, autonomic symptoms, or any concern requiring medical clearance.</li></ul>`
  },
  {
    id: 'preuse', title: '5. Pre-use inspection and workspace preparation', keywords: 'inspection cable power workspace chair mirror objects',
    html: `<figure class="manual-photo"><img src="assets/exercise-robotic-hand-closeup.webp" alt="Close-up of the HandVivante robotic hand, finger linkages, straps, cable and control unit"><figcaption>Inspect the robotic hand, finger interfaces, straps, linkages, cables and control unit before every session.</figcaption></figure>
      <ol><li>Confirm the prescribed patient, side, mode, range, speed, task, and stop thresholds.</li><li>Inspect the robotic hand, sensor glove, straps, finger interfaces, cables, connectors, and control unit for visible damage or contamination.</li><li>Do not use a damaged, modified, wet, excessively hot, or unexpectedly behaving component.</li><li>Prepare a stable chair, supported forearms, clear tabletop, correctly aligned mirror, and lightweight non-breakable objects.</li><li>Keep cables away from wheels, walking routes, hot surfaces, liquids, and pinch points.</li><li>Identify the pause/stop control specified in the current IFU before initiating motion.</li></ol>`
  },
  {
    id: 'patientcheck', title: '6. Patient safety and readiness check', keywords: 'skin pain tone posture readiness safety',
    html: `<ol><li>Inspect the dorsum and palm, finger contact areas, wrist, and forearm for redness, pressure marks, broken skin, swelling, unusual colour, or temperature change.</li><li>Record current pain and ask about new numbness, tingling, cramping, fatigue, or change in tone.</li><li>Check comfortable passive range without forcing the hand.</li><li>Position the patient upright with feet supported, shoulders level, forearms supported, and the mirror at midline.</li><li>Postpone or modify the session when findings exceed the clinician-approved boundaries.</li></ol>`
  },
  {
    id: 'donning', title: '7. Donning and alignment', keywords: 'donning fit straps fingers thumb wrist sensor glove robotic hand',
    html: `<figure class="manual-photo"><img src="assets/exercise-assisted-open-close.webp" alt="HandVivante robotic hand fitted to the affected hand with fingers aligned in the exoskeleton"><figcaption>Confirm finger-joint alignment, thumb position, strap security, wrist support and cable clearance before movement.</figcaption></figure>
      <h4>Guiding hand</h4><ol><li>Place the less-affected hand in the sensor glove according to the current IFU.</li><li>Align each finger with its sensor channel and secure the glove without constriction.</li></ol>
      <h4>Affected hand</h4><ol><li>Support the affected forearm and place the hand into the robotic exoskeleton.</li><li>Align finger joints and interfaces; confirm the thumb position matches the clinician-selected training task.</li><li>Secure straps so the hand is stable but not compressed.</li><li>Recheck colour, warmth, sensation, comfort, and wrist alignment.</li></ol>
      <div class="callout">Never use the robot to force a hand into position. If the device cannot be fitted within comfortable range, stop and review suitability.</div>`
  },
  {
    id: 'calibration', title: '8. Start-up, calibration and synchrony verification', keywords: 'calibration synchrony start-up mode movement check',
    html: `<figure class="manual-photo"><img src="assets/exercise-assisted-open-close.webp" alt="HandVivante robotic hand performing a supported finger movement during synchrony verification"><figcaption>Begin with slow, limited-range movement while observing the hand, device behaviour and patient comfort.</figcaption></figure>
      <ol><li>Connect and power the system only as specified in the current IFU.</li><li>Select the clinician-prescribed mode and begin at low speed and limited range.</li><li>Ask the patient to slowly open and close the guiding hand.</li><li>Observe whether the affected robotic hand follows smoothly and in the intended direction.</li><li>Check for delay, unexpected movement, mechanical obstruction, painful end range, excessive pressure, or a tone spike.</li><li>Pause immediately if synchrony or comfort is not acceptable.</li></ol>
      <p>Do not begin high-repetition practice until the therapist has verified smooth, predictable movement and the patient can identify how to pause or signal discomfort.</p>`
  },
  {
    id: 'modes', title: '9. Operating modes and clinical applications', keywords: 'mirror guided bimanual passive range individual finger five finger task oriented',
    html: `<div class="manual-photo-grid"><figure class="manual-photo"><img src="assets/exercise-cup-grasp.webp" alt="HandVivante sensor glove and robotic hand grasping lightweight cups"><figcaption>Object-based bilateral grasp practice.</figcaption></figure><figure class="manual-photo"><img src="assets/exercise-peg-transfer.webp" alt="HandVivante robotic hand and sensor glove performing a peg-board task"><figcaption>Task-oriented finger control and placement practice.</figcaption></figure></div>
      <h4>Mirror-guided / bimanual training</h4><p>The guiding hand’s finger movements are detected and translated into movement of the affected robotic hand. Use this for synchronous bilateral movement and Robotic Mirror Hand Therapy when combined with a correctly positioned mirror and therapist attention cues.</p>
      <h4>Passive range-of-motion training</h4><p>The supplied brochure describes individual-finger and five-finger operation. Use only the prescribed comfortable range and monitor pain, tone, skin, and mechanical alignment continuously.</p>
      <h4>Task-oriented bimanual training</h4><p>The open-palm design allows interaction with real occupational therapy objects. Select lightweight, non-breakable objects that are easy to release and directly linked to a functional goal.</p>
      <div class="callout">Mode names and control steps may differ across hardware or software versions. Confirm the exact device interface in the current IFU.</div>`
  },
  {
    id: 'session', title: '10. Standard 30-minute RMHT session', keywords: '30 minute session safety calibration priming training transfer',
    html: `<figure class="manual-photo"><img src="assets/exercise-bilateral-grasp.webp" alt="HandVivante bilateral practice with the sensor glove, robotic hand and control unit"><figcaption>Use the bilateral system within a therapist-prescribed sequence that combines safety checks, synchrony, high-repetition practice and functional transfer.</figcaption></figure>
      <ol><li><strong>Safety & readiness - 3 min:</strong> skin, pain, tone, posture, and daily-status screen.</li><li><strong>Calibration & familiarisation - 4 min:</strong> fit, low-range movement, and synchrony check.</li><li><strong>Priming - 5 min:</strong> five slow hand open-close cycles, three sequential finger rounds, two thumb-opposition rounds, with mirror gaze and motor imagery.</li><li><strong>High-repetition blocks - 15 min:</strong> two prescribed movement families with measurable cycle, quality, and assistance targets.</li><li><strong>Transfer & cooldown - 3 min:</strong> remove the device/mirror and attempt two or three unassisted functional movements.</li></ol>
      <h4>Core cue</h4><p>“Watch the reflected hand. Imagine it is your affected hand. Begin your own effort just before the glove moves, and feel the movement at the same time.”</p>`
  },
  {
    id: 'stop', title: '11. Immediate stop rules', keywords: 'stop pain skin numbness tingling spasticity clonus fault heat synchrony',
    html: `<p>Pause or stop movement immediately for any of the following:</p><ol><li><strong>Pain escalation:</strong> new, rapidly increasing, disproportionate, or clinician-threshold-exceeding pain.</li><li><strong>Skin or neurovascular concern:</strong> shearing, blistering, persistent redness, swelling, numbness, tingling, unusual colour, or temperature change.</li><li><strong>Unsafe movement or device behaviour:</strong> sustained spasticity or clonus, mechanical obstruction, loss of synchrony, unexpected motion, excessive pressure, warning indicator, unusual sound, odour, or heat.</li></ol>
      <p>Place the system in the safe stopped state described by the IFU, assess the patient, document the event, and escalate according to local policy.</p>`
  },
  {
    id: 'task', title: '12. Task design and progression', keywords: 'task design object progression range speed complexity assistance',
    html: `<div class="manual-photo-grid"><figure class="manual-photo"><img src="assets/exercise-cup-grasp.webp" alt="HandVivante bilateral cylindrical grasp practice with lightweight cups"><figcaption>Progress from supported grasp and release using lightweight objects.</figcaption></figure><figure class="manual-photo"><img src="assets/exercise-peg-transfer.webp" alt="HandVivante bilateral peg-board task for pinch and placement"><figcaption>Advance to task-oriented placement when alignment and control are adequate.</figcaption></figure></div>
      <p>The supplied training material highlights reaching and grasping, bilateral and unilateral training, fine motor activity, and conventional occupational therapy objects.</p>
      <h4>Progression order</h4><ol><li>tolerance and alignment;</li><li>comfortable range;</li><li>repetition volume;</li><li>speed;</li><li>movement complexity and object interaction;</li><li>volitional demand and reduced assistance;</li><li>unassisted functional transfer.</li></ol>
      <p>Progress one main variable at a time and use an objective gate such as stable tone, stable pain, intact skin, ≥80% completed cycles, and acceptable movement quality over two sessions.</p>`
  },
  {
    id: 'doffing', title: '13. Doffing, post-session check and documentation', keywords: 'doffing post session skin documentation pain reps transfer',
    html: `<ol><li>Pause/stop the device according to the IFU before releasing straps or moving the hand.</li><li>Support the affected limb while removing the robotic hand, then remove the sensor glove.</li><li>Recheck skin, sensation, pain, swelling, and tone.</li><li>Complete two or three unassisted transfer attempts while the patient is still primed.</li><li>Record delivered minutes, cycles, range, speed, assistance, interruptions, mirror gaze, therapist cues, transfer performance, pain, skin findings, and any deviation or adverse event.</li></ol>`
  },
  {
    id: 'cleaning', title: '14. Cleaning, storage and maintenance boundaries', keywords: 'cleaning disinfection storage maintenance service',
    html: `<p>This prototype intentionally does not prescribe a cleaning chemical, concentration, contact time, lubrication method, maintenance interval, or disassembly procedure because those details must come from the current manufacturer-controlled IFU.</p>
      <ul><li>Follow local infection-prevention policy and the approved IFU-compatible cleaning process.</li><li>Do not immerse components or allow liquid into connectors or housings unless the IFU explicitly permits it.</li><li>Store the system dry, protected from impact, cable strain, contamination, and unauthorised use.</li><li>Remove damaged or failed equipment from service and contact authorised support.</li><li>Do not perform unauthorised repair, modification, calibration, or software change.</li></ul>`
  },
  {
    id: 'troubleshooting', title: '15. Troubleshooting and escalation', keywords: 'troubleshooting no movement delayed fault error cable support',
    html: `<h4>Robot does not move or follows unpredictably</h4><ol><li>Pause/stop the session.</li><li>Support the patient’s hand and check for mechanical obstruction or visible cable/connector problems without opening the device.</li><li>Confirm the prescribed mode and correct side/configuration against the IFU.</li><li>Restart only when the IFU permits and the therapist can verify safe synchrony.</li></ol>
      <h4>Patient reports discomfort</h4><ol><li>Stop movement and inspect fit, contact areas, alignment, range, and tone.</li><li>Do not “train through” escalating pain, numbness, skin change, or clonus.</li><li>Document and escalate according to clinical policy.</li></ol>
      <h4>Unresolved fault</h4><p>Remove the device from service, label it clearly, preserve fault information, and contact authorised technical support.</p>`
  },
  {
    id: 'competency', title: '16. Staff competency checklist', keywords: 'competency checklist training sign off',
    html: `<ul><li>Explains the purpose and limits of HandVivante and RMHT.</li><li>Identifies all components and the current IFU.</li><li>Completes eligibility, contraindication, skin, pain, tone, and range checks.</li><li>Prepares the workspace and identifies the IFU-specified pause/stop process.</li><li>Dons and aligns both hands without pressure or forced range.</li><li>Verifies low-range synchrony before training.</li><li>Uses mirror-gaze, motor-imagery, and attempt-to-move scripting.</li><li>Selects task-oriented objects and observes compensations.</li><li>Applies stop rules immediately.</li><li>Doffs safely, performs post-session checks, and documents dose, fidelity, transfer, and events.</li></ul>
      <p>Local services should define supervised practice, competency observation, retraining frequency, and authorised scope for assistants and home users.</p>`
  },
  {
    id: 'evidence', title: '17. Evidence and implementation notes', keywords: 'evidence pilot fma arat bbt mal research',
    html: `<p>The supplied training presentation cites pilot studies of task-oriented and bimanual robot-assisted hand training, including protocols using five sessions per week and 20 total sessions, with outcomes such as FMA-UE, ARAT, Box and Block Test, Motor Activity Log, and Wolf Motor Function Test.</p>
      <p>These studies support feasibility and further evaluation; they do not establish universal superiority for every patient, device, or comparator. MirrorCoach therefore presents evidence-informed workflows without autonomous treatment recommendations or guaranteed outcome claims.</p>`
  }
];