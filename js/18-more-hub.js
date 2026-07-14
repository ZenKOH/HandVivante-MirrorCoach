(function(){
  'use strict';

  const SOURCES={
    nice:'https://www.nice.org.uk/guidance/ng236/chapter/Recommendations',
    who:'https://www.who.int/standards/classifications/international-classification-of-functioning-disability-and-health',
    harms:'https://www.equator-network.org/reporting-guidelines/consort-harms/',
    spirit:'https://www.consort-spirit.org/'
  };

  const DESTINATIONS=[
    {
      tab:'manual',index:'01',roles:'clinician,patient,researcher,admin',title:'Operating safety',
      description:'Fit, alignment, synchrony, contact-area skin, modify/stop criteria, doffing and the boundary between this implementation aid and the manufacturer-controlled IFU.',
      use:'Use before setup, after a fault, or when tolerance changes.'
    },
    {
      tab:'outcomes',index:'02',roles:'clinician,patient,researcher,admin',title:'Outcome interpretation',
      description:'Separate body-function change from activity and participation; preserve assessor, setup, cueing and timing so a score change is not mistaken for clinical meaning.',
      use:'Use for baseline, review and transfer-of-care measurement.'
    },
    {
      tab:'research',index:'03',roles:'clinician,researcher,admin',title:'Research integrity & safety',
      description:'Review protocol fidelity, deviations, adverse events, missing data and export completeness. Device cycles are process data—not proof of efficacy or recovered voluntary control.',
      use:'Use for feasibility studies, audits and safety review.'
    },
    {
      tab:'settings',index:'04',roles:'clinician,admin',title:'Site & data controls',
      description:'Manage local thresholds, pseudonymous browser storage, backup/restore and deployment requirements such as authentication, encryption, retention and audit logs.',
      use:'Use before site configuration or any production deployment.'
    }
  ];

  function itemHtml(item){
    return `<button class="tab-button nav-menu-item more-hub-item" type="button" data-tab="${item.tab}" data-roles="${item.roles}" role="menuitem">
      <span class="more-hub-index">${item.index}</span>
      <span class="more-hub-copy"><strong>${item.title}</strong><span>${item.description}</span><small>${item.use}</small></span>
      <span class="more-hub-arrow" aria-hidden="true">→</span>
    </button>`;
  }

  function buildHub(){
    const original=document.getElementById('navMore');
    if(!original||original.dataset.moreHubReady==='true')return original;

    const hub=document.createElement('div');
    hub.className='nav-more';
    hub.id='navMore';
    hub.dataset.moreHubReady='true';
    hub.innerHTML=`
      <button class="nav-more-toggle" id="navMoreButton" type="button" aria-haspopup="menu" aria-expanded="false" aria-controls="navMoreMenu">
        <span data-more-label>More</span><span class="nav-more-chevron" aria-hidden="true">▾</span>
      </button>
      <div class="nav-more-menu more-hub" id="navMoreMenu" role="menu" aria-labelledby="navMoreButton" hidden>
        <header class="more-hub-header">
          <div><p class="eyebrow">Clinical & research tools</p><h2>Open the layer that answers the next decision.</h2><p>These routes are deliberately separate from the main treatment workflow: operating safeguards, outcome interpretation, research integrity and site governance.</p></div>
          <div class="more-hub-boundary">Prototype orientation only. Current IFU, local policy, ethics approval and clinical judgement remain controlling.</div>
        </header>
        <div class="more-hub-grid">${DESTINATIONS.map(itemHtml).join('')}</div>
        <footer class="more-hub-evidence">
          <strong>Evidence anchors</strong>
          <p>NICE distinguishes comprehensive assessment, meaningful activity/participation goals and repetitive task practice from the evidence boundary around robot-assisted arm training. WHO ICF frames functioning in context. Research records should use transparent protocol and harms reporting standards.</p>
          <div class="more-hub-links">
            <a href="${SOURCES.nice}" target="_blank" rel="noopener noreferrer">NICE NG236</a>
            <a href="${SOURCES.who}" target="_blank" rel="noopener noreferrer">WHO ICF</a>
            <a href="${SOURCES.harms}" target="_blank" rel="noopener noreferrer">CONSORT Harms 2022</a>
            <a href="${SOURCES.spirit}" target="_blank" rel="noopener noreferrer">SPIRIT–CONSORT 2025</a>
          </div>
        </footer>
      </div>`;
    original.replaceWith(hub);
    return hub;
  }

  function init(){
    const hub=buildHub();
    if(!hub)return;
    const button=hub.querySelector('#navMoreButton');
    const menu=hub.querySelector('#navMoreMenu');

    function setOpen(open,{focus=false}={}){
      menu.hidden=!open;
      button.setAttribute('aria-expanded',String(open));
      hub.classList.toggle('open',open);
      if(open&&focus){
        const first=[...menu.querySelectorAll('[role="menuitem"]')].find(item=>!item.hidden);
        first?.focus();
      }
    }

    button.addEventListener('click',event=>{
      event.preventDefault();
      event.stopPropagation();
      setOpen(menu.hidden,{focus:false});
    });

    menu.addEventListener('click',event=>{
      const tab=event.target.closest('[data-tab]');
      if(tab)setOpen(false);
    });

    hub.addEventListener('keydown',event=>{
      if(event.key==='Escape'&&!menu.hidden){event.preventDefault();setOpen(false);button.focus();return;}
      if(event.target===button&&['ArrowDown','Enter',' '].includes(event.key)){
        if(event.key==='ArrowDown'){event.preventDefault();setOpen(true,{focus:true});}
        return;
      }
      if(menu.hidden||!['ArrowDown','ArrowUp','Home','End'].includes(event.key))return;
      const items=[...menu.querySelectorAll('[role="menuitem"]')].filter(item=>!item.hidden);
      const index=items.indexOf(document.activeElement);
      if(index<0)return;
      event.preventDefault();
      const next=event.key==='Home'?0:event.key==='End'?items.length-1:event.key==='ArrowDown'?(index+1)%items.length:(index-1+items.length)%items.length;
      items[next]?.focus();
    });

    document.addEventListener('click',event=>{if(!menu.hidden&&!event.target.closest('#navMore'))setOpen(false);});
    window.addEventListener('resize',()=>{if(!menu.hidden&&window.innerWidth<420)setOpen(false);});

    const syncActive=()=>{
      hub.classList.toggle('contains-active',Boolean(menu.querySelector('.tab-button.active')));
      const languageLabel=document.querySelector('[data-i18n="navMore"]')?.textContent;
      const label=hub.querySelector('[data-more-label]');
      if(label&&languageLabel)label.textContent=languageLabel;
    };
    new MutationObserver(syncActive).observe(document.getElementById('tabNav'),{subtree:true,attributes:true,attributeFilter:['class','hidden']});
    new MutationObserver(syncActive).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
    syncActive();
  }

  init();
})();
