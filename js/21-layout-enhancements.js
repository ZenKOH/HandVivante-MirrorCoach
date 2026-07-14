(function(){
  'use strict';

  function enhanceTable(table){
    if(!table)return;
    const headers=[...table.querySelectorAll('thead th')].map(cell=>cell.textContent.trim());
    if(!headers.length)return;
    table.classList.add('responsive-data-table');
    table.querySelectorAll('tbody tr').forEach(row=>{
      [...row.children].forEach((cell,index)=>{
        cell.dataset.label=headers[index]||cell.dataset.label||'Value';
      });
    });
    table.dataset.responsiveEnhanced='true';
  }

  function enhanceTables(root=document){
    root.querySelectorAll('table').forEach(enhanceTable);
  }

  function syncNavigationState(scrollActive=false){
    document.querySelectorAll('#tabNav .tab-button[data-tab]').forEach(button=>{
      const active=button.classList.contains('active');
      if(active)button.setAttribute('aria-current','page');
      else button.removeAttribute('aria-current');
      if(scrollActive&&active&&window.innerWidth<=820){
        button.scrollIntoView({behavior:'smooth',block:'nearest',inline:'center'});
      }
    });
  }

  function syncLayerState(){
    document.querySelectorAll('[data-dashboard-layer-target]').forEach(button=>{
      const active=button.classList.contains('active');
      if(active)button.setAttribute('aria-current','page');
      else button.removeAttribute('aria-current');
    });
  }

  let scheduled=false;
  function scheduleEnhancement(){
    if(scheduled)return;
    scheduled=true;
    requestAnimationFrame(()=>{
      scheduled=false;
      enhanceTables();
      syncNavigationState(false);
      syncLayerState();
    });
  }

  const observer=new MutationObserver(scheduleEnhancement);
  observer.observe(document.body,{childList:true,subtree:true,attributes:true,attributeFilter:['class','hidden']});

  document.addEventListener('click',event=>{
    if(event.target.closest('#tabNav .tab-button,[data-dashboard-layer-target]')){
      setTimeout(()=>{
        scheduleEnhancement();
        syncNavigationState(true);
      },0);
    }
  });
  window.addEventListener('resize',scheduleEnhancement,{passive:true});

  document.body.classList.add('streamlined-layout-ready');
  scheduleEnhancement();
  window.MirrorCoachLayout={enhanceTables,syncNavigationState};
})();
