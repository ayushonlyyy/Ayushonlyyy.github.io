/* =====================================================
   EDIT ME — frequently changed content lives here
   ===================================================== */
const CONFIG = {
  // Contact form: paste your Formspree endpoint (https://formspree.io/f/xxxxxxx).
  // Web3Forms also works: use https://api.web3forms.com/submit and add your key via FORM_EXTRA.
  formEndpoint: 'YOUR_FORMSPREE_ENDPOINT',
  FORM_EXTRA: {}, // e.g. { access_key: 'YOUR_KEY' } for Web3Forms
};

// Gallery: swap src for your own images (assets/images/gallery/…). shape: tall | wide | square
const GALLERY = [
  { src: 'assets/images/gallery/astro-1.svg', w: 800, h: 1000, alt: 'Placeholder astrophotography frame, tall crop', cap: 'Frame 01 — replace me' },
  { src: 'assets/images/gallery/astro-2.svg', w: 1200, h: 800, alt: 'Placeholder astrophotography frame, wide crop', cap: 'Frame 02 — replace me' },
  { src: 'assets/images/gallery/astro-3.svg', w: 900, h: 900, alt: 'Placeholder astrophotography frame, square crop', cap: 'Frame 03 — replace me' },
  { src: 'assets/images/gallery/astro-4.svg', w: 1200, h: 700, alt: 'Placeholder astrophotography frame, panoramic crop', cap: 'Frame 04 — replace me' },
  { src: 'assets/images/gallery/astro-5.svg', w: 800, h: 1100, alt: 'Placeholder astrophotography frame, tall crop', cap: 'Frame 05 — replace me' },
  { src: 'assets/images/gallery/astro-6.svg', w: 1100, h: 800, alt: 'Placeholder astrophotography frame, wide crop', cap: 'Frame 06 — replace me' },
];

// YouTube: add videos as { id: 'VIDEO_ID', title: 'Exact title' }. Leave empty to show the channel card.
const VIDEOS = [];
const CHANNEL_URL = 'https://youtube.com/@ayushonlyy';

// Achievements: set placeholder:false and fill the details once you have real entries.
const ACHIEVEMENTS = [
  { placeholder: true, year: 'Year', title: 'Achievement title', text: 'Add a short description of this achievement.' },
  { placeholder: true, year: 'Year', title: 'Achievement title', text: 'Add a short description of this achievement.' },
  { placeholder: true, year: 'Year', title: 'Achievement title', text: 'Add a short description of this achievement.' },
];

const FOCUS = [
  ['Independent Research', 'Following my own questions about the internet and information, outside any classroom.'],
  ['Astrophotography', 'Capturing the night sky, one clear evening at a time.'],
  ['Story Writing', 'Building characters and worlds, and shaping ideas into stories worth telling.'],
  ['Video Editing', 'Cutting footage into something with rhythm and mood.'],
  ['Content Creation', 'Making reels, edits and videos from idea to upload.'],
  ['Creative Direction', 'Deciding how a piece should look, sound and feel.'],
  ['Building Startups', 'Turning ideas into real products and services, and learning in public.'],
  ['Product Thinking', 'Asking what people actually need before building anything.'],
  ['Scientific Exploration', 'Staying curious about physics, space and how things work.'],
];

/* ===================================================== */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const OUT = '<svg aria-hidden="true"><use href="#i-out"/></svg>';

/* ---------- Render data sections ---------- */
$('#focusGrid').innerHTML = FOCUS.map((f, i) =>
  `<div class="card focus lift rv"><span class="n">${String(i + 1).padStart(2, '0')}</span><h3>${esc(f[0])}</h3><p>${esc(f[1])}</p></div>`).join('');

$('#achGrid').innerHTML = ACHIEVEMENTS.map(a =>
  `<div class="card ach ${a.placeholder ? 'ph' : ''} rv"><div class="yr">${esc(a.year)}</div><h3>${esc(a.title)}</h3><p>${esc(a.text)}</p></div>`).join('');

const yt = $('#ytGrid');
if (VIDEOS.length) {
  yt.innerHTML = VIDEOS.map((v, i) =>
    `<article class="card vid lift rv"><button class="thumb" type="button" data-i="${i}" aria-label="Play ${esc(v.title || 'video')}"><img loading="lazy" src="https://i.ytimg.com/vi/${esc(v.id)}/hqdefault.jpg" alt=""><span class="play"><svg aria-hidden="true"><use href="#i-play"/></svg></span></button><div class="meta"><h3>${esc(v.title || 'Watch on YouTube')}</h3></div></article>`).join('');
  yt.addEventListener('click', e => {
    const b = e.target.closest('.thumb'); if (!b) return;
    const v = VIDEOS[b.dataset.i];
    b.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${encodeURIComponent(v.id)}?autoplay=1&rel=0" title="${esc(v.title || 'YouTube video')}" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>`;
  });
} else {
  yt.style.gridTemplateColumns = '1fr';
  yt.innerHTML = `<a class="card yt-ch lift rv" href="${CHANNEL_URL}" target="_blank" rel="noopener noreferrer"><div class="ic"><svg aria-hidden="true"><use href="#i-yt"/></svg></div><div class="tx"><h3>@ayushonlyy on YouTube</h3><p>Videos and projects live on the channel.</p></div><span class="btn btn-p">Watch on YouTube ${OUT}</span></a>`;
}

/* ---------- Gallery + lightbox ---------- */
const gal = $('#gallery');
gal.innerHTML = GALLERY.map((g, i) =>
  `<button class="gi rv" type="button" data-i="${i}" aria-label="Open image: ${esc(g.cap)}"><img loading="lazy" decoding="async" src="${esc(g.src)}" width="${g.w}" height="${g.h}" alt="${esc(g.alt)}"><span class="cap">${esc(g.cap)}</span></button>`).join('');

const lb = $('#lb'), lbImg = $('#lbImg'), lbCap = $('#lbCap');
let cur = 0, lastFocus = null;
function show(i) {
  cur = (i + GALLERY.length) % GALLERY.length;
  const g = GALLERY[cur];
  lbImg.src = g.src; lbImg.alt = g.alt; lbCap.textContent = g.cap;
}
function openLb(i) {
  lastFocus = document.activeElement; show(i);
  lb.classList.add('open'); lb.setAttribute('aria-hidden', 'false');
  document.documentElement.classList.add('locked'); $('#lbX').focus();
}
function closeLb() {
  lb.classList.remove('open'); lb.setAttribute('aria-hidden', 'true');
  document.documentElement.classList.remove('locked'); lastFocus && lastFocus.focus();
}
gal.addEventListener('click', e => { const b = e.target.closest('.gi'); if (b) openLb(+b.dataset.i); });
$('#lbX').onclick = closeLb; $('#lbP').onclick = () => show(cur - 1); $('#lbN').onclick = () => show(cur + 1);
lb.addEventListener('click', e => { if (e.target === lb) closeLb(); });
document.addEventListener('keydown', e => {
  if (!lb.classList.contains('open')) return;
  if (e.key === 'Escape') closeLb();
  else if (e.key === 'ArrowLeft') show(cur - 1);
  else if (e.key === 'ArrowRight') show(cur + 1);
  else if (e.key === 'Tab') { // keep focus inside the viewer
    const f = $$('button', lb), first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }
});
let sx = 0, sy = 0;
lb.addEventListener('touchstart', e => { sx = e.touches[0].clientX; sy = e.touches[0].clientY; }, { passive: true });
lb.addEventListener('touchend', e => {
  const dx = e.changedTouches[0].clientX - sx, dy = e.changedTouches[0].clientY - sy;
  if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) show(cur + (dx < 0 ? 1 : -1));
}, { passive: true });

/* ---------- Music + loader ---------- */
const audio = $('#bgMusic'), mBtn = $('#musicBtn'), loader = $('#loader');
const store = { get: k => { try { return sessionStorage.getItem(k) } catch { return null } }, set: (k, v) => { try { sessionStorage.setItem(k, v) } catch { } } };
const pref = { get: () => { try { return localStorage.getItem('musicMuted') === '1' } catch { return false } }, set: v => { try { localStorage.setItem('musicMuted', v ? '1' : '0') } catch { } } };
let muted = pref.get(), entered = false;
const sync = () => mBtn.setAttribute('aria-pressed', String(!muted));
sync();

async function play() {
  try { await audio.play(); } catch { muted = true; sync(); } // autoplay blocked: stay off until user toggles
}
mBtn.addEventListener('click', () => {
  muted = !muted; pref.set(muted); sync();
  if (!entered) return;
  if (muted) audio.pause(); else play();
});
$('#enterBtn').addEventListener('click', () => {
  entered = true;
  const t = parseFloat(store.get('musicTime'));
  audio.addEventListener('loadedmetadata', () => { if (t && t < audio.duration) audio.currentTime = t; }, { once: true });
  audio.preload = 'auto'; audio.load();
  if (!muted) play();
  loader.classList.add('out'); document.documentElement.classList.remove('locked');
  setTimeout(() => { loader.hidden = true; }, 950);
});
document.documentElement.classList.add('locked');
audio.addEventListener('timeupdate', () => { if (audio.currentTime) store.set('musicTime', audio.currentTime.toFixed(1)); });
addEventListener('pagehide', () => { if (audio.currentTime) store.set('musicTime', audio.currentTime.toFixed(1)); });
document.addEventListener('visibilitychange', () => { if (entered && !muted) { document.hidden ? audio.pause() : play(); } });

/* ---------- Star field (drawn once, no animation loop) ---------- */
(function stars() {
  const c = $('#stars'), x = c.getContext('2d'); let t;
  function draw() {
    const d = Math.min(devicePixelRatio || 1, 2), w = innerWidth, h = innerHeight;
    c.width = w * d; c.height = h * d; x.scale(d, d);
    const n = Math.min(220, Math.floor(w * h / 7000));
    for (let i = 0; i < n; i++) {
      x.globalAlpha = .15 + Math.random() * .6;
      x.fillStyle = Math.random() > .8 ? '#B794FF' : '#fff';
      x.beginPath(); x.arc(Math.random() * w, Math.random() * h, Math.random() * 1.2 + .2, 0, 6.283); x.fill();
    }
  }
  draw();
  let lw = innerWidth;
  addEventListener('resize', () => { if (innerWidth === lw) return; lw = innerWidth; clearTimeout(t); t = setTimeout(draw, 250); });
})();

/* ---------- Nav ---------- */
const nav = $('#nav'), prog = $('#progress'), sheet = $('#sheet'), burger = $('#burger');
let tick = false;
addEventListener('scroll', () => {
  if (tick) return; tick = true;
  requestAnimationFrame(() => {
    const m = document.documentElement.scrollHeight - innerHeight;
    nav.classList.toggle('solid', scrollY > 20);
    prog.style.transform = `scaleX(${m > 0 ? scrollY / m : 0})`; tick = false;
  });
}, { passive: true });
function menu(open) {
  sheet.classList.toggle('open', open); burger.setAttribute('aria-expanded', String(open));
  burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  document.documentElement.classList.toggle('locked', open);
}
burger.onclick = () => menu(!sheet.classList.contains('open'));
sheet.addEventListener('click', e => { if (e.target.closest('a')) menu(false); });
document.addEventListener('keydown', e => { if (e.key === 'Escape' && sheet.classList.contains('open')) { menu(false); burger.focus(); } });
const linkMap = new Map($$('.links a').map(a => [a.getAttribute('href').slice(1), a]));
const spy = new IntersectionObserver(es => es.forEach(e => {
  if (!e.isIntersecting) return;
  linkMap.forEach(a => a.classList.remove('on'));
  const a = linkMap.get(e.target.id); if (a) a.classList.add('on');
}), { rootMargin: '-45% 0px -50% 0px' });
$$('main section').forEach(s => spy.observe(s));

/* ---------- Reveal ---------- */
const rv = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add('in'); rv.unobserve(e.target); }
}), { rootMargin: '0px 0px -8% 0px', threshold: .05 });
$$('.rv').forEach((el, i) => { el.style.transitionDelay = (i % 3) * 70 + 'ms'; rv.observe(el); });

/* ---------- Custom cursor (desktop only) ---------- */
if (matchMedia('(hover:hover) and (pointer:fine)').matches && !reduce) {
  document.body.classList.add('has-cursor');
  const dot = $('#curDot'), ring = $('#curRing');
  let mx = -100, my = -100, rx = -100, ry = -100, run = false;
  const loop = () => {
    rx += (mx - rx) * .18; ry += (my - ry) * .18;
    ring.style.transform = `translate3d(${rx}px,${ry}px,0)`;
    if (Math.abs(mx - rx) + Math.abs(my - ry) > .3) requestAnimationFrame(loop); else run = false;
  };
  addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY; dot.style.transform = `translate3d(${mx}px,${my}px,0)`;
    if (!run) { run = true; requestAnimationFrame(loop); }
  }, { passive: true });
  document.addEventListener('mouseover', e => ring.classList.toggle('hov', !!e.target.closest('a,button,input,textarea')));
}

/* ---------- Contact form ---------- */
const form = $('#form'), status = $('#status'), send = $('#send'), sendT = $('#sendT');
const rules = {
  fName: v => v.trim() ? '' : 'Please enter your name.',
  fEmail: v => !v.trim() ? 'Please enter your email.' : /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) ? '' : 'Please enter a valid email address.',
  fMsg: v => v.trim().length >= 5 ? '' : 'Please write a short message.',
};
const errId = { fName: 'eName', fEmail: 'eEmail', fMsg: 'eMsg' };
function check(id) {
  const el = $('#' + id), msg = rules[id](el.value), box = el.closest('.f');
  box.classList.toggle('bad', !!msg); $('#' + errId[id]).textContent = msg;
  el.setAttribute('aria-invalid', msg ? 'true' : 'false'); return !msg;
}
Object.keys(rules).forEach(id => $('#' + id).addEventListener('blur', () => check(id)));
function say(type, text) { status.className = 'status show ' + type; status.textContent = text; }
form.addEventListener('submit', async e => {
  e.preventDefault(); status.className = 'status';
  const ok = Object.keys(rules).map(check).every(Boolean);
  if (!ok) { $$('.f.bad input, .f.bad textarea')[0]?.focus(); return; }
  if (!CONFIG.formEndpoint || CONFIG.formEndpoint.includes('YOUR_')) {
    say('info', "The contact form isn't connected yet, so nothing was sent. Please reach out on LinkedIn or X for now."); return;
  }
  send.disabled = true; send.classList.add('loading'); sendT.textContent = 'Sending…';
  try {
    const res = await fetch(CONFIG.formEndpoint, {
      method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ name: $('#fName').value, email: $('#fEmail').value, message: $('#fMsg').value, ...CONFIG.FORM_EXTRA }),
    });
    if (!res.ok) throw new Error(res.status);
    form.reset(); say('ok', "Thanks! Your message has been sent. I'll reply soon.");
  } catch { say('fail', 'Something went wrong and your message was not sent. Please try again or contact me on LinkedIn.'); }
  finally { send.disabled = false; send.classList.remove('loading'); sendT.textContent = 'Send message'; }
});

/* ---------- Footer year ---------- */
$('#yr').textContent = new Date().getFullYear();
                   
