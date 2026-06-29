/* ========== FZ Eventz v5 — JS ========== */

(function() {
  'use strict';

  /* === MOBILE TOGGLE === */
  const mt = document.querySelector('.m-toggle');
  const mm = document.querySelector('.m-menu');
  const ml = document.querySelectorAll('.m-menu a');
  if(mt && mm){
    mt.addEventListener('click', function(e){
      e.stopPropagation();
      const o = mm.classList.contains('open');
      mm.classList.toggle('open'); mt.classList.toggle('active');
      document.body.style.overflow = o ? '' : 'hidden';
    });
    ml.forEach(a => a.addEventListener('click', function(){
      mm.classList.remove('open'); mt.classList.remove('active');
      document.body.style.overflow = '';
    }));
    document.addEventListener('click', function(e){
      if(!mm.contains(e.target) && !mt.contains(e.target) && mm.classList.contains('open')){
        mm.classList.remove('open'); mt.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  /* === NAV SCROLL === */
  const nv = document.querySelector('.nav');
  if(nv){
    let st = false;
    function ns(){
      if(window.scrollY > 60 && !st){ nv.classList.add('scrolled'); st = true; }
      else if(window.scrollY <= 60 && st){ nv.classList.remove('scrolled'); st = false; }
    }
    window.addEventListener('scroll', ns, {passive:true});
    ns();
  }

  /* === OVERLAY FORM === */
  const lf = document.querySelector('#leadForm');
  const lb = document.querySelector('.lp');
  const lx = document.querySelector('.ov-x');
  const ov = document.querySelector('.ov');
  if(lb && ov && lx){
    lb.addEventListener('click', ()=> { ov.classList.add('open'); document.body.style.overflow = 'hidden'; });
    lx.addEventListener('click', ()=> { ov.classList.remove('open'); document.body.style.overflow = ''; });
    ov.addEventListener('click', function(e){ if(e.target === this){ this.classList.remove('open'); document.body.style.overflow = ''; }});
  }
  if(lf){
    lf.addEventListener('submit', function(e){
      e.preventDefault();
      const n=encodeURIComponent(this.querySelector('#leadName').value);
      const p=encodeURIComponent(this.querySelector('#leadPhone').value);
      const e2=encodeURIComponent(this.querySelector('#leadEmail').value);
      const msg=encodeURIComponent(this.querySelector('#leadMsg')?.value||'');
      const ev=encodeURIComponent(this.querySelector('#leadEvent')?.value||'');
      window.open(`https://wa.me/918970118819?text=Hi%20FZ%20Eventz!%0AName:%20${n}%0APhone:%20${p}%0AEmail:%20${e2}%0AEvent%20Type:%20${ev}%0AMessage:%20${msg}`,'_blank');
      this.reset();
      if(ov) { ov.classList.remove('open'); document.body.style.overflow = ''; }
    });
  }

  /* === CONTACT FORM === */
  const cf = document.querySelector('#contactForm');
  if(cf){
    cf.addEventListener('submit', function(e){
      e.preventDefault();
      const n=encodeURIComponent(this.querySelector('#cname').value);
      const p=encodeURIComponent(this.querySelector('#cphone').value);
      const e2=encodeURIComponent(this.querySelector('#cemail').value);
      const et=encodeURIComponent(this.querySelector('#cevent').value);
      const msg=encodeURIComponent(this.querySelector('#cmsg').value);
      window.open(`https://wa.me/918970118819?text=Hi%20FZ%20Eventz!%0AName:%20${n}%0APhone:%20${p}%0AEmail:%20${e2}%0AEvent%20Type:%20${et}%0AMessage:%20${msg}`,'_blank');
      this.reset();
    });
  }

  /* === REVEAL ON SCROLL === */
  function ro(el, c = 'v'){
    if(!('IntersectionObserver' in window)) return el.forEach(e => e.classList.add(c));
    const o = new IntersectionObserver((entries) => {
      entries.forEach(en => {
        if(en.isIntersecting){ en.target.classList.add(c); o.unobserve(en.target); }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    el.forEach(e => o.observe(e));
  }
  let ri = setInterval(() => {
    if(document.querySelectorAll('.r, .rl, .rr, .rs, .e-c, .t-c').length){
      clearInterval(ri);
      ro(document.querySelectorAll('.r'));
      ro(document.querySelectorAll('.rl'));
      ro(document.querySelectorAll('.rr'));
      ro(document.querySelectorAll('.rs'));
      ro(document.querySelectorAll('.e-c'));
      ro(document.querySelectorAll('.t-c'));
    }
  }, 100);

  /* === STATS COUNTER (FIXED) === */
  const sn = document.querySelectorAll('.si h3');
  if(sn.length){
    let counted = false;
    const co = new IntersectionObserver((entries) => {
      if(counted) return;
      entries.forEach(en => {
        if(en.isIntersecting){
          counted = true;
          sn.forEach(s => {
            const t = parseInt(s.getAttribute('data-target')) || 0;
            if(t === 0) { s.textContent = '∞'; return; }
            let start = null, dur = 2000;
            function an(ts){
              if(!start) start = ts;
              const p = Math.min((ts - start) / dur, 1);
              const ease = 1 - Math.pow(1 - p, 3);
              const cur = Math.round(ease * t);
              s.textContent = cur + (t >= 250 ? '+' : '');
              if(p < 1) requestAnimationFrame(an);
              else s.textContent = t + (t >= 100 ? '+' : '');
            }
            requestAnimationFrame(an);
          });
          co.unobserve(en.target);
        }
      });
    }, { threshold: 0.5 });
    sn.forEach(s => co.observe(s.parentElement));
  }

  /* === 3D TILT ON EVENT CARDS === */
  const ec = document.querySelectorAll('.e-c');
  ec.forEach(c => {
    if(window.innerWidth < 768) return;
    c.addEventListener('mousemove', function(e){
      const r = this.getBoundingClientRect();
      const x = e.clientX - r.left, y = e.clientY - r.top;
      const rx = ((y / r.height) - 0.5) * 10;
      const ry = ((x / r.width) - 0.5) * -10;
      this.style.transform = `perspective(1200px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(1.01,1.01,1.01)`;
    });
    c.addEventListener('mouseleave', function(){
      this.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)';
    });
  });

  /* === CURSOR GLOW === */
  if(window.innerWidth > 768){
    const cg = document.createElement('div');
    cg.id = 'cursor-glow';
    Object.assign(cg.style, {
      position: 'fixed', width: '400px', height: '400px',
      borderRadius: '50%', background: 'radial-gradient(circle,rgba(212,175,55,0.05) 0%,transparent 70%)',
      pointerEvents: 'none', zIndex: '9999', transform: 'translate(-50%,-50%)',
      transition: 'opacity 0.3s', opacity: '0', top: '0', left: '0',
      willChange: 'transform'
    });
    document.body.appendChild(cg);
    let htm = false;
    document.addEventListener('mousemove', function(e){
      cg.style.transform = `translate(${e.clientX - 200}px, ${e.clientY - 200}px)`;
      if(!htm) { cg.style.opacity = '1'; htm = true; }
    });
    document.addEventListener('mouseleave', () => { cg.style.opacity = '0'; htm = false; });
  }

  /* === BACKGROUND PARTICLES PER SECTION === */
  function injectBgParticles(selector, opts = {}){
    const sec = document.querySelector(selector);
    if(!sec) return;
    const bg = document.createElement('div');
    bg.className = 'bg-e bg-particles';
    bg.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;overflow:hidden;pointer-events:none;z-index:0';
    sec.style.position = 'relative';
    sec.prepend(bg);

    const c = opts.count || 12;
    const types = ['g-p','g-p','sh-l','sh-l','f-o','t-d'];
    for(let i=0; i<c; i++){
      let el;
      const t = types[i % types.length];
      if(t === 'g-p'){
        el = document.createElement('div'); el.className = t;
        const sz = 2 + Math.random() * 5;
        const d = 15 + Math.random() * 30;
        Object.assign(el.style, {
          width: sz+'px', height: sz+'px',
          left: Math.random() * 100 + '%',
          animation: `f${(i%3)+1} ${8+Math.random()*12}s ${Math.random()*20}s linear infinite`,
          opacity: 0.15 + Math.random() * 0.3
        });
      } else if(t === 'sh-l'){
        el = document.createElement('div'); el.className = t;
        const w = 100 + Math.random() * 300;
        const d = 10 + Math.random() * 20;
        Object.assign(el.style, {
          width: w+'px',
          top: Math.random() * 100 + '%',
          left: '-50px',
          animation: `s${(i%2)+1} ${10+Math.random()*15}s ${Math.random()*10}s linear infinite`
        });
      } else if(t === 'f-o'){
        el = document.createElement('div'); el.className = t;
        const sz = 150 + Math.random() * 250;
        Object.assign(el.style, {
          width: sz+'px', height: sz+'px',
          top: Math.random() * 100 + '%',
          left: Math.random() * 100 + '%',
          background: `radial-gradient(circle,rgba(212,175,55,0.03) 0%,transparent 70%)`,
          animation: `o${(i%2)+1} ${15+Math.random()*15}s ${Math.random()*10}s ease-in-out infinite`
        });
      } else if(t === 't-d'){
        el = document.createElement('div'); el.className = t;
        const sz = 1 + Math.random() * 2;
        Object.assign(el.style, {
          width: sz+'px', height: sz+'px',
          top: Math.random() * 100 + '%',
          left: Math.random() * 100 + '%',
          animation: `tw ${3+Math.random()*5}s ${Math.random()*8}s ease-in-out infinite`
        });
      }
      if(el) bg.appendChild(el);
    }
  }

  function initParticles(){
    const sections = ['#hero','#about','#events','#wedding','#testimonials','#contact'];
    const counts = [18,14,12,16,10,14];
    sections.forEach((s,i) => {
      setTimeout(() => injectBgParticles(s, { count: counts[i] }), i * 100);
    });
  }
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initParticles);
  else initParticles();

})();
