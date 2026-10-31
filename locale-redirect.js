// Root URL only: send visitors to their language. A language picked on the site
// (saved by the FR/EN/AR links) wins; otherwise the first supported entry in the
// browser's ordered language list; otherwise English. Query and hash are kept.
(()=>{
  const base=document.documentElement.dataset.base||'/';
  const supported=['fr','en','ar'];
  let lang;
  try{lang=localStorage.getItem('sittelle-locale');}catch{}
  if(!supported.includes(lang)){
    const list=navigator.languages&&navigator.languages.length?navigator.languages:[navigator.language||''];
    lang=list.map(tag=>String(tag).toLowerCase().split('-')[0]).find(code=>supported.includes(code))||'en';
  }
  location.replace(base+lang+'/'+location.search+location.hash);
})();
