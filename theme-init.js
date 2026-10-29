// An explicit preview URL can show either theme without changing saved preferences.
(()=>{
  const preview=new URLSearchParams(location.search).get('theme');
  let saved;
  try{saved=localStorage.getItem('sittelle-theme');}catch{}
  const theme=['light','dark','auto'].includes(preview)?preview:saved;
  if(theme==='light'||theme==='dark')document.documentElement.dataset.theme=theme;
  else delete document.documentElement.dataset.theme;
})();
