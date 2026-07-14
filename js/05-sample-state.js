function sampleData() {
  const createdAt = new Date().toISOString();
  const rows = [
    [1, "Left MCA stroke", "Chronic", 4, "1+", 28, 29, 14, 1, "Intact", "Use the affected hand to stabilise a cup and assist with breakfast preparation.", "Monitor flexor tone and shoulder hiking. Forearm support during reach.", "moderate", "Left hemisphere profile; confirm aphasia, apraxia, comprehension and dominant-hand status.", ""],
    [2, "Subacute haemorrhagic stroke", "Subacute", 2, "1", 26, 18, 4, 0, "Intact", "Initiate hand opening and release a lightweight foam block.", "Severe paresis. Use passive-follow with explicit motor attempt and close skin monitoring.", "severe", "Confirm medical stability, blood-pressure parameters, fatigue and shoulder protection before dose progression.", ""],
    [3, "Chronic right hemiparesis", "Outpatient", 5, "1", 29, 47, 35, 1, "Intact", "Improve pinch and controlled release for dressing and meal tasks.", "Prioritise quality and reduce robotic assistance; avoid compensatory trunk flexion.", "mild", "High motor capacity; challenge dexterity, timing and unassisted transfer rather than increasing assistance.", ""],
    [4, "Right MCA stroke with left neglect", "Subacute", 3, "1+", 25, 24, 8, 1, "Intact", "Bring the affected hand into left-sided grooming and tabletop tasks.", "Screen visual neglect, extinction and sustained mirror attention; use structured cueing.", "moderate", "Mirror attention may be unreliable when neglect is present; document visual scanning and awareness directly.", ""],
    [5, "Left pontine infarct", "Inpatient rehabilitation", 3, "1", 27, 26, 10, 0, "Intact", "Open the hand to assist with supported bottle holding.", "Monitor dysarthria, facial weakness, trunk control and fatigue.", "moderate", "Brainstem stroke may combine limb weakness with cranial and postural issues not captured by hand scores.", ""],
    [6, "Cerebellar stroke with upper-limb dysmetria", "Outpatient", 5, "0", 30, 52, 38, 0, "Intact", "Improve reach accuracy and controlled object placement.", "Avoid over-assistance; prioritise endpoint accuracy, timing and graded force.", "mild", "Coordination, not weakness, is the main constraint; robot-completed trajectories may conceal dysmetria.", ""],
    [7, "Lacunar pure motor stroke", "Subacute", 3, "1", 28, 31, 12, 0, "Intact", "Use the affected hand to steady clothing during dressing.", "Monitor emerging tone and isolated wrist/finger extension.", "moderate", "Pure motor presentation may progress quickly; reassess assistance frequently to prevent under-challenge.", ""],
    [8, "Recurrent stroke with flexor hypertonia", "Chronic", 3, "2", 27, 25, 7, 2, "Intact", "Improve hand opening for hygiene and supported release.", "Tone-sensitive range; monitor pain, hygiene, passive range and post-session rebound.", "moderate", "MAS 2 remains movable but tone may dominate performance; range and comfort should precede repetition.", ""],
    [9, "Left MCA stroke with expressive aphasia", "Subacute", 3, "1+", 24, 27, 9, 0, "Intact", "Participate in bilateral meal-preparation tasks using simple cues.", "Use demonstration, yes/no confirmation and supported communication.", "moderate", "Communication support is required; low verbal output must not be mistaken for poor cognition or consent capacity.", ""],
    [10, "Right thalamic stroke with sensory loss", "Chronic", 4, "1", 29, 39, 24, 1, "Intact", "Grade grip force when holding a paper cup.", "Inspect skin, pressure points and object security because protective sensation is reduced.", "moderate", "Sensory loss can impair force scaling and safety even when motor scores are relatively preserved.", ""],
    [11, "Post-thrombectomy right MCA stroke", "Subacute", 2, "0", 27, 20, 5, 0, "Intact", "Initiate supported finger extension during visual-motor practice.", "Confirm neurological stability and monitor fatigue across short blocks.", "severe", "Early recovery is dynamic; repeated reassessment is more informative than a fixed four-week dose.", ""],
    [12, "Stroke with painful shoulder subluxation", "Inpatient rehabilitation", 3, "1+", 26, 23, 6, 5, "Intact", "Use supported hand opening without aggravating shoulder pain.", "Shoulder pain 5/10; ensure proximal support and stop if pain rises.", "moderate", "Pain and subluxation may limit safe positioning; the hand device cannot substitute for shoulder assessment.", ""],
    [13, "Stroke with fragile dorsal hand skin", "Chronic", 4, "1", 28, 34, 18, 1, "Requires clinician review", "Resume light grasp practice after skin tolerance is confirmed.", "Do not fit over fragile skin until contact areas are reviewed and protected.", "moderate", "Contact safety overrides motor eligibility; this profile should remain in review status.", "skin"],
    [14, "Stroke with fixed finger flexion contracture", "Chronic", 3, "3", 27, 22, 4, 2, "Not suitable today", "Maintain hygiene and explore non-device task adaptations.", "Fixed contracture and MAS 3; do not force device range.", "severe", "Mechanical restriction and high tone make the current device pathway unsuitable today.", "msk"],
    [15, "Stroke with cognitive support needs", "Supervised home programme", 3, "1", 21, 28, 10, 0, "Intact", "Complete simple bilateral opening tasks with caregiver cueing.", "Supported pathway not yet verified; assess comprehension, attention and caregiver competence.", "moderate", "A cognitive score alone should not decide participation; task-specific capacity and support must be assessed.", "cognition"],
    [16, "Right MCA stroke with visuospatial inattention", "Chronic", 4, "1", 27, 36, 20, 0, "Intact", "Attend to the affected hand during bilateral object transfer.", "Use visual anchors and record mirror-gaze fidelity; screen neglect formally.", "moderate", "High gaze percentage can still mask neglect if attention is externally cued and not sustained.", ""],
    [17, "Left parietal stroke with limb apraxia", "Chronic", 4, "1", 28, 38, 22, 0, "Intact", "Sequence grasp, transport and release during familiar tool use.", "Differentiate weakness from motor-planning error; use object-based demonstration.", "moderate", "Movement completion may improve while action sequencing remains impaired; task observation is essential.", ""],
    [18, "Stroke with cardiac fatigue limitation", "Outpatient", 4, "1", 29, 35, 19, 1, "Intact", "Complete short bouts of functional grasp without excessive fatigue.", "Use interval dosing; follow cardiovascular parameters and perceived exertion plan.", "moderate", "Dose tolerance, not motor ability alone, determines safe exposure.", ""],
    [19, "Mild chronic stroke with dexterity deficit", "Outpatient", 6, "0", 30, 58, 46, 0, "Intact", "Fasten buttons and manipulate coins with the affected hand.", "Avoid robotic over-assistance; prioritise speed, precision and dual-task use.", "mild", "Ceiling effects are likely on impairment measures; dexterity and real-world use should drive progression.", ""],
    [20, "Acute flaccid hemiplegia after large MCA stroke", "Inpatient rehabilitation", 1, "0", 23, 8, 0, 0, "Intact", "Protect the limb and establish safe visual attention to attempted movement.", "Brunnstrom 1; shoulder protection and medical stability take priority.", "severe", "This profile does not meet the prototype motor-stage threshold; consider positioning and assessment rather than robotic hand training.", ""],
    [21, "Chronic stroke with severe spasticity", "Outpatient", 3, "3", 28, 20, 3, 1, "Intact", "Improve hand hygiene and reduce flexed resting posture.", "MAS 3; passive movement difficult. Specialist tone and contracture review required.", "severe", "The prototype tone threshold is not met; forcing range could cause pain or tissue injury.", ""],
    [22, "Bilateral stroke with asymmetric hand weakness", "Chronic", 3, "1+", 26, 30, 11, 0, "Intact", "Use the less-affected hand to support carefully selected bilateral practice.", "Verify that the reference limb can provide reliable movement and sensation.", "moderate", "Mirror-based assumptions are weakened when both sides are impaired; the reference limb must be assessed.", ""],
    [23, "Dominant-hand stroke in return-to-work pathway", "Outpatient", 5, "1", 30, 49, 37, 0, "Intact", "Use a pen, keyboard and small tools for graded work simulation.", "Progress from isolated dexterity to timed work-relevant tasks.", "mild", "Participation goals and endurance may matter more than small changes in impairment scores.", ""],
    [24, "Non-dominant-hand stroke affecting bimanual tasks", "Chronic", 4, "1", 29, 41, 27, 0, "Intact", "Stabilise containers and assist with food preparation.", "Measure spontaneous assisting-hand use outside therapy.", "moderate", "Bimanual contribution should be tested in natural tasks, not inferred from unilateral scores.", ""],
    [25, "Subacute stroke with oedema and stiffness", "Subacute", 2, "1+", 27, 19, 3, 2, "Requires clinician review", "Reduce stiffness and attempt supported opening after oedema review.", "Measure oedema, skin tension and passive range before fitting.", "severe", "Oedema can alter fit and pressure distribution; device use should wait for contact safety review.", "skin"],
    [26, "Home-based stroke pathway with caregiver support", "Supervised home programme", 4, "1", 28, 33, 17, 1, "Intact", "Practise cup stabilisation safely with trained caregiver setup.", "Confirm caregiver competency, emergency plan and remote escalation pathway.", "moderate", "Home use adds setup, supervision and data-quality risks that are absent in clinic.", ""],
    [27, "Chronic stroke with low adherence and plateau", "Outpatient", 4, "1+", 29, 32, 16, 1, "Intact", "Re-establish meaningful hand use through a personally relevant kitchen task.", "Review burden, motivation, transport and whether the current target remains meaningful.", "moderate", "Low adherence may indicate a poor fit between the programme and the person’s priorities, not lack of rehabilitation potential.", ""]
  ];
  const patients = rows.map(([n,title,phase,brunnstrom,mas,mmse,fma,arat,pain,skin,goal,precautions,pathway,clinicalInsight,failed='']) => {
    const failedChecks = new Set(String(failed).split(',').filter(Boolean));
    return {
      id:`case-${n}`, label:`Case ${n} · ${title}`, condition:'Stroke', phase, brunnstrom, mas, mmse, fma, arat, pain, skin,
      goal, precautions, pathway, clinicalInsight,
      eligibleChecks:{stable:!failedChecks.has('stable'),msk:!failedChecks.has('msk'),skin:!failedChecks.has('skin'),cognition:!failedChecks.has('cognition')},
      createdAt
    };
  });

  const blocked = new Set(['case-13','case-14','case-15','case-20','case-21','case-25']);
  const protocols = patients.filter(p => !blocked.has(p.id)).map(p => {
    const severe=p.pathway==='severe', mild=p.pathway==='mild';
    return {
      id:`protocol-${p.id}`,patientId:p.id,pathway:p.pathway,
      setting:p.phase==='Inpatient rehabilitation'?'Inpatient rehabilitation':p.phase==='Supervised home programme'?'Supervised home-based care':'Supervised clinic',
      frequency:severe?5:mild?4:5,minutes:severe?25:30,weeks:4,
      family1:severe?'Gross hand opening / closing':mild?'Tripod pinch':'Finger individuation',
      family2:severe?'Release control':mild?'Task-oriented reach, grasp and place':'Cylindrical power grasp / release',
      range:severe?'Comfort-limited 40-50%':mild?'Clinician-defined functional range':'Comfort-limited 50-70%',
      speed:mild?'Slow-moderate':'Slow',demand:severe?'Passive-follow + imagery':mild?'Reduced assistance / active':'Attempt-to-move + active-assist',
      gate:severe?'Medical stability confirmed; pain and skin remain acceptable; no unsafe tone, clonus or fit issue; voluntary response is documented rather than inferred from robotic completion.':mild?'Movement quality remains ≥4/5; pain and skin remain stable; unassisted task success is sustained across two sessions.':'Tone and pain remain stable; no skin or device safety event; ≥80% of planned practice is completed with visible motor attempt and immediate functional transfer.',
      transfer:p.goal,createdAt
    };
  });

  const sessions=[];
  patients.forEach((p,index)=>{
    if(blocked.has(p.id)||p.id==='case-27')return;
    const protocol=protocols.find(x=>x.patientId===p.id),severe=p.pathway==='severe',mild=p.pathway==='mild',count=index%4===0?1:2;
    for(let n=0;n<count;n+=1){
      const attempted=severe?5:3,transfer=severe?Math.max(0,n):mild?Math.min(3,2+n):Math.min(3,1+n);
      sessions.push({
        id:`session-${p.id}-${n+1}`,patientId:p.id,protocolId:protocol.id,date:ago(1+n*3+(index%2)),
        activeMinutes:severe?22+n*3:28+n*2,reps:severe?24+index+n*4:mild?34+index+n*4:30+index+n*4,
        painPre:p.pain,painPost:p.id==='case-12'?Math.min(10,p.pain+1):p.pain,
        gaze:p.id==='case-4'||p.id==='case-16'?62+n*5:78+((index+n*7)%19),
        transfer,transferAttempted:attempted,initiation:severe?(n?'Trace':'Not observed'):'Observed',
        deviceFault:p.id==='case-18'&&n===0,deviation:p.id==='case-18'?'Dose shortened because of fatigue and cardiovascular parameters.':'',
        notes:p.clinicalInsight
      });
    }
  });
  sessions.push({id:'session-case-27-1',patientId:'case-27',protocolId:'protocol-case-27',date:ago(18),activeMinutes:24,reps:28,painPre:1,painPost:1,gaze:82,transfer:1,transferAttempted:3,initiation:'Observed',deviceFault:false,deviation:'Programme interrupted after one visit.',notes:'Review barriers, relevance of the goal and acceptable programme burden.'});

  const outcomes=[];
  patients.forEach((p,index)=>{
    const fg=p.brunnstrom<=2?2:p.brunnstrom>=5?3:4,ag=p.arat<5?1:p.brunnstrom>=5?4:3,date=ago(1+(index%5));
    outcomes.push(
      {id:`outcome-${p.id}-fma`,patientId:p.id,measure:'FMA-UE',baseline:Math.max(0,p.fma-fg),current:p.fma,target:Math.min(66,p.fma+(p.pathway==='severe'?8:10)),direction:'Higher is better',date,note:'Synthetic demonstration score. Confirm assessor, positioning and measurement conditions.'},
      {id:`outcome-${p.id}-arat`,patientId:p.id,measure:'ARAT',baseline:Math.max(0,p.arat-ag),current:p.arat,target:Math.min(57,p.arat+(p.pathway==='mild'?8:10)),direction:'Higher is better',date,note:'Synthetic demonstration score. Interpret alongside task quality and spontaneous use.'}
    );
  });

  return {version:2,patients,protocols,sessions,outcomes,events:[],tutorial:{completed:[]},settings:{organisation:'MirrorCoach Demonstration Site',painThreshold:4,audio:false}};
}

function normaliseState(raw) {
  if(!raw||!Array.isArray(raw.patients))return sampleData();
  const legacy=new Set(['case-a','case-b','case-c']);
  if(Number(raw.version||1)<2&&raw.patients.length<=3&&raw.patients.every(p=>legacy.has(p.id)))return sampleData();
  const base=sampleData();
  return {version:Math.max(2,Number(raw.version||1)),patients:raw.patients||[],protocols:raw.protocols||[],sessions:raw.sessions||[],outcomes:raw.outcomes||[],events:raw.events||[],tutorial:raw.tutorial||{completed:[]},settings:{...base.settings,...(raw.settings||{})}};
}

function loadState(){try{return normaliseState(JSON.parse(localStorage.getItem(APP_KEY)));}catch{return sampleData();}}
function saveState(){localStorage.setItem(APP_KEY,JSON.stringify(state));}
function loadUser(){try{return JSON.parse(localStorage.getItem(USER_KEY));}catch{return null;}}
function saveUser(){localStorage.setItem(USER_KEY,JSON.stringify(user));}

let state=loadState(),user=loadUser(),statusTimer,tutorialIndex=0,phaseIndex=0,phaseSecondsLeft=PHASES[0].seconds,timerInterval=null,completedPhases=new Set(),sessionDraft={};
function showStatus(message,type=''){const el=$('appStatus');el.textContent=message;el.className=`app-status show ${type}`;clearTimeout(statusTimer);statusTimer=setTimeout(()=>{el.className='app-status';},3200);}
