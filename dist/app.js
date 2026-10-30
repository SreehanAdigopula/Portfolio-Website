const root = document.documentElement;
root.classList.add('js');
const select = (q) => document.querySelector(q);
const selectAll = (q) => [...document.querySelectorAll(q)];
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
let motionPaused = reducedMotion.matches;

// Preference storage is optional; blocked storage must never break the site.
try { if (localStorage.getItem('sreehan-portfolio-theme')) root.dataset.theme = localStorage.getItem('sreehan-portfolio-theme'); } catch {}
const themeButton = select('#theme-toggle');
function syncTheme() { const dark = root.dataset.theme !== 'light'; themeButton.textContent = dark ? 'Light' : 'Dark'; themeButton.setAttribute('aria-label', `Switch to ${dark ? 'light' : 'dark'} theme`); select('meta[name="theme-color"]').content = dark ? '#100e0d' : '#f4f1ec'; }
syncTheme();
themeButton.addEventListener('click', () => { root.dataset.theme = root.dataset.theme === 'light' ? 'dark' : 'light'; syncTheme(); try { localStorage.setItem('sreehan-portfolio-theme', root.dataset.theme); } catch {} });
const motionButton = select('#motion-toggle');
function syncMotion() { root.classList.toggle('motion-paused', motionPaused); motionButton.textContent = motionPaused ? 'Resume motion' : 'Pause motion'; motionButton.setAttribute('aria-pressed', String(motionPaused)); motionButton.setAttribute('aria-label', `${motionPaused ? 'Resume' : 'Pause'} decorative motion`); }
syncMotion();
motionButton.addEventListener('click', () => { motionPaused = !motionPaused; syncMotion(); });
reducedMotion.addEventListener('change', e => { motionPaused = e.matches; syncMotion(); });

const menuButton = select('#menu-toggle');
const nav = select('#main-nav');
function closeMenu() { nav.classList.remove('open'); menuButton.setAttribute('aria-expanded', 'false'); menuButton.textContent = 'Menu'; }
menuButton.addEventListener('click', () => { const open = !nav.classList.contains('open'); nav.classList.toggle('open', open); menuButton.setAttribute('aria-expanded', String(open)); menuButton.textContent = open ? 'Close' : 'Menu'; });
nav.addEventListener('click', e => { if (e.target.closest('a')) closeMenu(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });

// Pointer motion only changes compositor properties. The image stays static for touch and reduced motion.
const hero = select('.hero');
const art = select('#hero-art');
let pointerFrame = 0;
hero.addEventListener('pointermove', e => {
  if (motionPaused || reducedMotion.matches || e.pointerType !== 'mouse') return;
  cancelAnimationFrame(pointerFrame);
  pointerFrame = requestAnimationFrame(() => { const r = hero.getBoundingClientRect(); const x = (e.clientX-r.left)/r.width; const y = (e.clientY-r.top)/r.height; art.style.setProperty('--rx', `${(0.5-y)*7}deg`); art.style.setProperty('--ry', `${(x-0.5)*9}deg`); art.style.setProperty('--lx', `${x*100}%`); art.style.setProperty('--ly', `${y*100}%`); });
});
hero.addEventListener('pointerleave', () => { cancelAnimationFrame(pointerFrame); art.style.setProperty('--rx', '0deg'); art.style.setProperty('--ry', '0deg'); });

const observer = new IntersectionObserver(entries => { for (const entry of entries) if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); } }, {threshold:0.07});
selectAll('.reveal').forEach(el => observer.observe(el));

const grid = select('.project-grid');
selectAll('.filter').forEach(button => button.addEventListener('click', () => {
  const filter = button.dataset.filter;
  selectAll('.filter').forEach(b => { const active = b === button; b.classList.toggle('active', active); b.setAttribute('aria-pressed', String(active)); });
  let count=0;
  selectAll('.project').forEach(project => { project.hidden = filter !== 'all' && !project.dataset.category.split(' ').includes(filter); if (!project.hidden) { count++; project.classList.add('visible'); } });
  grid.classList.toggle('filtered', filter !== 'all');
  grid.classList.remove('filtering');
  requestAnimationFrame(() => grid.classList.add('filtering'));
  select('.project-count').textContent = `${count} ${count === 1 ? 'project' : 'projects'}`;
}));

const skillTabs=selectAll('[data-skill]');
function activateSkill(tab) { skillTabs.forEach(t => { const selected = t === tab; t.setAttribute('aria-selected',String(selected)); t.tabIndex = selected ? 0 : -1; select(`#panel-${t.dataset.skill}`).hidden = !selected; }); }
skillTabs.forEach((tab,index) => { tab.addEventListener('click', () => activateSkill(tab)); tab.addEventListener('keydown', e => { let next; if(e.key==='ArrowRight') next=(index+1)%skillTabs.length; if(e.key==='ArrowLeft') next=(index+skillTabs.length-1)%skillTabs.length; if(e.key==='Home') next=0; if(e.key==='End') next=skillTabs.length-1; if(next !== undefined) { e.preventDefault(); activateSkill(skillTabs[next]); skillTabs[next].focus(); } }); });

const projects = {
  friction: {title:'Friction',category:'Adaptive focus / Web application',intro:'A study app built around the reality that focus changes from one session to the next.',image:'friction.png',alt:'Friction focus application, captured from the live site',tech:['JavaScript','HTML / CSS','Browser storage'],chapters:[['The problem','A fixed timer cannot account for every interruption, missed session, or change in energy. I wanted a study tool that responded to those patterns.'],['What I built','An adaptive timer, distraction and break tracking, a growing pet buddy, study media, and a Thought Parking Lot for thoughts that can wait.'],['How it works','Session outcomes inform later focus blocks. Progress is saved in the browser, with no login required.'],['What I am improving','The project is an MVP. I am collecting feedback and testing the interactions. Progress stays on the current device and does not sync between browsers.']],links:[['Try Friction','https://friction-brown.vercel.app/friction_html.html'],['View source','https://github.com/SreehanAdigopula/Fricton_all_versions']]},
  securestart: {title:'SecureStart',category:'Cybersecurity / Web application',intro:'A practical readiness check for clubs, nonprofits, and small organizations without dedicated security staff.',image:'securestart.png',alt:'SecureStart live readiness assessment interface',tech:['JavaScript','Local storage','Transparent scoring','Vercel'],chapters:[['The problem','Small groups rely on shared accounts, websites, and data, but security advice can be hard to translate into the next useful action.'],['What I built','A checklist across six readiness areas, an explained gap score, targeted recommendations, saved local history, and a downloadable report.'],['Design decision','Ask about practices in plain language. Keep the scoring method public. Store assessment answers in the browser.'],['Boundaries','This is an educational self-assessment. It does not scan systems, predict a breach, or certify an organization as secure.']],links:[['Try SecureStart','https://securestart-lemon.vercel.app'],['View source','https://github.com/SreehanAdigopula/SecureStart']]},
  tls: {title:'TLS Security Research',category:'Independent research / Cybersecurity & ML',intro:'An experiment in classifying observable website TLS configurations with logistic regression.',image:'tls-results.png',alt:'Grouped evaluation confusion matrix: 31 secure cases correct, 24 vulnerable cases correct, and one false secure prediction',tech:['Python','scikit-learn','OpenSSL','Grouped evaluation'],chapters:[['The question','Can measurable TLS configuration features help distinguish the Secure and Vulnerable labels in my research dataset?'],['Current implementation','The public repository uses 12 live-measurable features and a 296-row dataset combining public scan observations with synthetic combinations. It includes an OpenSSL probe and reproducible evaluation.'],['Testing the assumptions','The main grouped evaluation separates identical feature patterns across train and test sets. In the documented run it achieved 0.9821 accuracy on 56 test rows.'],['What the result means','This small, mixed dataset is not representative of the whole web. The result is an educational experiment, not evidence that a site is exploitable or safe.']],note:'Research recognition: 2nd place in Systems Software at the 2026 Mercer Science & Engineering Fair. Implementation details follow the current public repository.',links:[['Read the research','https://github.com/SreehanAdigopula/TLS-Security-Research'],['Methodology','https://github.com/SreehanAdigopula/TLS-Security-Research/blob/main/docs/methodology.md']]},
  pillpal: {title:'PillPal',category:'iOS application / Everyday routines',intro:'A medication-reminder and reference app designed to help people organize schedules and keep track of reminders.',image:'pillpal.png',alt:'Original PillPal app icon',tech:['iOS','Local-first records','Reminders'],chapters:[['The idea','Build a simple way to keep medication schedules and reminders in one place.'],['What I built','An iOS app with medication schedules, reminder delivery, and dose adherence history. Optional label lookup uses public OpenFDA information.'],['Data design','Medication records are stored on the device. The app has no account or sign-in. The public privacy page explains optional network features.'],['Purpose','PillPal is a reminder and reference tool. It is not a medical device and does not provide medical advice.']],links:[['App information','https://sreehanadigopula.github.io/PillPal-Legal/'],['Public repository','https://github.com/SreehanAdigopula/PillPal-Legal']]}
};
const dialog=select('#project-dialog');
let previousFocus;
const escapeHTML = value => value.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function openProject(id) {
  const project=projects[id]; if(!project) return;
  previousFocus=document.activeElement;
  select('#dialog-content').innerHTML=`<p class="dialog-meta">${escapeHTML(project.category)}</p><h2 class="dialog-title" id="dialog-title">${escapeHTML(project.title)}</h2><p class="dialog-intro">${escapeHTML(project.intro)}</p><div class="case-tech">${project.tech.map(t=>`<span>${escapeHTML(t)}</span>`).join('')}</div><img class="dialog-image ${id==='pillpal'?'pillpal':''}" src="assets/${project.image}" alt="${escapeHTML(project.alt)}"><div class="case-chapters">${project.chapters.map(([title,body])=>`<section><h3>${escapeHTML(title)}</h3><p>${escapeHTML(body)}</p></section>`).join('')}</div><div class="case-links">${project.links.map(([label,url],i)=>`<a class="button ${i?'button-outline':'button-primary'}" href="${url}" target="_blank" rel="noopener noreferrer">${escapeHTML(label)} <span aria-hidden="true">↗</span></a>`).join('')}</div>${project.note?`<p class="case-note">${escapeHTML(project.note)}</p>`:''}`;
  document.body.classList.add('modal-open');
  dialog.showModal(); dialog.scrollTop=0;
  select('#dialog-close').focus();
}
selectAll('[data-project]').forEach(button=>button.addEventListener('click',()=>openProject(button.dataset.project)));
select('#dialog-close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
dialog.addEventListener('close',()=>{document.body.classList.remove('modal-open');previousFocus?.focus();});

const copyButton=select('#copy-email');
copyButton.addEventListener('click',async()=>{try { await navigator.clipboard.writeText('asreehan4u@gmail.com'); select('#copy-status').textContent='Email copied.'; copyButton.textContent='Copied'; } catch { select('#copy-status').textContent='Select the email address to copy it, or use the email link.'; } });

// Progressive enhancement: reveal content even if observation is delayed in a background tab.
document.addEventListener('visibilitychange',()=>{if(!document.hidden)selectAll('.reveal').filter(el=>{const r=el.getBoundingClientRect();return r.top<innerHeight&&r.bottom>0;}).forEach(el=>el.classList.add('visible'));});
