// Pre-paint visual priority; timeout and skip never depend on WebGL.
(()=>{
  const key='sittelle-intro-2026-v3';
  let seen=false;
  try{seen=sessionStorage.getItem(key)==='seen';}catch{}
  const root=document.documentElement;
  // Local review override exercises the same reduced-motion path without OS changes.
  if(new URLSearchParams(location.search).get('motion')==='reduce')root.classList.add('motion-reduced');
  const finish=()=>{
    root.classList.remove('intro-active','intro-exiting','intro-assembled');
    try{sessionStorage.setItem(key,'seen');}catch{}
    document.querySelectorAll('[data-intro-inert]').forEach(node=>{node.inert=false;node.removeAttribute('data-intro-inert');});
  };
  const reduced=root.classList.contains('motion-reduced')||matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(reduced)finish();
  if(!seen&&!reduced){
    root.classList.add('intro-active');
    if(root.classList.contains('motion-reduced')||matchMedia('(prefers-reduced-motion: reduce)').matches)root.classList.add('intro-reduced');
    window.__sittelleIntroSafety=setTimeout(finish,7000);
  }
  document.addEventListener('click',event=>{
    if(!event.target.closest?.('[data-intro-skip]'))return;
    finish();
    dispatchEvent(new Event('sittelle:intro-skip'));
    document.querySelector('.scroll-prompt')?.focus({preventScroll:true});
  });
  window.addEventListener('sittelle:stage-unavailable',finish,{once:true});
})();
