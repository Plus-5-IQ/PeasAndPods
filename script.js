const firebaseConfig = {
  apiKey: "AIzaSyC_7Y5GH1AHVD5w4IVLIJMH7TerS1Y6Lmg",
  authDomain: "peasandpods-f91c7.firebaseapp.com",
  projectId: "peasandpods-f91c7",
  storageBucket: "peasandpods-f91c7.firebasestorage.app",
  messagingSenderId: "270367425514",
  appId: "1:270367425514:web:1c5fc5cfb524907bf3e893",
  measurementId: "G-XL1R9TNR76"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

document.getElementById('year').textContent = new Date().getFullYear();

/* ============== DATA ============== */
const ICONS = {
  ngo: '<path d="M12 21c-4-3-8-6.5-8-11a5 5 0 019-3 5 5 0 019 3c0 4.5-4 8-8 11z" stroke="currentColor" stroke-width="1.8" fill="none"/>',
  it: '<rect x="3" y="4" width="18" height="12" rx="2" stroke="currentColor" stroke-width="1.8" fill="none"/><path d="M8 20h8M12 16v4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
  hr: '<circle cx="9" cy="8" r="3" stroke="currentColor" stroke-width="1.8" fill="none"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round"/><circle cx="17" cy="9" r="2.4" stroke="currentColor" stroke-width="1.8" fill="none"/><path d="M15.5 14a4.7 4.7 0 015.5 4.6" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round"/>',
  training: '<path d="M4 6l8-3 8 3-8 3-8-3z" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linejoin="round"/><path d="M4 6v6c0 2 3.5 4 8 4s8-2 8-4V6" stroke="currentColor" stroke-width="1.8" fill="none"/>',
  web: '<circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.8" fill="none"/><path d="M3 12h18M12 3c2.5 2.5 3.8 5.7 3.8 9s-1.3 6.5-3.8 9c-2.5-2.5-3.8-5.7-3.8-9S9.5 5.5 12 3z" stroke="currentColor" stroke-width="1.8" fill="none"/>',
  app: '<rect x="7" y="2" width="10" height="20" rx="2.5" stroke="currentColor" stroke-width="1.8" fill="none"/><path d="M11 18h2" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
  cloud: '<path d="M7 18a4 4 0 01-1-7.9A5 5 0 0115.9 8 4.5 4.5 0 0117 17H7z" stroke="currentColor" stroke-width="1.8" fill="none"/>',
  ai: '<circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="1.8" fill="none"/><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2 2M16.4 16.4l2 2M5.6 18.4l2-2M16.4 7.6l2-2" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
  arrow: '<path d="M4 10h11M10 5l5 5-5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>'
};

const SERVICES = [
  {id:'ngo-dx', icon:'ngo', title:'NGO Digital Transformation', short:'End-to-end digitisation of programmes, donor management and reporting.',
    overview:'We help NGOs move from spreadsheets and paper trails to connected digital systems — without disrupting the field work that matters most.',
    deliverables:['Digital process audit & roadmap','Donor & beneficiary management systems','Impact reporting dashboards','Change management & staff onboarding'],
    idealFor:'NGOs and foundations scaling programmes across multiple locations.'},
  {id:'it', icon:'it', title:'IT Solutions', short:'Reliable IT infrastructure, support and systems for lean teams.',
    overview:'Practical, right-sized IT — from device setup to network security — so your team never loses a day to downtime.',
    deliverables:['IT infrastructure setup & audits','Helpdesk & remote support','Data backup & security policy','Software licensing guidance'],
    idealFor:'Organisations without a full-time in-house IT function.'},
  {id:'hr', icon:'hr', title:'HR Solutions', short:'Recruitment, policy and people operations built for mission-driven teams.',
    overview:'From hiring your next programme officer to writing your HR handbook, we build people systems that scale with you.',
    deliverables:['Recruitment & onboarding support','HR policy & compliance documentation','Performance management frameworks','Payroll & compliance advisory'],
    idealFor:'Growing teams that need HR rigour without a large HR department.'},
  {id:'training', icon:'training', title:'Corporate Training', short:'Upskilling programmes for staff, volunteers and leadership teams.',
    overview:'Practical, facilitator-led training in digital tools, communication and leadership — designed for adult, mission-driven learners.',
    deliverables:['Digital literacy workshops','Leadership & communication training','Custom curriculum design','Train-the-trainer programmes'],
    idealFor:'Organisations investing in staff and volunteer capability.'},
  {id:'website', icon:'web', title:'Website Development', short:'Fast, accessible websites that build trust with donors and partners.',
    overview:'We design and build websites that communicate credibility — optimised for donations, applications and search visibility.',
    deliverables:['UX-led website design','Responsive, accessible builds','CMS setup for easy self-editing','SEO & performance optimisation'],
    idealFor:'Organisations that need their website to work as hard as they do.'},
  {id:'app', icon:'app', title:'Mobile App Development', short:'Field-ready apps for data collection, outreach and service delivery.',
    overview:'Native and cross-platform apps built for real field conditions — low connectivity, shared devices, and non-technical users.',
    deliverables:['Offline-first field data apps','Beneficiary & volunteer apps','iOS & Android builds','App maintenance & support'],
    idealFor:'Programmes that collect data or deliver services in the field.'},
  {id:'cloud', icon:'cloud', title:'Cloud Solutions', short:'Secure, cost-efficient cloud infrastructure and migration.',
    overview:'We migrate and manage cloud environments sized for NGO budgets — with enterprise-grade security practices.',
    deliverables:['Cloud migration planning','Cost-optimised hosting setup','Backup & disaster recovery','Ongoing infrastructure management'],
    idealFor:'Teams outgrowing on-premise servers or shared hosting.'},
  {id:'ai', icon:'ai', title:'AI Solutions', short:'Practical AI for reporting, outreach and operational efficiency.',
    overview:'We apply AI where it genuinely saves time — report drafting, data summarisation, chatbots and workflow automation.',
    deliverables:['AI-powered chatbots & assistants','Report & content drafting tools','Data analysis & insight automation','AI readiness assessment'],
    idealFor:'Organisations ready to pilot AI in day-to-day operations.'}
];

const PORTFOLIO_DELIVERED = [
  {name:'AstroPalmist Amit', category:'Portfolio Website Development', url:'https://www.astropalmistamit.com/', img:'portfolio_astropalmist.jpg', tag:'website'},
  {name:'Rajataru Green Services', category:'Business Website Development & Social Media Profiling', url:'https://www.rajataru.com/', img:'portfolio_rajataru.jpg', tag:'business'},
  {name:'Kailas Narawade', category:'Portfolio Website Development', url:'https://www.kailasnarawade.in/', img:'portfolio_kailas.jpg', tag:'website'},
  {name:'Khushi Service Point', category:'Business Website Development', url:'https://lightslategray-dinosaur-994525.builder-preview.com', img:'portfolio_khushi.png', tag:'business'},
  {name:'Hiravi Bhaji', category:'Business Website Development & Social Media Profiling', url:'https://www.hiravibhaji.com/', img:'portfolio_hiravi.jpg', tag:'social'},
  {name:'Dr. Suraj Singh', category:'Portfolio Website Development', url:'https://www.drsurajsingh.in/', img:'portfolio_drsuraj.jpg', tag:'website'},
  {name:'Being Volunteer Foundation', category:'NGO Website Development', url:'https://www.beingvolunteer.org/', img:'portfolio_beingvolunteer.jpg', tag:'ngo'},
  {name:'HBRL Exports', category:'Catalogue Design', url:'https://www.hbrlexports.com/', img:'portfolio_hbrl.png', tag:'catalogue'}
];

const PORTFOLIO_ONGOING = [
  {name:'Maa Sarada Foundation', category:'Website Development & Social Media Profiling', url:'https://mediumturquoise-vulture-333542.builder-preview.com', img:'portfolio_maasarada.png', tag:'social'},
  {name:'Khushi Service Point', category:'Business Website Development', url:'https://lightslategray-dinosaur-994525.builder-preview.com/', img:'portfolio_khushi.png', tag:'business'},
  {name:'NK Verma & Associates', category:'Business Website Development & Google Business Profile', url:'https://lightsteelblue-gnat-804874.builder-preview.com', img:'portfolio_nkverma.png', tag:'business'},
  {name:'Jagrani Industries', category:'Business Website Development & Google Business Profile', url:'https://www.jagraniindustries.com', img:'portfolio_jagrani.png', tag:'business'},
  {name:'Foodies Hub', category:'Business Website Development & Google Business Profile', url:'https://pink-curlew-110202.builder-preview.com', img:'portfolio_foodies.png', tag:'business'},
  {name:'Jewellery Store', category:'Business Website Development & Google Business Profile', url:'https://steelblue-emu-755412.builder-preview.com', img:'portfolio_jewellery.png', tag:'business'}
];

let currentPortfolioSection = 'delivered';
let currentPortfolioFilter = 'all';

function getTagLabel(tag){
  const map = {website:'Website',business:'Business',catalogue:'Catalogue',ngo:'NGO',social:'Social Media'};
  return map[tag] || tag;
}

function getTagClass(tag){
  const map = {website:'tag-website',business:'tag-business',catalogue:'tag-catalogue',ngo:'tag-ngo',social:'tag-social'};
  return map[tag] || '';
}

function renderPortfolioCard(p, i){
  const imgHtml = p.img
    ? `<img src="${p.img}" alt="${p.name} project screenshot" loading="lazy">`
    : `<svg viewBox="0 0 480 300" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="pg${i}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${p.colors[0]}"/><stop offset="1" stop-color="${p.colors[1]}"/></linearGradient></defs><rect width="480" height="300" fill="url(#pg${i})"/><rect x="40" y="30" width="180" height="14" rx="7" fill="rgba(255,255,255,.35)"/><rect x="40" y="55" width="120" height="10" rx="5" fill="rgba(255,255,255,.2)"/><rect x="40" y="80" width="400" height="140" rx="12" fill="rgba(255,255,255,.12)"/><circle cx="240" cy="150" r="30" fill="rgba(255,255,255,.15)"/><text x="240" y="157" text-anchor="middle" fill="rgba(255,255,255,.6)" font-size="18" font-family="Inter,sans-serif">${p.name.charAt(0)}</text><rect x="40" y="240" width="200" height="10" rx="5" fill="rgba(255,255,255,.2)"/><rect x="40" y="260" width="140" height="10" rx="5" fill="rgba(255,255,255,.15)"/></svg>`;

  return `<article class="portfolio-card animate-in" data-tag="${p.tag}" onclick="window.open('${p.url}','_blank')">
    <div class="portfolio-card-img">
      ${imgHtml}
      <div class="portfolio-card-overlay"><span>View project ↗</span></div>
    </div>
    <div class="portfolio-card-body">
      <h4>${p.name}</h4>
      <div class="pf-category">${p.category}</div>
      <span class="pf-tag ${getTagClass(p.tag)}">${getTagLabel(p.tag)}</span>
    </div>
  </article>`;
}

function getFilters(projects){
  const tags = [...new Set(projects.map(p=>p.tag))];
  return [{value:'all', label:'All'}, ...tags.map(t=>({value:t, label:getTagLabel(t)}))];
}

function renderPortfolio(){
  const projects = currentPortfolioSection === 'delivered' ? PORTFOLIO_DELIVERED : PORTFOLIO_ONGOING;
  const filters = getFilters(projects);

  // Render filter pills
  document.getElementById('portfolioFilters').innerHTML = filters.map(f =>
    `<button class="pf-pill ${f.value===currentPortfolioFilter?'active':''}" data-filter="${f.value}">${f.label}</button>`
  ).join('');

  // Filter projects
  const filtered = currentPortfolioFilter === 'all' ? projects : projects.filter(p=>p.tag===currentPortfolioFilter);

  // Render cards
  document.getElementById('portfolioGrid').innerHTML = filtered.map((p,i) => renderPortfolioCard(p,i)).join('');

  // Re-attach filter listeners
  document.querySelectorAll('.pf-pill').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      currentPortfolioFilter = btn.dataset.filter;
      renderPortfolio();
    });
  });
}

// Tab switching
document.getElementById('portfolioTabs').addEventListener('click', e=>{
  const tab = e.target.closest('.portfolio-tab'); if(!tab) return;
  document.querySelectorAll('.portfolio-tab').forEach(t=>t.classList.remove('active'));
  tab.classList.add('active');
  currentPortfolioSection = tab.dataset.section;
  currentPortfolioFilter = 'all';
  renderPortfolio();
});

// Initial render
renderPortfolio();

const PROCESS = [

  {t:'Discovery', d:'Understand your mission, constraints and goals.'},
  {t:'Planning', d:'Map scope, timeline and success metrics.'},
  {t:'Design', d:'Prototype flows and interfaces with your team.'},
  {t:'Development', d:'Build in transparent, reviewable sprints.'},
  {t:'Testing', d:'Validate against real-world field conditions.'},
  {t:'Deployment', d:'Launch with training and rollout support.'},
  {t:'Support', d:'Ongoing care, monitoring and iteration.'}
];

const TESTIMONIALS = [
  {q:'They understood our field realities from day one — this never felt like a typical vendor relationship.', n:'Programme Director', r:'Community Health NGO, Pune'},
  {q:'Our reporting cycle went from weeks to days. The dashboard alone changed how we talk to donors.', n:'Executive Director', r:'Education Foundation, Maharashtra'},
  {q:'Practical, patient, and genuinely invested in getting our team comfortable with new tools.', n:'HR Lead', r:'Livelihood Mission'},
  {q:'The training sessions were the first ones our field staff actually asked to repeat.', n:'Capacity Building Manager', r:'Skilling Non-profit'}
];

const TEAM = [
  {name:'Vivek M', role:'Business Development Director', sub:'Founding Member', img:'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=375,h=390,fit=crop/kCfoYGLehUQ6FEkv/vivek-mjEQkaQ2wJs2XnlB.jpeg'},
  {name:'Nisha S', role:'Legal & Compliances Head', sub:'Founding Member', img:'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=375,h=390,fit=crop/kCfoYGLehUQ6FEkv/whatsapp-image-2023-11-08-at-12.59.33-pm-dOq76KQZJLfnOLXz.jpeg'},
  {name:'Pragya G', role:'Creative Design Head', sub:'Business Analyst', img:'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=768,h=746,fit=crop/kCfoYGLehUQ6FEkv/pragya2-YBg85rej1DhvDeRR.jpeg'},
  {name:'Pratibha M', role:'Customer Success Manager', sub:'Creative Designer | Content Writer', img:'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=375,h=390,fit=crop/kCfoYGLehUQ6FEkv/pratibha2-YrD6ovr37MtVwWyq.jpg'}
];

const JOBS = [
  {title:'Frontend Developer', type:'Full-time', loc:'Pune / Hybrid', tag:'Tech'},
  {title:'NGO Programme Consultant', type:'Full-time', loc:'Pune', tag:'Consulting'},
  {title:'HR Associate', type:'Full-time', loc:'Pune', tag:'People'},
  {title:'Content & Design Intern', type:'Internship', loc:'Remote', tag:'Design'}
];

const BLOG = [
  {tag:'Digital Transformation', title:'Five signs your NGO is ready for a digital overhaul', excerpt:'Paper trails and spreadsheets work — until they don\'t. Here\'s how to know when it\'s time.', date:'Jun 2026', read:'6 min'},
  {tag:'HR', title:'Building HR policy for a 10-person mission-driven team', excerpt:'You don\'t need a corporate HR department to have fair, documented people practices.', date:'May 2026', read:'5 min'},
  {tag:'Cloud', title:'Cloud costs, explained for non-profit budgets', excerpt:'A practical breakdown of what cloud hosting actually costs an NGO — and how to keep it lean.', date:'Apr 2026', read:'7 min'}
];

const FAQS = [
  {q:'Do you only work with NGOs?', a:'No — while NGOs and the social sector are our founding focus, we also work with enterprises and corporate CSR teams who want a partner that understands mission-driven work.'},
  {q:'How is pricing structured?', a:'We scope every engagement individually based on your goals and budget. Many NGO engagements are priced on a not-for-profit-friendly basis — talk to us about your constraints.'},
  {q:'How long does a typical project take?', a:'A focused engagement like a website build typically runs 4–8 weeks; larger digital transformation programmes are phased over 3–6 months.'},
  {q:'Can you support us after launch?', a:'Yes — every engagement includes a defined support period, and ongoing retainers are available for ongoing care and iteration.'},
  {q:'Where are you based?', a:'We\'re based in Balewadi, Pune, and work with organisations across India, remotely and on-site.'}
];

/* ============== RENDER ============== */
function svgIcon(key){ return `<svg viewBox="0 0 24 24" fill="none">${ICONS[key]}</svg>`; }

document.getElementById('servicesGrid').innerHTML = SERVICES.map(s => `
  <article class="service-card reveal" data-id="${s.id}" tabindex="0" role="button" aria-haspopup="dialog">
    <div class="service-icon">${svgIcon(s.icon)}</div>
    <h3>${s.title}</h3>
    <p>${s.short}</p>
    <span class="service-more">View details ${svgIcon('arrow')}</span>
  </article>`).join('');

function openServiceModal(id){
  const s = SERVICES.find(x=>x.id===id); if(!s) return;
  document.getElementById('serviceModalContent').innerHTML = `
    <button class="modal-close" onclick="closeModal('serviceModal')"><svg viewBox="0 0 24 24" fill="none"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg></button>
    <div class="service-icon">${svgIcon(s.icon)}</div>
    <h3>${s.title}</h3>
    <span class="eyebrow modal-tag">Service overview</span>
    <div class="m-section"><p>${s.overview}</p></div>
    <div class="m-section"><b>What's included</b><ul>${s.deliverables.map(d=>`<li>${d}</li>`).join('')}</ul></div>
    <div class="m-section"><b>Ideal for</b><p>${s.idealFor}</p></div>
    <div class="m-cta">
      <a href="#contact" class="btn btn-primary btn-sm" onclick="closeModal('serviceModal')">Book Consultation</a>
      <button class="btn btn-ghost btn-sm" onclick="closeModal('serviceModal')">Close</button>
    </div>`;
  openModal('serviceModal');
}
document.getElementById('servicesGrid').addEventListener('click', e=>{
  const card = e.target.closest('.service-card'); if(card) openServiceModal(card.dataset.id);
});
document.getElementById('servicesGrid').addEventListener('keydown', e=>{
  if((e.key==='Enter'||e.key===' ') && e.target.closest('.service-card')){ e.preventDefault(); openServiceModal(e.target.closest('.service-card').dataset.id); }
});



/* process */
document.getElementById('processTrack').innerHTML = PROCESS.map((p,i)=>`
  <div class="p-step" data-i="${i}"><div class="p-num">${String(i+1).padStart(2,'0')}</div><h4>${p.t}</h4><p>${p.d}</p></div>`).join('');

/* testimonials */
document.getElementById('testiWrap').innerHTML = `
  <div id="tSlides">${TESTIMONIALS.map((t,i)=>`
    <div class="t-slide ${i===0?'active':''}">
      <p class="t-quote">“${t.q}”</p>
      <div class="t-person"><div class="t-avatar">${t.n.charAt(0)}</div><div><b>${t.n}</b><span>${t.r}</span></div></div>
    </div>`).join('')}</div>
  <div class="t-dots">${TESTIMONIALS.map((_,i)=>`<button class="t-dot ${i===0?'active':''}" data-i="${i}" aria-label="Show testimonial ${i+1}"></button>`).join('')}</div>
  <p class="t-disclaimer">Representative feedback reflecting the tone of client conversations across our engagements.</p>`;
let tIndex = 0;
function showTesti(i){
  document.querySelectorAll('.t-slide').forEach((s,idx)=>s.classList.toggle('active', idx===i));
  document.querySelectorAll('.t-dot').forEach((d,idx)=>d.classList.toggle('active', idx===i));
  tIndex = i;
}
document.querySelectorAll('.t-dot').forEach(d=>d.addEventListener('click', ()=>showTesti(+d.dataset.i)));
setInterval(()=>showTesti((tIndex+1)%TESTIMONIALS.length), 5500);

/* team */
document.getElementById('teamGrid').innerHTML = TEAM.map(t=>`
  <div class="team-card reveal">
    <div class="team-photo"><img src="${t.img}" alt="Photo of ${t.name}, ${t.role} at Peas & Pods" loading="lazy"></div>
    <div class="team-info"><h4>${t.name}</h4><div class="role">${t.role}</div><div class="sub">${t.sub}</div></div>
  </div>`).join('');

/* careers */
document.getElementById('jobList').innerHTML = JOBS.map(j=>`
  <div class="job-card">
    <div><h4>${j.title}</h4><div class="job-meta"><span>${j.type}</span><span>${j.loc}</span><span>${j.tag}</span></div></div>
    <a class="btn btn-primary btn-sm" href="mailto:namaste@peasandpods.in?subject=Application%20-%20${encodeURIComponent(j.title)}">Apply</a>
  </div>`).join('');

/* blog */
document.getElementById('blogGrid').innerHTML = BLOG.map((b,i)=>{
  const grads = ['linear-gradient(135deg,#1F8A5F,#2C5AA0)','linear-gradient(135deg,#2C5AA0,#1F8A5F)','linear-gradient(135deg,#0F5C3D,#2C5AA0)'];
  return `<article class="blog-card reveal">
    <div class="blog-cover" style="background:${grads[i%3]}"><svg width="46" height="46" viewBox="0 0 40 40"><ellipse cx="15" cy="15" rx="10" ry="12" fill="rgba(255,255,255,0.9)"/><ellipse cx="26" cy="25" rx="10" ry="12" fill="rgba(255,255,255,0.55)"/></svg></div>
    <div class="blog-body">
      <span class="tag">${b.tag}</span>
      <h4>${b.title}</h4>
      <p>${b.excerpt}</p>
      <div class="meta"><span>${b.date}</span><span>${b.read} read</span></div>
    </div>
  </article>`;
}).join('');

/* faq */
document.getElementById('faqList').innerHTML = FAQS.map((f,i)=>`
  <div class="faq-item" data-i="${i}">
    <button class="faq-q">${f.q}<svg viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg></button>
    <div class="faq-a"><p>${f.a}</p></div>
  </div>`).join('');
document.getElementById('faqList').addEventListener('click', e=>{
  const q = e.target.closest('.faq-q'); if(!q) return;
  const item = q.parentElement; const a = item.querySelector('.faq-a');
  const isOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item').forEach(i=>{ i.classList.remove('open'); i.querySelector('.faq-a').style.maxHeight = null; });
  if(!isOpen){ item.classList.add('open'); a.style.maxHeight = a.scrollHeight+'px'; }
});

/* ============== SEARCH ============== */
const SEARCH_INDEX = [
  ...SERVICES.map(s=>({title:s.title, sub:'Service', anchor:'#services', action:()=>openServiceModal(s.id)})),
  ...BLOG.map(b=>({title:b.title, sub:'Blog · '+b.tag, anchor:'#blog'})),
  ...TEAM.map(t=>({title:t.name, sub:t.role, anchor:'#team'})),
  {title:'Careers & internships', sub:'Page section', anchor:'#careers'},
  {title:'Portfolio', sub:'Page section', anchor:'#cases'},
  {title:'Contact & office address', sub:'Page section', anchor:'#contact'}
];
const searchOverlay = document.getElementById('searchOverlay');
const searchInput = document.getElementById('searchInput');
document.getElementById('searchOpen').addEventListener('click', ()=>{ searchOverlay.classList.add('open'); setTimeout(()=>searchInput.focus(),100); renderSearch(''); });
searchOverlay.addEventListener('click', e=>{ if(e.target===searchOverlay) searchOverlay.classList.remove('open'); });
document.addEventListener('keydown', e=>{ if(e.key==='Escape') searchOverlay.classList.remove('open'); });
function renderSearch(q){
  const results = document.getElementById('searchResults');
  const matches = q ? SEARCH_INDEX.filter(i=>i.title.toLowerCase().includes(q.toLowerCase())||i.sub.toLowerCase().includes(q.toLowerCase())) : SEARCH_INDEX.slice(0,6);
  results.innerHTML = matches.length ? matches.map(m=>`<a href="${m.anchor}" data-title="${m.title}"><b>${m.title}</b><span>${m.sub}</span></a>`).join('') : `<div class="search-empty">No results — try “services” or “careers”.</div>`;
}
searchInput.addEventListener('input', e=>renderSearch(e.target.value));
document.getElementById('searchResults').addEventListener('click', e=>{
  const a = e.target.closest('a'); if(!a) return;
  searchOverlay.classList.remove('open');
  const svc = SERVICES.find(s=>s.title===a.dataset.title);
  if(svc){ e.preventDefault(); setTimeout(()=>openServiceModal(svc.id), 350); }
});

/* ============== MODALS ============== */
function openModal(id){ document.getElementById(id).classList.add('open'); document.body.style.overflow='hidden'; }
function closeModal(id){ document.getElementById(id).classList.remove('open'); document.body.style.overflow=''; }
window.closeModal = closeModal;
document.querySelectorAll('.modal-overlay').forEach(ov=>{
  ov.addEventListener('click', e=>{ if(e.target===ov){ ov.classList.remove('open'); document.body.style.overflow=''; } });
});
document.getElementById('openBooking').addEventListener('click', ()=>openModal('bookingModal'));
document.getElementById('bookingForm').addEventListener('submit', e=>{
  e.preventDefault(); closeModal('bookingModal'); showToast('Consultation request received — we\'ll confirm by email shortly.');
});
document.getElementById('contactForm').addEventListener('submit', e=>{
  e.preventDefault(); showToast('Message sent — thank you! We typically reply within one business day.'); e.target.reset();
});
document.getElementById('newsletterBtn').addEventListener('click', ()=>{
  const el = document.getElementById('newsletterEmail');
  if(el.value && el.value.includes('@')){ showToast('Subscribed — welcome to the Peas & Pods newsletter.'); el.value=''; }
  else showToast('Enter a valid email to subscribe.');
});

/* ============== LOGIN ============== */
let currentUser = null;
function openLogin(){ openModal('loginModal'); }
window.openLogin = openLogin;
document.getElementById('loginOpen')?.addEventListener('click', openLogin);
document.querySelectorAll('.auth-tab').forEach(tab=>{
  tab.addEventListener('click', ()=>{
    document.querySelectorAll('.auth-tab').forEach(t=>t.classList.remove('active'));
    document.querySelectorAll('.auth-panel').forEach(p=>p.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById('panel-'+tab.dataset.tab).classList.add('active');
  });
});
document.getElementById('signinForm').addEventListener('submit', async e=>{
  e.preventDefault();
  const email = document.getElementById('si-email').value.trim();
  const pass = document.getElementById('si-pass').value;
  const msg = document.getElementById('signinMsg');
  msg.textContent = 'Signing in...'; msg.className='auth-msg show';
  try {
    const userCredential = await auth.signInWithEmailAndPassword(email, pass);
    msg.textContent = 'Signed in successfully.'; msg.className='auth-msg show success';
    setTimeout(()=>{ closeModal('loginModal'); window.location.href = 'dashboard.html'; }, 500);
  } catch (error) {
    msg.textContent = error.message; msg.className='auth-msg show error';
  }
});
document.getElementById('signupForm').addEventListener('submit', async e=>{
  e.preventDefault();
  const name = document.getElementById('su-name').value.trim();
  const email = document.getElementById('su-email').value.trim();
  const pass = document.getElementById('su-pass').value;
  const msg = document.getElementById('signupMsg');
  msg.textContent = 'Creating account...'; msg.className='auth-msg show';
  try {
    const userCredential = await auth.createUserWithEmailAndPassword(email, pass);
    await userCredential.user.updateProfile({ displayName: name });
    msg.textContent = 'Account created — signing you in…'; msg.className='auth-msg show success';
    setTimeout(()=>{ closeModal('loginModal'); window.location.href = 'dashboard.html'; }, 600);
  } catch (error) {
    msg.textContent = error.message; msg.className='auth-msg show error';
  }
});
function renderAuthState(){
  const area = document.getElementById('navAuthArea');
  if(!area) return;
  if(currentUser){
    const displayName = currentUser.displayName || currentUser.email.split('@')[0];
    area.innerHTML = `<button class="user-chip" onclick="window.location.href='dashboard.html'"><span class="avatar-sm">${displayName.charAt(0).toUpperCase()}</span>${displayName}</button> <button class="user-chip" id="logoutBtn" style="margin-left: 8px;">Sign out</button>`;
    document.getElementById('logoutBtn').addEventListener('click', async ()=>{ await auth.signOut(); showToast('Signed out.'); });
  } else {
    area.innerHTML = `<button class="icon-btn" id="loginOpen" aria-label="Login"><svg viewBox="0 0 24 24" fill="none"><path d="M12 4h5a2 2 0 012 2v12a2 2 0 01-2 2h-5M15 12H3m0 0l4-4m-4 4l4 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></button>`;
    document.getElementById('loginOpen').addEventListener('click', openLogin);
  }
}

auth.onAuthStateChanged((user) => {
  currentUser = user;
  renderAuthState();
});

/* ============== PODBOT ============== */
const botWindow = document.getElementById('podbotWindow');
const botBody = document.getElementById('pbBody');
document.getElementById('botToggle').addEventListener('click', ()=>botWindow.classList.toggle('open'));
document.getElementById('pbClose').addEventListener('click', ()=>botWindow.classList.remove('open'));
function addMsg(text, who){
  const d = document.createElement('div'); d.className='pb-msg '+who; d.textContent = text;
  botBody.appendChild(d); botBody.scrollTop = botBody.scrollHeight;
}
async function fetchGeminiResponse(prompt) {
  // The Gemini call now happens server-side in /api/chat.js so the API key
  // never has to live in the browser. See api/chat.js.
  try {
    const res = await fetch('/api/chat', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt })
    });
    const data = await res.json();
    if (res.ok && data.reply) {
      return data.reply;
    }
    return "I'm having trouble thinking right now. Please try again later.";
  } catch (err) {
    return "Network error. Please try again later.";
  }
}

async function sendBotMsg(){
  const input = document.getElementById('pbInput');
  const text = input.value.trim(); if(!text) return;
  addMsg(text, 'user'); input.value='';
  
  const loadingId = "load-" + Date.now();
  const loadingDiv = document.createElement('div');
  loadingDiv.className = 'pb-msg bot';
  loadingDiv.id = loadingId;
  loadingDiv.textContent = 'Thinking...';
  botBody.appendChild(loadingDiv);
  botBody.scrollTop = botBody.scrollHeight;
  
  const reply = await fetchGeminiResponse(text);
  document.getElementById(loadingId).remove();
  addMsg(reply, 'bot');
}
document.getElementById('pbSend').addEventListener('click', sendBotMsg);
document.getElementById('pbInput').addEventListener('keydown', e=>{ if(e.key==='Enter') sendBotMsg(); });
document.querySelectorAll('.pb-quick button').forEach(b=>b.addEventListener('click', async ()=>{
  const map = {services:'What services do you offer?', ngo:'Tell me about NGO pricing', contact:'I want to talk to a human'};
  const text = map[b.dataset.q];
  addMsg(text, 'user');
  
  const loadingId = "load-" + Date.now();
  const loadingDiv = document.createElement('div');
  loadingDiv.className = 'pb-msg bot';
  loadingDiv.id = loadingId;
  loadingDiv.textContent = 'Thinking...';
  botBody.appendChild(loadingDiv);
  botBody.scrollTop = botBody.scrollHeight;
  
  const reply = await fetchGeminiResponse(text);
  document.getElementById(loadingId).remove();
  addMsg(reply, 'bot');
}));

/* ============== TOAST ============== */
let toastTimer;
function showToast(msg){
  const t = document.getElementById('toast'); document.getElementById('toastMsg').textContent = msg;
  t.classList.add('show'); clearTimeout(toastTimer); toastTimer = setTimeout(()=>t.classList.remove('show'), 3600);
}

/* ============== THEME TOGGLE ============== */
document.getElementById('themeToggle').addEventListener('click', ()=>{
  document.documentElement.classList.toggle('dark');
});

/* ============== MOBILE NAV ============== */
const mobilePanel = document.getElementById('mobilePanel');
document.getElementById('mobileOpen').addEventListener('click', ()=>mobilePanel.classList.add('open'));
document.getElementById('mobileClose').addEventListener('click', ()=>mobilePanel.classList.remove('open'));
mobilePanel.querySelectorAll('a').forEach(a=>a.addEventListener('click', ()=>mobilePanel.classList.remove('open')));

/* ============== SCROLL: progress, reveal, counters, back-to-top, process ============== */
const progress = document.getElementById('scroll-progress');
const toTopBtn = document.getElementById('toTop');
window.addEventListener('scroll', ()=>{
  const h = document.documentElement;
  const pct = (h.scrollTop)/(h.scrollHeight-h.clientHeight)*100;
  progress.style.width = pct+'%';
  toTopBtn.classList.toggle('show', h.scrollTop>500);
});
toTopBtn.addEventListener('click', ()=>window.scrollTo({top:0, behavior:'smooth'}));

const revealObserver = new IntersectionObserver(entries=>{
  entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); revealObserver.unobserve(e.target); } });
},{threshold:0.15});
function initReveal(){ document.querySelectorAll('.reveal:not(.in)').forEach(el=>revealObserver.observe(el)); }
initReveal();

let countersDone = false;
function runCounters(){
  if(countersDone) return; countersDone = true;
  document.querySelectorAll('.count').forEach(el=>{
    const target = +el.dataset.target; const dur = 1600; const start = performance.now();
    function tick(now){
      const p = Math.min(1, (now-start)/dur);
      el.textContent = Math.floor(p*target);
      if(p<1) requestAnimationFrame(tick); else el.textContent = target;
    }
    requestAnimationFrame(tick);
  });
}
new IntersectionObserver((entries, obs)=>{
  entries.forEach(e=>{ if(e.isIntersecting){ runCounters(); obs.disconnect(); } });
},{threshold:0.3}).observe(document.querySelector('.counters'));

const processObserver = new IntersectionObserver(entries=>{
  entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('in'); });
},{threshold:0.5});
document.querySelectorAll('.p-step').forEach(el=>processObserver.observe(el));

/* smooth-scroll offset for fixed nav + close overlays */
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', function(e){
    const id = this.getAttribute('href');
    if(id.length>1 && document.querySelector(id)){
      e.preventDefault();
      window.scrollTo({top: document.querySelector(id).offsetTop-90, behavior:'smooth'});
    }
  });
});

/* init auth state render (adds initial listener already bound above) */
renderAuthState();















