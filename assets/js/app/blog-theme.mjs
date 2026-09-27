const root=document.documentElement;
try{const saved=localStorage.getItem('fincalc-app-theme');if(saved==='dark'||saved==='light')root.dataset.theme=saved}catch{}
document.getElementById('theme-btn')?.addEventListener('click',()=>{
  const next=root.dataset.theme==='dark'?'light':'dark';root.dataset.theme=next;
  try{localStorage.setItem('fincalc-app-theme',next)}catch{}
});
