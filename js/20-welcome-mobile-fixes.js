(function(){
  'use strict';

  const DATA_REVISION=3;
  const LEGACY_IDS=new Set(['case-a','case-b','case-c']);
  const LEGACY_LABEL=/^Case\s+[A-C](?:\s|·|$)/i;

  function repairWelcomeTitle(){
    const title=document.getElementById('loginTitle');
    if(!title||title.dataset.productNameRepaired==='true')return;
    title.dataset.productNameRepaired='true';
    title.innerHTML='<span class="login-product-name">HandVivante<span class="login-trademark" aria-hidden="true">™</span></span> <span class="login-product-highlight">MirrorCoach</span>';
  }

  function containsLegacySyntheticCase(candidate){
    if(!candidate||!Array.isArray(candidate.patients))return false;
    return candidate.patients.some(patient=>{
      const id=String(patient?.id||'').trim().toLowerCase();
      const label=String(patient?.label||'').trim();
      return LEGACY_IDS.has(id)||LEGACY_LABEL.test(label);
    });
  }

  function migrateLegacyMobileCohort(){
    if(typeof state==='undefined'||typeof sampleData!=='function'||!containsLegacySyntheticCase(state))return false;
    const fresh=sampleData();
    fresh.version=DATA_REVISION;
    state=fresh;
    if(typeof saveState==='function')saveState();
    if(typeof resetSessionDraft==='function')resetSessionDraft();
    if(typeof renderAll==='function')renderAll();
    return true;
  }

  repairWelcomeTitle();
  const migrated=migrateLegacyMobileCohort();
  if(migrated&&typeof showStatus==='function'){
    showStatus('The obsolete A–C demo cohort was replaced with the current 27 numbered synthetic cases.');
  }

  window.MirrorCoachCompatibility={
    dataRevision:DATA_REVISION,
    legacyCohortMigrated:migrated
  };
})();
