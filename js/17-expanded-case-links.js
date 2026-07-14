(function(){
  'use strict';

  const REFERENCES=[
    {
      authors:'Thieme H, Morkisch N, Mehrholz J, Pohl M, Behrens J, Borgetto B, Dohle C.',
      year:'2018',
      title:'Mirror therapy for improving motor function after stroke.',
      source:'Cochrane Database of Systematic Reviews, Issue 7, CD008449.',
      url:'https://doi.org/10.1002/14651858.CD008449.pub3',
      link:'DOI: 10.1002/14651858.CD008449.pub3'
    },
    {
      authors:'Nisar H, Annamraju S, Deka S, Horowitz A, Stipanovic D.',
      year:'2024',
      title:'Robotic mirror therapy for stroke rehabilitation through virtual activities of daily living.',
      source:'Computational and Structural Biotechnology Journal, 24, 126–135.',
      url:'https://search.crossref.org/?q=Robotic%20mirror%20therapy%20for%20stroke%20rehabilitation%20through%20virtual%20activities%20of%20daily%20living',
      link:'Crossref title record'
    },
    {
      authors:'Chen Y-W, Li K-Y, Lin C-H, Hung P-H, Lai H-T, Wu C-Y.',
      year:'2023',
      title:'The effect of sequential combination of mirror therapy and robot-assisted therapy on motor recovery and self-efficacy in stroke patients.',
      source:'Scientific Reports, 13, 16841.',
      url:'https://doi.org/10.1038/s41598-023-44069-0',
      link:'DOI: 10.1038/s41598-023-44069-0'
    },
    {
      authors:'Wu X, Qiao X, Xie Y, Yang Q, An W, Xia L, Li J, Lu X.',
      year:'2025',
      title:'Rehabilitation training robot using mirror therapy for the upper and lower limb after stroke: a prospective cohort study.',
      source:'Journal of NeuroEngineering and Rehabilitation, 22, Article 45.',
      url:'https://search.crossref.org/?q=Rehabilitation%20training%20robot%20using%20mirror%20therapy%20for%20the%20upper%20and%20lower%20limb%20after%20stroke',
      link:'Crossref title record'
    },
    {
      authors:'Chen YM, Lai SS, Pei YC, Hsieh CJ, Chang WH.',
      year:'2020',
      title:'Development of a Novel Task-oriented Rehabilitation Program using a Bimanual Exoskeleton Robotic Hand.',
      source:'Journal of Visualized Experiments, 159.',
      url:'https://doi.org/10.3791/61057',
      link:'DOI: 10.3791/61057'
    },
    {
      authors:'Ma D, Li X, Xu Q, Yang F, Feng Y, Wang W, Huang JJ, Pei YC, Pan Y.',
      year:'2022',
      title:'Robot-Assisted Bimanual Training Improves Hand Function in Patients With Subacute Stroke: A Randomized Controlled Pilot Study.',
      source:'Frontiers in Neurology, 13, 884261.',
      url:'https://doi.org/10.3389/fneur.2022.884261',
      link:'DOI: 10.3389/fneur.2022.884261'
    }
  ];

  const style=document.createElement('style');
  style.textContent=`
    [data-case-open]{cursor:pointer}
    .global-case-link{outline:none;transition:background .16s ease,box-shadow .16s ease,transform .16s ease}
    .global-case-link:hover{background:rgba(194,31,71,.055);box-shadow:0 0 0 2px rgba(194,31,71,.12);transform:translateY(-1px)}
    .global-case-link:focus-visible{outline:3px solid rgba(194,31,71,.28);outline-offset:2px}
    .case-reference-link{color:var(--accent);text-decoration:underline;text-decoration-thickness:1px;text-underline-offset:3px}
    .expanded-case-note{border-left:4px solid var(--accent);background:#fff7f9}
    .evidence-library{margin-top:16px;padding:16px;border:1px solid var(--line);border-radius:16px;background:#faf8f9}
    .evidence-library h3{margin-bottom:8px}
    .evidence-library ol{margin:0;padding-left:20px}
    .evidence-library li{margin:10px 0;color:#5b5557;font-size:11px;line-height:1.55}
    .evidence-library a{font-weight:850}
    .evidence-library .evidence-note{margin:12px 0 0;color:var(--muted);font-size:10px}
  `;
  document.head.appendChild(style);

  function patientForText(text){
    const value=String(text||'').replace(/\s+/g,' ').trim();
    return state?.patients?.find(patient=>value.includes(patient.label))||null;
  }

  function makeClickable(element,patient){
    if(!element||!patient||element.dataset.caseOpen)return;
    element.dataset.caseOpen=patient.id;
    element.classList.add('global-case-link');
    if(!/^(BUTTON|A|INPUT|SELECT|TEXTAREA)$/.test(element.tagName)){
      element.tabIndex=0;
      element.setAttribute('role','button');
      element.setAttribute('aria-label',`${patient.label}. Open detailed clinical case review.`);
    }
    element.querySelectorAll('strong,h3,b').forEach(label=>{
      if(label.textContent.includes(patient.label))label.classList.add('case-reference-link');
    });
  }

  function enhanceAllCaseReferences(){
    if(!Array.isArray(state?.patients))return;
    document.querySelectorAll([
      '#dashboardPatientTable tr',
      '.dose-row',
      '.prompt-card',
      '.patient-card',
      '.protocol-card',
      '.outcome-card',
      '.event-card',
      '.session-card',
      '.recent-session-card',
      '[data-patient-id]'
    ].join(',')).forEach(element=>{
      if(element.closest('#patientInsightDialog'))return;
      makeClickable(element,patientForText(element.textContent));
    });

    document.querySelectorAll('strong,h3,b').forEach(element=>{
      if(element.closest('#patientInsightDialog,[data-case-open],button,a,option'))return;
      const patient=patientForText(element.textContent);
      if(patient&&element.textContent.trim().startsWith(patient.label))makeClickable(element,patient);
    });
  }

  function referencesHtml(){
    return `<section class="evidence-library" data-expanded-evidence>
      <h3>Selected mirror-therapy and bimanual-robotics references</h3>
      <ol>${REFERENCES.map(ref=>`<li><b>${ref.authors} (${ref.year}).</b> ${ref.title} <i>${ref.source}</i> <a href="${ref.url}" target="_blank" rel="noopener noreferrer">${ref.link}</a></li>`).join('')}</ol>
      <p class="evidence-note">References describe populations, interventions and study designs that differ from these synthetic cases. They support critical appraisal and protocol development; they do not validate the prototype screening rule or determine treatment for an individual patient.</p>
    </section>`;
  }

  function enrichDialog(){
    const dialog=document.getElementById('patientInsightDialog');
    if(!dialog||!dialog.open)return;
    const title=dialog.querySelector('#patientInsightTitle')?.textContent||'';
    const patient=state?.patients?.find(item=>item.label===title);
    if(patient&&!dialog.querySelector('[data-expanded-case-note]')){
      const grid=dialog.querySelector('.patient-insight-grid');
      if(grid){
        const note=document.createElement('article');
        note.className='patient-insight-card wide expanded-case-note';
        note.dataset.expandedCaseNote='true';
        note.innerHTML=`<strong>Case-specific synthesis</strong><h3>${patient.label}</h3><p>${patient.clinicalInsight||'Interpret the motor, sensory, cognitive, visual, pain, skin, participation and support profile together.'}</p><p><b>Clinical boundary:</b> ${patient.precautions||'Confirm device fit, current medical status and task-specific safety before treatment.'}</p>`;
        grid.prepend(note);
      }
    }
    const existing=dialog.querySelector('[data-expanded-evidence]');
    if(!existing){
      const actions=dialog.querySelector('.patient-insight-actions');
      actions?.insertAdjacentHTML('beforebegin',referencesHtml());
    }
  }

  document.addEventListener('click',event=>{
    const target=event.target.closest('[data-case-open]');
    if(!target||target.closest('#patientInsightDialog'))return;
    if(event.target.closest('button,a,input,select,textarea,label')&&event.target!==target)return;
    event.preventDefault();
    window.openPatientInsight?.(target.dataset.caseOpen,'overview');
  });

  document.addEventListener('keydown',event=>{
    const target=event.target.closest('[data-case-open]');
    if(!target||event.target!==target||!['Enter',' '].includes(event.key))return;
    event.preventDefault();
    window.openPatientInsight?.(target.dataset.caseOpen,'overview');
  });

  const observer=new MutationObserver(()=>{
    enhanceAllCaseReferences();
    enrichDialog();
  });
  observer.observe(document.body,{childList:true,subtree:true});
  enhanceAllCaseReferences();
  enrichDialog();
})();
