(function(){
  'use strict';

  const STORAGE_KEY='mirrorCoach.workflowPreset.v1';
  const SOURCES={
    nice:'https://www.nice.org.uk/guidance/ng236/chapter/Recommendations',
    cochrane:'https://doi.org/10.1002/14651858.CD008449.pub3',
    ma2022:'https://doi.org/10.3389/fneur.2022.884261',
    chen2023:'https://doi.org/10.1038/s41598-023-44069-0'
  };
  const PHASE_META={
    safety:{label:'Safety & readiness',sub:'Daily go / modify / stop decision'},
    calibration:{label:'Calibration & familiarisation',sub:'Fit, alignment and synchrony gate'},
    priming:{label:'Sensorimotor priming',sub:'Mirror gaze, motor intent and assisted movement'},
    training:{label:'Purposeful task practice',sub:'Dose, quality, assistance and rest tracking'},
    transfer:{label:'Functional transfer & cooldown',sub:'Real-task probe, doffing and post-session review'}
  };
  const WORKFLOWS=[
    {
      id:'standard-30',total:30,title:'Standard mirror-integrated session',category:'Guideline anchor',
      phases:{safety:3,calibration:4,priming:5,training:15,transfer:3},
      bestFor:'Default supervised prototype workflow when the person can sustain a conventional session and the clinical goal includes both mirror-focused practice and immediate transfer.',
      caution:'Closest to the NICE mirror-therapy timing anchor, but the robotic component remains a clinician-governed prototype rather than an evidence-settled prescription.',
      trainingPlan:['6-minute goal-linked movement block','1-minute recheck or micro-rest','6-minute second movement family','2-minute best-quality consolidation set']
    },
    {
      id:'rapid-15',total:15,title:'Rapid readiness and first exposure',category:'Brief',
      phases:{safety:3,calibration:3,priming:2,training:5,transfer:2},
      bestFor:'A first supervised exposure, re-entry after a break, uncertain tolerance or a technical fit check where the clinical purpose is observation rather than treatment dose.',
      caution:'Not a substitute for a full rehabilitation session. Stop if the short exposure cannot establish comfortable fit, synchrony, attention and post-device safety.',
      trainingPlan:['2-minute no-object movement check','1-minute symptom and synchrony recheck','2-minute simple goal-linked movement set']
    },
    {
      id:'brief-20',total:20,title:'Brief supported practice',category:'Brief',
      phases:{safety:3,calibration:3,priming:4,training:7,transfer:3},
      bestFor:'Low initial endurance, early supervised practice or a day when medical, cognitive or scheduling constraints limit sustained task work.',
      caution:'Keep task complexity low and document why a shorter session was selected; repeated shortening should trigger review of the wider rehabilitation plan.',
      trainingPlan:['3-minute supported movement family','1-minute rest and quality check','3-minute second simple movement or transfer rehearsal']
    },
    {
      id:'fatigue-25',total:25,title:'Fatigue-aware interval session',category:'Tolerance-led',
      phases:{safety:4,calibration:4,priming:4,training:9,transfer:4},
      bestFor:'Post-stroke fatigue, reduced sustained attention, cardiopulmonary limitation or variable day-to-day tolerance where short work-rest cycles preserve quality.',
      caution:'Use symptom-led rests rather than forcing the clock. New or disproportionate fatigue requires clinical reassessment, not merely a shorter template.',
      trainingPlan:['3-minute task set','1-minute seated rest and symptom check','3-minute second task set','2-minute lower-demand consolidation']
    },
    {
      id:'severe-initiation-30',total:30,title:'Severe paresis and initiation emphasis',category:'Impairment-led',
      phases:{safety:4,calibration:5,priming:8,training:9,transfer:4},
      bestFor:'Severe paresis where the immediate objective is safe alignment, motor attention, attempted initiation and a simple observable response rather than high task volume.',
      caution:'Robot-completed movement must not be recorded as voluntary recovery. Keep range conservative and protect the shoulder, hand skin and passive movement boundaries.',
      trainingPlan:['3-minute gross opening/closing with attempted initiation','1-minute recheck','3-minute release or supported sequencing','2-minute repetition of the clearest voluntary response']
    },
    {
      id:'attention-30',total:30,title:'Attention and mirror-orientation emphasis',category:'Cognition / vision',
      phases:{safety:4,calibration:4,priming:8,training:10,transfer:4},
      bestFor:'People requiring additional time to establish mirror orientation, supported communication, motor imagery or sustained attention before task practice.',
      caution:'Visual inattention, field loss, apraxia or confusion require formal assessment. A high gaze percentage alone does not prove that mirror feedback is being processed accurately.',
      trainingPlan:['4-minute single-pattern task with visual anchors','1-minute attention reset','4-minute second task with reduced cueing','1-minute recall of the movement strategy']
    },
    {
      id:'tone-sensitive-30',total:30,title:'Tone-sensitive range and comfort',category:'Safety-led',
      phases:{safety:5,calibration:5,priming:5,training:10,transfer:5},
      bestFor:'Fluctuating flexor tone, pain, stiffness or a history of post-session rebound where readiness, range verification and cooldown need more time.',
      caution:'This template does not make marked spasticity, fixed contracture or painful range suitable for robotic movement. Specialist tone and musculoskeletal review may be required.',
      trainingPlan:['3-minute slow comfortable-range set','2-minute rest and tone check','3-minute second low-load set','2-minute smooth release consolidation']
    },
    {
      id:'home-supervised-25',total:25,title:'Supervised home setup and carryover',category:'Setting-led',
      phases:{safety:4,calibration:5,priming:4,training:8,transfer:4},
      bestFor:'A supervised home pathway where caregiver competency, setup consistency, contact-area checks and a simple carryover task are central.',
      caution:'Use only within the device IFU, local governance and an approved supervision/escalation plan. This public prototype does not establish home-use suitability.',
      trainingPlan:['3-minute familiar movement family','1-minute caregiver setup check','3-minute functional pattern','1-minute teach-back of the carryover task']
    },
    {
      id:'transfer-35',total:35,title:'Functional transfer emphasis',category:'Activity-led',
      phases:{safety:3,calibration:4,priming:5,training:17,transfer:6},
      bestFor:'Moderate impairment when the main question is whether assisted practice changes a specific bimanual or self-care task immediately after device removal.',
      caution:'Transfer success is a within-session probe, not proof of retained recovery. Record assistance, compensation and task conditions.',
      trainingPlan:['7-minute first goal-linked task family','1-minute recheck','7-minute second task family','2-minute rehearsal of the exact transfer movement']
    },
    {
      id:'moderate-40',total:40,title:'Moderate two-block progression',category:'Task-led',
      phases:{safety:4,calibration:5,priming:6,training:20,transfer:5},
      bestFor:'A person with stable tolerance who benefits from two meaningful task blocks, explicit progression gates and enough time to compare assistance and movement quality.',
      caution:'Do not increase duration and difficulty simultaneously. Progress only one main variable when pain, skin, tone, attention and movement quality remain acceptable.',
      trainingPlan:['8-minute first movement family','2-minute rest, fit and symptom recheck','8-minute second movement family','2-minute reduced-assistance or best-quality set']
    },
    {
      id:'dexterity-45',total:45,title:'Dexterity and precision practice',category:'High function',
      phases:{safety:3,calibration:4,priming:5,training:27,transfer:6},
      bestFor:'Mild motor impairment where speed, selective finger control, graded release and real-object accuracy are more relevant than passive movement volume.',
      caution:'Avoid ceiling effects and robotic over-assistance. Use unassisted dexterity and participation outcomes to judge value.',
      trainingPlan:['10-minute precision block','2-minute rest and compensation review','10-minute object-manipulation block','5-minute reduced-assistance accuracy set']
    },
    {
      id:'adl-50',total:50,title:'Extended bimanual ADL laboratory',category:'Extended',
      phases:{safety:4,calibration:5,priming:6,training:28,transfer:7},
      bestFor:'A well-tolerated supervised session linking multiple movement families to a complex bimanual activity such as meal preparation, dressing or work simulation.',
      caution:'Extended duration increases fatigue and compensation risk. Use planned rests, preserve task relevance and stop before movement quality collapses.',
      trainingPlan:['9-minute component task','2-minute rest and quality review','9-minute second component task','2-minute rest','6-minute integrated bimanual sequence']
    },
    {
      id:'research-60',total:60,title:'Research-fidelity extended protocol',category:'Research only',
      phases:{safety:5,calibration:7,priming:8,training:32,transfer:8},
      bestFor:'A formally approved feasibility or research protocol requiring detailed setup, longer supervised exposure, planned rests, task-level fidelity and complete post-session documentation.',
      caution:'Research-only template. The 2022 pilot used 60 minutes of robotic bimanual training within a 90-minute daily programme; that study design does not establish a universal clinical dose.',
      trainingPlan:['5-minute gross movement preparation','3-minute individual-finger preparation','8-minute no-object familiarisation','2-minute rest','6-minute task item 1','2-minute rest','6-minute task item 2']
    }
  ];
  const WORKFLOW_MAP=Object.fromEntries(WORKFLOWS.map(item=>[item.id,item]));
  const BASE_SEQUENCE=Object.fromEntries(Object.entries(SESSION_ARCHITECTURE).map(([key,value])=>[key,[...value.sequence]]));
  let currentId=localStorage.getItem(STORAGE_KEY)||'standard-30';
  if(!WORKFLOW_MAP[currentId])currentId='standard-30';

  function current(){return WORKFLOW_MAP[currentId];}
  function phaseMinutes(workflow,id){return Number(workflow.phases[id]||0);}
  function timingText(workflow){return PHASES.map(phase=>`${phase.letter} ${phaseMinutes(workflow,phase.id)}m`).join(' · ');}
  function optionsHtml(){
    const groups=[...new Set(WORKFLOWS.map(item=>item.category))];
    return groups.map(group=>`<optgroup label="${E(group)}">${WORKFLOWS.filter(item=>item.category===group).map(item=>`<option value="${E(item.id)}">${E(item.total)} min · ${E(item.title)}</option>`).join('')}</optgroup>`).join('');
  }
  function clinicalNote(workflow){return `${workflow.bestFor} ${workflow.caution}`;}

  function restoreArchitectureBase(){
    Object.entries(BASE_SEQUENCE).forEach(([key,sequence])=>{if(SESSION_ARCHITECTURE[key])SESSION_ARCHITECTURE[key].sequence=[...sequence];});
  }
  function adaptArchitecture(workflow){
    restoreArchitectureBase();
    PHASES.forEach(phase=>{
      const minutes=phaseMinutes(workflow,phase.id);
      phase.seconds=minutes*60;
      SESSION_ARCHITECTURE[phase.id].duration=`${minutes} min`;
    });
    SESSION_ARCHITECTURE.training.sequence=[
      `Selected template: ${workflow.title} (${workflow.total} minutes total).`,
      ...workflow.trainingPlan,
      'Record actual delivered time, rests, interruptions, valid cycles, assistance and compensation; planned time is not delivered dose.'
    ];
  }

  function renderArchitectureCard(){
    const workflow=current();
    const card=document.querySelector('.architecture-card');
    const list=document.getElementById('architectureList');
    if(!card||!list)return;
    let controls=card.querySelector('[data-workflow-controls]');
    if(!controls){
      controls=document.createElement('section');
      controls.className='workflow-controls';
      controls.dataset.workflowControls='true';
      controls.innerHTML=`<div class="workflow-select-row"><label><span>Session template</span><select id="workflowPresetSelect" aria-label="Select session workflow">${optionsHtml()}</select></label><button class="secondary compact" id="compareWorkflowsBtn" type="button">Compare all 13</button></div><div class="workflow-summary" id="workflowSummary"></div>`;
      card.querySelector('.card-intro')?.insertAdjacentElement('afterend',controls);
    }
    const select=controls.querySelector('#workflowPresetSelect');
    if(select)select.value=workflow.id;
    const kicker=card.querySelector('.workspace-kicker');
    if(kicker)kicker.textContent=`${workflow.total}-minute workflow`;
    const summary=controls.querySelector('#workflowSummary');
    if(summary)summary.innerHTML=`<div><strong>${E(workflow.title)}</strong><span>${E(workflow.category)}</span></div><p>${E(workflow.bestFor)}</p><div class="workflow-timing">${E(timingText(workflow))}</div><small>${E(workflow.caution)}</small>`;
    [...list.querySelectorAll('[data-architecture]')].forEach(button=>{
      const id=button.dataset.architecture;
      const phase=PHASE_META[id];
      const minutes=phaseMinutes(workflow,id);
      button.querySelector('b').textContent=`${minutes} min`;
      const strong=button.querySelector('.architecture-copy strong');
      const small=button.querySelector('.architecture-copy small');
      if(strong)strong.textContent=phase.label;
      if(small)small.textContent=phase.sub;
    });
  }

  function renderSessionSelector(){
    const launch=document.querySelector('.session-launch');
    if(!launch)return;
    let panel=launch.querySelector('[data-session-workflow]');
    if(!panel){
      panel=document.createElement('section');
      panel.className='session-workflow-panel';
      panel.dataset.sessionWorkflow='true';
      panel.innerHTML=`<label><span>Session workflow</span><select id="sessionWorkflowSelect" aria-label="Select guided session workflow">${optionsHtml()}</select></label><div><strong id="sessionWorkflowTitle"></strong><p id="sessionWorkflowNote"></p></div>`;
      launch.querySelector('.grid-3')?.insertAdjacentElement('afterend',panel);
    }
    const workflow=current();
    panel.querySelector('#sessionWorkflowSelect').value=workflow.id;
    panel.querySelector('#sessionWorkflowTitle').textContent=`${workflow.total} min · ${workflow.title}`;
    panel.querySelector('#sessionWorkflowNote').textContent=clinicalNote(workflow);
  }

  function ensureDialog(){
    let dialog=document.getElementById('workflowLibraryDialog');
    if(dialog)return dialog;
    dialog=document.createElement('dialog');
    dialog.id='workflowLibraryDialog';
    dialog.className='workflow-library-dialog';
    dialog.setAttribute('aria-labelledby','workflowLibraryTitle');
    document.body.appendChild(dialog);
    dialog.addEventListener('click',event=>{
      if(event.target===dialog||event.target.closest('[data-workflow-close]'))dialog.close();
      const choose=event.target.closest('[data-workflow-choose]');
      if(choose){selectWorkflow(choose.dataset.workflowChoose);dialog.close();}
    });
    return dialog;
  }
  function openComparison(){
    const dialog=ensureDialog();
    dialog.innerHTML=`<button class="dialog-close" data-workflow-close type="button" aria-label="Close workflow comparison">×</button><header class="workflow-dialog-header"><p class="eyebrow">Clinician-selected session templates</p><h2 id="workflowLibraryTitle">Thirteen ways to structure the same five safety-critical phases</h2><p>Timing changes the emphasis, not the clinical responsibilities. Every option retains readiness, fit and synchrony, mirror-focused priming, purposeful practice, transfer and post-session review.</p></header><div class="workflow-boundary"><strong>Evidence boundary</strong><p>NICE describes mirror therapy as an adjunct and uses an approximately 30-minute schedule when provided early after stroke. It also requires session timing and content to be tailored to goals, fatigue and medical needs, while advising against routine robot-assisted arm training. Longer robotic schedules shown here are therefore labelled extended or research-oriented rather than recommended as universal care.</p></div><div class="workflow-library-grid">${WORKFLOWS.map(item=>`<article class="workflow-option ${item.id===currentId?'selected':''}"><div class="workflow-option-top"><span>${item.total} min</span><small>${E(item.category)}</small></div><h3>${E(item.title)}</h3><p>${E(item.bestFor)}</p><div class="workflow-phase-strip">${PHASES.map(phase=>`<span><b>${phase.letter}</b>${phaseMinutes(item,phase.id)}m</span>`).join('')}</div><ul>${item.trainingPlan.map(step=>`<li>${E(step)}</li>`).join('')}</ul><div class="workflow-option-caution">${E(item.caution)}</div><button class="${item.id===currentId?'secondary':'primary'} full" data-workflow-choose="${E(item.id)}" type="button">${item.id===currentId?'Currently selected':'Use this workflow'}</button></article>`).join('')}</div><footer class="workflow-sources"><strong>Evidence anchors</strong><a href="${SOURCES.nice}" target="_blank" rel="noopener noreferrer">NICE NG236</a><a href="${SOURCES.cochrane}" target="_blank" rel="noopener noreferrer">Cochrane mirror-therapy review</a><a href="${SOURCES.ma2022}" target="_blank" rel="noopener noreferrer">Ma et al. 2022 bimanual robotic pilot</a><a href="${SOURCES.chen2023}" target="_blank" rel="noopener noreferrer">Chen et al. 2023 sequential mirror + robot study</a></footer>`;
    dialog.showModal();
  }

  const basePhaseContentHtml=phaseContentHtml;
  phaseContentHtml=function(index){
    const workflow=current();
    const phase=PHASES[index];
    const minutes=phaseMinutes(workflow,phase.id);
    let html=basePhaseContentHtml(index);
    html=html.replace(/Phase ([A-E]) · \d+ minutes?/i,`Phase $1 · ${minutes} minute${minutes===1?'':'s'}`);
    const context=`<section class="selected-workflow-context"><strong>${E(workflow.title)} · ${workflow.total} minutes</strong><span>${E(workflow.category)}</span><p>${E(workflow.bestFor)}</p><small>Planned phase: ${minutes} minutes. Record actual delivered time and every interruption.</small></section>`;
    return html.replace('<div class="phase-card">',`<div class="phase-card">${context}`);
  };

  const baseResetSessionDraft=resetSessionDraft;
  resetSessionDraft=function(){
    baseResetSessionDraft();
    const workflow=current();
    sessionDraft.workflowId=workflow.id;
    sessionDraft.workflowTitle=workflow.title;
    sessionDraft.plannedMinutes=workflow.total;
    sessionDraft.activeMinutes=workflow.total;
    phaseSecondsLeft=PHASES[0].seconds;
  };

  const baseSaveSession=saveSession;
  saveSession=function(){
    const workflow=current();
    const marker=`Workflow: ${workflow.title} (${workflow.total} min planned).`;
    sessionDraft.notes=[marker,sessionDraft.notes].filter(Boolean).join(' ');
    baseSaveSession();
    const latest=state.sessions?.[0];
    if(latest){
      latest.workflowId=workflow.id;
      latest.workflowTitle=workflow.title;
      latest.plannedMinutes=workflow.total;
      saveState();
      renderAll();
    }
  };

  const baseOpenArchitecturePhase=openArchitecturePhase;
  openArchitecturePhase=function(id){
    baseOpenArchitecturePhase(id);
    const workflow=current();
    const content=document.getElementById('architectureDialogContent');
    const note=content?.querySelector('.architecture-protocol-note');
    if(note&&!content.querySelector('[data-workflow-dialog-context]')){
      note.insertAdjacentHTML('afterend',`<div class="architecture-protocol-note workflow-dialog-context" data-workflow-dialog-context><strong>Selected workflow · ${E(workflow.title)}</strong><p>${E(workflow.bestFor)} Phase allocation: ${E(timingText(workflow))}. ${E(workflow.caution)}</p></div>`);
    }
  };

  function selectWorkflow(id){
    if(!WORKFLOW_MAP[id])return;
    stopTimer();
    currentId=id;
    localStorage.setItem(STORAGE_KEY,id);
    adaptArchitecture(current());
    resetSessionDraft();
    renderArchitectureCard();
    renderSessionSelector();
    if(!document.getElementById('session')?.hidden)renderSession();
    showStatus(`${current().title} selected. Timers and planned minutes have been reset.`);
  }

  function bind(){
    document.addEventListener('change',event=>{
      const select=event.target.closest('#workflowPresetSelect,#sessionWorkflowSelect');
      if(select)selectWorkflow(select.value);
    });
    document.addEventListener('click',event=>{
      if(event.target.closest('#compareWorkflowsBtn'))openComparison();
    });
  }

  adaptArchitecture(current());
  renderArchitectureCard();
  renderSessionSelector();
  bind();
  resetSessionDraft();
  if(!document.getElementById('session')?.hidden)renderSession();
  window.MirrorCoachWorkflows={all:WORKFLOWS,current,select:selectWorkflow,compare:openComparison};
})();
