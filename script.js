/* ============================================================
   PORTFOLIO SCRIPT — Juan Pablo Quijano Martinez
/* ============================================================
   AUDIO API (Sci-Fi effects)
   ============================================================ */
const AudioContext = window.AudioContext || window.webkitAudioContext;
let audioCtx;
function initAudio() {
    if (!audioCtx) audioCtx = new AudioContext();
    if (audioCtx.state === 'suspended') audioCtx.resume();
}
function playBeep() {
    if (!audioCtx || audioCtx.state === 'suspended') return;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(800 + Math.random()*400, audioCtx.currentTime);
    gain.gain.setValueAtTime(0.015, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.05);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.05);
}
function playPowerUp() {
    if (!audioCtx || audioCtx.state === 'suspended') return;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(50, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(800, audioCtx.currentTime + 0.8);
    gain.gain.setValueAtTime(0, audioCtx.currentTime);
    gain.gain.linearRampToValueAtTime(0.1, audioCtx.currentTime + 0.2);
    gain.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.8);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.8);
}

/* ============================================================
   INTRO TERMINAL EXPERIENCE
   ============================================================ */
(function () {
    const intro = document.getElementById('introScreen');
    const terminal = document.getElementById('introTerminal');
    const btn = document.getElementById('startSystemBtn');
    if (!intro || !terminal || !btn) return;

    // Freeze scroll
    document.body.style.overflow = 'hidden';

    // Hacker typing lines
    const lines = [
        "Iniciando secuencia de arranque del portafolio...",
        "Estableciendo conexión encriptada de 256 bits...",
        "Cargando módulos de compilación cruzada [██████████] 100%",
        "Sincronizando animaciones del DOM... OK",
        "Análisis de entorno táctico... Completado.",
        "SISTEMA PREPARADO. Esperando autorización de origen."
    ];

    let currentLine = 0;
    
    function typeLine() {
        if (currentLine >= lines.length) {
            setTimeout(() => {
                btn.style.display = 'inline-block';
                btn.style.animation = 'termFadeIn 0.8s forwards';
            }, 300);
            return;
        }

        const p = document.createElement('p');
        p.textContent = '> ' + lines[currentLine];
        terminal.appendChild(p);
        currentLine++;
        setTimeout(typeLine, 250 + Math.random() * 450); 
    }

    setTimeout(typeLine, 800);

    btn.addEventListener('click', () => {
        initAudio();
        playPowerUp();
        // Global glitch flash
        const flash = document.createElement('div');
        flash.className = 'click-flash';
        flash.style.cssText = 'left: 50%; top: 50%; width: 100vw; height: 100vh; animation: flashBurst 0.7s ease-out forwards; pointer-events: none; z-index: 10000; position: fixed; transform: translate(-50%, -50%); border-radius: 0; background: rgba(255,255,255,0.85);';
        document.body.appendChild(flash);
        setTimeout(() => flash.remove(), 800);

        btn.classList.add('anim-glitch-out');
        terminal.style.transition = 'opacity 0.2s';
        terminal.style.opacity = '0';
        
        setTimeout(() => {
            intro.classList.add('unlocked');
            document.body.style.overflow = '';
            document.dispatchEvent(new Event('introFinished'));
            setTimeout(() => intro.remove(), 1200);
        }, 500);
    });
})();

/* ============================================================
   CUSTOM CURSOR (desktop only)
   ============================================================ */
(function () {
    const cursor = document.getElementById('cursor');
    const dot    = document.getElementById('cursorDot');
    if (!cursor || !dot || window.matchMedia('(hover: none)').matches) return;

    let mx = 0, my = 0, cx = 0, cy = 0;

    document.addEventListener('mousemove', e => {
        mx = e.clientX; my = e.clientY;
        dot.style.left = mx + 'px';
        dot.style.top  = my + 'px';
    });

    (function animCursor() {
        cx += (mx - cx) * 0.11;
        cy += (my - cy) * 0.11;
        cursor.style.left = cx + 'px';
        cursor.style.top  = cy + 'px';
        requestAnimationFrame(animCursor);
    })();

    document.querySelectorAll('a, button, [data-tilt], .filter-btn, .social-btn').forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });
    document.addEventListener('mousedown', () => cursor.classList.add('clicking'));
    document.addEventListener('mouseup',   () => cursor.classList.remove('clicking'));
})();

/* ============================================================
   SCROLL PROGRESS BAR
   ============================================================ */
const scrollBar = document.getElementById('scrollProgress');
window.addEventListener('scroll', () => {
    const pct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
    if (scrollBar) scrollBar.style.width = pct + '%';
}, { passive: true });

/* ============================================================
   NAVBAR — scroll shrink + mobile hamburger + active link
   ============================================================ */
(function () {
    const nav       = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navLinks  = document.getElementById('navLinks');

    window.addEventListener('scroll', () => {
        nav.classList.toggle('scrolled', window.scrollY > 60);
    }, { passive: true });

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('open');
        navLinks.classList.toggle('open');
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('open');
            navLinks.classList.remove('open');
        });
    });

    const sections = document.querySelectorAll('section[id]');
    const linkMap  = {};
    document.querySelectorAll('.nav-link[data-section]').forEach(l => {
        linkMap[l.dataset.section] = l;
    });

    const navObs = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                Object.values(linkMap).forEach(l => l.classList.remove('active'));
                if (linkMap[e.target.id]) linkMap[e.target.id].classList.add('active');
            }
        });
    }, { threshold: 0.4 });

    sections.forEach(s => navObs.observe(s));
})();

/* ============================================================
   THEME TOGGLE
   ============================================================ */
(function () {
    const btn  = document.getElementById('themeToggle');
    const html = document.documentElement;
    html.dataset.theme = localStorage.getItem('theme') || 'dark';

    btn.addEventListener('click', () => {
        const next = html.dataset.theme === 'dark' ? 'light' : 'dark';
        html.dataset.theme = next;
        localStorage.setItem('theme', next);
    });
})();

/* ============================================================
   HERO CANVAS — interactive particle constellation
   ============================================================ */
(function () {
    const canvas = document.getElementById('heroCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let particles = [];
    let mx = -999, my = -999;
    const N = 85, DIST = 130;

    function resize() {
        canvas.width  = window.innerWidth;
        canvas.height = window.innerHeight;
        spawnParticles();
    }

    function spawnParticles() {
        particles = Array.from({ length: N }, () => ({
            x:  Math.random() * canvas.width,
            y:  Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.55,
            vy: (Math.random() - 0.5) * 0.55,
            r:  Math.random() * 1.8 + 0.8,
            a:  Math.random() * 0.35 + 0.15
        }));
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(p => {
            p.x += p.vx; p.y += p.vy;
            if (p.x < 0 || p.x > canvas.width)  p.vx *= -1;
            if (p.y < 0 || p.y > canvas.height)  p.vy *= -1;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(212,175,55,${p.a})`;
            ctx.fill();
        });

        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const d  = Math.hypot(dx, dy);
                if (d < DIST) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(212,175,55,${0.12 * (1 - d / DIST)})`;
                    ctx.lineWidth = 0.55;
                    ctx.stroke();
                }
            }
        }

        particles.forEach(p => {
            const d = Math.hypot(mx - p.x, my - p.y);
            if (d < 190) {
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(mx, my);
                ctx.strokeStyle = `rgba(212,175,55,${0.28 * (1 - d / 190)})`;
                ctx.lineWidth = 0.9;
                ctx.stroke();
            }
        });

        requestAnimationFrame(draw);
    }

    window.addEventListener('resize', resize, { passive: true });
    document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; }, { passive: true });
    resize();
    draw();
})();

/* ============================================================
   PERSISTENT FIRE/EMBER CANVAS — cursor-reactive + ambient
   ============================================================ */
(function () {
    const canvas = document.getElementById('fireCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let particles = [];
    let mx = -999, my = -999;
    let lastMx = -999, lastMy = -999;
    let mouseSpeed = 0;

    function resize() {
        canvas.width  = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    function createParticle(x, y, type) {
        const isCursor = type === 'cursor';
        return {
            x: x + (Math.random() - 0.5) * (isCursor ? 30 : canvas.width),
            y: isCursor ? y : canvas.height + 10,
            vx: (Math.random() - 0.5) * (isCursor ? 3 : 0.8),
            vy: isCursor ? -(2 + Math.random() * 5) : -(0.3 + Math.random() * 1.5),
            r:  isCursor ? (1 + Math.random() * 2) : (1 + Math.random() * 2.5),
            life: 0,
            maxLife: isCursor ? (0.4 + Math.random() * 0.5) : (0.5 + Math.random() * 0.5),
            hue: 15 + Math.random() * 40,
            type: type
        };
    }

    // Ambient particles removed as per user request
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Spawn cursor particles based on mouse speed
        if (mx > 0 && my > 0 && mouseSpeed > 1) {
            const count = Math.min(Math.floor(mouseSpeed / 8), 2);
            for (let i = 0; i < count; i++) {
                particles.push(createParticle(mx, my, 'cursor'));
            }
        }

        // Keeping ambient count logic removed to stop ambient fire
        // Update and draw
        for (let i = particles.length - 1; i >= 0; i--) {
            const p = particles[i];
            p.x += p.vx;
            p.y += p.vy;
            p.life += 0.016;
            if (p.type === 'cursor') p.vy *= 0.98; // decelerate

            if (p.life > p.maxLife || p.y < -30) {
                if (p.type === 'ambient') {
                    // Respawn
                    p.x = Math.random() * canvas.width;
                    p.y = canvas.height + 10;
                    p.life = 0;
                    p.vx = (Math.random() - 0.5) * 0.8;
                    p.vy = -(0.3 + Math.random() * 1.5);
                } else {
                    particles.splice(i, 1);
                    continue;
                }
            }

            const progress = p.life / p.maxLife;
            const alpha = Math.sin(progress * Math.PI) * (p.type === 'cursor' ? 0.85 : 0.4);

            // Outer glow
            const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 3);
            grd.addColorStop(0, `hsla(${p.hue}, 100%, 85%, ${alpha})`);
            grd.addColorStop(0.3, `hsla(${p.hue}, 100%, 60%, ${alpha * 0.6})`);
            grd.addColorStop(1, `hsla(${p.hue}, 100%, 30%, 0)`);
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r * 3, 0, Math.PI * 2);
            ctx.fillStyle = grd;
            ctx.fill();

            // Bright core
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r * 0.5, 0, Math.PI * 2);
            ctx.fillStyle = `hsla(${p.hue + 10}, 100%, 95%, ${alpha})`;
            ctx.fill();
        }

        // Limit total particles
        if (particles.length > 400) {
            particles.splice(0, particles.length - 400);
        }

        requestAnimationFrame(draw);
    }

    window.addEventListener('resize', resize, { passive: true });
    document.addEventListener('mousemove', e => {
        const dx = e.clientX - mx;
        const dy = e.clientY - my;
        mouseSpeed = Math.hypot(dx, dy);
        mx = e.clientX;
        my = e.clientY;

        // Video parallax
        const bg = document.getElementById('videoBackground');
        if (bg) {
            const px = (e.clientX / window.innerWidth - 0.5) * 30;
            const py = (e.clientY / window.innerHeight - 0.5) * 30;
            bg.style.transform = `translate(${-px}px, ${-py}px)`;
        }
    }, { passive: true });

    resize();
    draw();
})();

/* ============================================================
   TYPEWRITER EFFECT
   ============================================================ */
(function () {
    const el = document.getElementById('typewriter');
    if (!el) return;
    const words = ['Developer', 'Programador', 'Innovador', 'Problem Solver', 'Tech Enthusiast'];
    let wi = 0, ci = 0, deleting = false;

    function tick() {
        const word = words[wi];
        if (!deleting) {
            el.textContent = word.slice(0, ++ci);
            if (ci === word.length) { deleting = true; setTimeout(tick, 1600); return; }
        } else {
            el.textContent = word.slice(0, --ci);
            if (ci === 0) {
                deleting = false;
                wi = (wi + 1) % words.length;
                setTimeout(tick, 450);
                return;
            }
        }
        setTimeout(tick, deleting ? 55 : 95);
    }
    setTimeout(tick, 1000);
})();

/* counter logic moved to TECH ANIMATIONS block below */

/* ============================================================
   CTA BUTTON → scroll to projects
   ============================================================ */
document.getElementById('ctaBtn')?.addEventListener('click', () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
});

/* ============================================================
   SMOOTH SCROLL for all anchor links
   ============================================================ */
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        const href = a.getAttribute('href');
        if (href === '#') return;
        e.preventDefault();
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    });
});

/* ============================================================
   SCROLL REVEAL (IntersectionObserver)
   ============================================================ */
const revealObs = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('visible'), i * 70);
            revealObs.unobserve(entry.target);
        }
    });
}, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('[data-reveal]').forEach(el => revealObs.observe(el));

/* ============================================================
   SKILL BARS animation on scroll
   ============================================================ */
const barObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.querySelectorAll('.skill-bar-fill').forEach(bar => {
                bar.style.width = bar.dataset.w + '%';
            });
            barObs.unobserve(entry.target);
        }
    });
}, { threshold: 0.35 });

const aboutSec = document.getElementById('about');
if (aboutSec) barObs.observe(aboutSec);

/* ============================================================
   3D CARD TILT on mouse move
   ============================================================ */
document.querySelectorAll('[data-tilt]').forEach(card => {
    card.addEventListener('mousemove', e => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width  - 0.5;
        const y = (e.clientY - r.top)  / r.height - 0.5;
        card.style.transform = `perspective(900px) rotateX(${-y * 9}deg) rotateY(${x * 9}deg) translateY(-6px)`;
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

/* ============================================================
   SKILLS TICKER — populate via JS
   ============================================================ */
/* Ticker removed — single orbit carousel now */

/* ============================================================
   PROJECT FILTER with smooth animation
   ============================================================ */
(function () {
    const btns  = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.project-card');

    btns.forEach(btn => {
        btn.addEventListener('click', () => {
            btns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.dataset.filter;

            cards.forEach(card => {
                const visible = filter === 'all' || card.dataset.cat === filter;
                if (visible) {
                    card.style.display = '';
                    requestAnimationFrame(() => {
                        card.classList.remove('out');
                        card.style.opacity   = '1';
                        card.style.transform = '';
                    });
                } else {
                    card.classList.add('out');
                    card.style.opacity   = '0';
                    card.style.transform = 'scale(0.92)';
                    setTimeout(() => {
                        if (card.classList.contains('out')) card.style.display = 'none';
                    }, 320);
                }
            });
        });
    });
})();

/* ============================================================
   VIDEO MODAL
   ============================================================ */
function openVideoModal(btn) {
    const videoId = btn.dataset.video;
    const modal   = document.getElementById('videoModal');
    const iframe  = document.getElementById('videoIframe');
    iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeVideoModal() {
    const modal  = document.getElementById('videoModal');
    const iframe = document.getElementById('videoIframe');
    modal.classList.remove('open');
    iframe.src = '';
    document.body.style.overflow = '';
}

document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeVideoModal();
});

/* ============================================================
   ████████╗███████╗ ██████╗██╗  ██╗     █████╗ ███╗   ██╗██╗███╗   ███╗███████╗
      ██╔══╝██╔════╝██╔════╝██║  ██║    ██╔══██╗████╗  ██║██║████╗ ████║██╔════╝
      ██║   █████╗  ██║     ███████║    ███████║██╔██╗ ██║██║██╔████╔██║███████╗
      ██║   ██╔══╝  ██║     ██╔══██║    ██╔══██║██║╚██╗██║██║██║╚██╔╝██║╚════██║
      ██║   ███████╗╚██████╗██║  ██║    ██║  ██║██║ ╚████║██║██║ ╚═╝ ██║███████║
      ╚═╝   ╚══════╝ ╚═════╝╚═╝  ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═══╝╚═╝╚═╝     ╚═╝╚══════╝
   ============================================================ */

/* ============================================================
   1. TEXT SCRAMBLE — hacker effect on section titles
   ============================================================ */
class TextScramble {
    constructor(el) {
        this.el = el;
        this.chars = '01アイウエオカキ!@#$%[]{}ABCDEF<>?/|\\';
        this.origHTML = el.innerHTML;
        this.origText = el.textContent;
    }
    run() {
        const txt = this.origText;
        this.queue = [...txt].map((ch, i) => ({
            to: ch, char: '',
            start: Math.floor(i / txt.length * 14),
            end:   Math.floor(i / txt.length * 14) + Math.floor(Math.random() * 12) + 7
        }));
        this.frame = 0;
        cancelAnimationFrame(this.raf);
        this.step();
    }
    step() {
        let out = '', done = 0;
        for (const q of this.queue) {
            if (this.frame >= q.end) {
                done++;
                out += q.to;
            } else if (this.frame >= q.start) {
                if (Math.random() < 0.28) {
                    q.char = this.chars[Math.floor(Math.random() * this.chars.length)];
                    if (typeof playBeep === 'function' && Math.random() < 0.15) playBeep();
                }
                out += `<span class="scramble-char">${q.char || q.to}</span>`;
            } else {
                out += q.to === ' ' ? ' ' : '_';
            }
        }
        this.el.innerHTML = out;
        if (done < this.queue.length) {
            this.raf = requestAnimationFrame(this.step.bind(this));
            this.frame++;
        } else {
            this.el.innerHTML = this.origHTML;
        }
    }
}

document.querySelectorAll('.section-title, .about-lead, .hero-desc, .project-body h3').forEach(el => {
    const sc = new TextScramble(el);
    const obs = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
            setTimeout(() => sc.run(), 150);
            obs.disconnect();
        }
    }, { threshold: 0.6 });
    obs.observe(el);
});

/* ============================================================
   2. GLITCH FLASH on section labels entering viewport
   ============================================================ */
document.querySelectorAll('.section-label').forEach(el => {
    const obs = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
            el.classList.add('glitch-active');
            setTimeout(() => el.classList.remove('glitch-active'), 1300);
            obs.disconnect();
        }
    }, { threshold: 0.9 });
    obs.observe(el);
});

/* ============================================================
   3. SKILLS MARQUEE — CSS-only, no JS needed
   ============================================================ */

/* ============================================================
   4. HOLOGRAPHIC mouse effect on project cards
   ============================================================ */
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', e => {
        const r = card.getBoundingClientRect();
        const x = ((e.clientX - r.left) / r.width  * 100).toFixed(1);
        const y = ((e.clientY - r.top)  / r.height * 100).toFixed(1);
        card.style.setProperty('--holo-x', x + '%');
        card.style.setProperty('--holo-y', y + '%');
    });
    card.addEventListener('mouseleave', () => {
        card.style.setProperty('--holo-x', '50%');
        card.style.setProperty('--holo-y', '50%');
    });
});

/* ============================================================
   5. RIPPLE effect on buttons
   ============================================================ */
document.querySelectorAll('.btn-primary, .btn-ghost, .filter-btn, .social-btn').forEach(btn => {
    btn.addEventListener('click', e => {
        const r    = btn.getBoundingClientRect();
        const size = Math.max(r.width, r.height);
        const rip  = document.createElement('span');
        rip.className = 'ripple';
        rip.style.cssText = `
            width:${size}px; height:${size}px;
            left:${e.clientX - r.left - size/2}px;
            top:${e.clientY - r.top - size/2}px;
        `;
        btn.appendChild(rip);
        setTimeout(() => rip.remove(), 700);
    });
});

/* ============================================================
   6. BINARY RAIN in skills section background
   (injected behind the 3D wrap so overflow is controlled)
   ============================================================ */
(function () {
    const sec = document.querySelector('.skills');
    if (!sec) return;
    const chars = '10アウカ01010ABCDEF10111001';
    for (let i = 0; i < 18; i++) {
        const el = document.createElement('div');
        el.className = 'data-stream-item';
        let col = '';
        for (let j = 0; j < 12; j++) col += chars[Math.floor(Math.random() * chars.length)] + '<br>';
        el.innerHTML = col;
        el.style.cssText = `
            left: ${Math.random() * 100}%;
            --fall-dur:   ${7 + Math.random() * 9}s;
            --fall-delay: ${Math.random() * 10}s;
            z-index: 0;
        `;
        sec.appendChild(el);
    }
})();

/* ============================================================
   7. FLOATING TECH LABELS in hero
   ============================================================ */
(function () {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    const labels = [
        'Python', 'HTML5', 'CSS3', 'JS', 'MySQL', 'Git',
        'JSON', 'C#', 'SQL', 'MVC', 'CRUD', 'API',
        'DOM', 'HTTP', 'async', 'class', 'def', 'const',
        'let', '{ }', '< />', 'npm', 'loop', 'null'
    ];
    labels.forEach(lbl => {
        const el = document.createElement('span');
        el.className = 'tech-float';
        el.textContent = lbl;
        el.style.cssText = `
            left:  ${4 + Math.random() * 92}%;
            top:   ${8 + Math.random() * 84}%;
            --dur:   ${9 + Math.random() * 9}s;
            --delay: ${Math.random() * 7}s;
        `;
        hero.appendChild(el);
    });
})();

/* ============================================================
   8. SECTION entrance line trigger
   ============================================================ */
document.querySelectorAll('.section').forEach(sec => {
    const obs = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
            sec.classList.add('line-active');
            obs.disconnect();
        }
    }, { threshold: 0.08 });
    obs.observe(sec);
});

/* ============================================================
   9. CIRCUIT OVERLAY for education section
   ============================================================ */
(function () {
    const edu = document.querySelector('.education');
    if (!edu) return;
    const overlay = document.createElement('div');
    overlay.className = 'circuit-overlay';
    edu.insertBefore(overlay, edu.firstChild);
})();

/* ============================================================
   10. PARALLAX on about image & hero content on scroll
   ============================================================ */
window.addEventListener('scroll', () => {
    const sy = window.scrollY;

    // Hero content subtle parallax
    const heroInner = document.querySelector('.hero-inner');
    if (heroInner) {
        heroInner.style.transform = `translateY(${sy * 0.18}px)`;
        heroInner.style.opacity   = Math.max(0, 1 - sy / 600);
    }

    // About image depth
    const imgBox = document.querySelector('.about-img-container');
    if (imgBox) {
        const rect = imgBox.closest('.section')?.getBoundingClientRect();
        if (rect && rect.top < window.innerHeight && rect.bottom > 0) {
            const pct  = (window.innerHeight - rect.top) / window.innerHeight;
            imgBox.style.transform = `translateY(${(pct - 0.5) * -24}px)`;
        }
    }
}, { passive: true });

/* ============================================================
   11. BINARY RAIN also in PROJECTS section
   ============================================================ */
(function () {
    const sec = document.querySelector('.projects');
    if (!sec) return;
    sec.style.overflow = 'hidden';
    const chars = '01{}<>[]//ADBCE';
    for (let i = 0; i < 14; i++) {
        const el = document.createElement('div');
        el.className = 'data-stream-item';
        let col = '';
        for (let j = 0; j < 10; j++) {
            col += chars[Math.floor(Math.random() * chars.length)] + '<br>';
        }
        el.innerHTML = col;
        el.style.cssText = `
            left: ${Math.random() * 100}%;
            --fall-dur:   ${9 + Math.random() * 8}s;
            --fall-delay: ${Math.random() * 12}s;
        `;
        sec.appendChild(el);
    }
})();

/* ============================================================
   12. FIRE CURSOR + EXPLOSION EFFECTS (Enhanced)
   ============================================================ */

// — FIRE TRAIL: 5 particles + lingering ember sparks —
let _lastFire = 0, _fireCount = 0;
document.addEventListener('mousemove', function (e) {
    const now = Date.now();
    if (now - _lastFire < 18) return;
    _lastFire = now;
    _fireCount++;

    for (let i = 0; i < 1; i++) {
        const p    = document.createElement('div');
        const hue  = 10 + Math.random() * 50;
        const size = 3 + Math.random() * 6;
        const life = 180 + Math.random() * 200;
        const vx   = ((Math.random() - 0.5) * 20).toFixed(1);
        const vy   = (-(10 + Math.random() * 30)).toFixed(1);

        p.className = 'fire-particle';
        p.style.cssText = `
            left:${e.clientX + (Math.random() - 0.5) * 16}px;
            top:${e.clientY}px;
            width:${size}px; height:${size}px;
            background:radial-gradient(circle,
                #fff 0%, hsl(${hue},100%,75%) 30%,
                hsl(${hue - 5},100%,50%) 60%, transparent 100%);
            --vx:${vx}px; --vy:${vy}px;
            animation-duration:${life}ms;
        `;
        document.body.appendChild(p);
        setTimeout(() => p.remove(), life + 50);
    }

    // Lingering ember spark removed as requested by user
    if (false) {
        const ember = document.createElement('div');
        const eSize = 2 + Math.random() * 5;
        const eLife = 700 + Math.random() * 1200;
        ember.className = 'ember-spark';
        ember.style.cssText = `
            left:${e.clientX + (Math.random() - 0.5) * 20}px;
            top:${e.clientY - Math.random() * 10}px;
            width:${eSize}px; height:${eSize}px;
            animation-duration:${eLife}ms;
        `;
        document.body.appendChild(ember);
        setTimeout(() => ember.remove(), eLife + 50);
    }
});

// — CLICK EXPLOSION: flash + 3 shockwaves + 36 burst particles —
document.addEventListener('click', function (e) {
    // Center flash
    const flash = document.createElement('div');
    flash.className = 'click-flash';
    flash.style.cssText = `left:${e.clientX}px; top:${e.clientY}px;`;
    document.body.appendChild(flash);
    setTimeout(() => flash.remove(), 400);

    // 3 Shockwave rings
    for (let s = 0; s < 3; s++) {
        const ring = document.createElement('div');
        ring.className = 'click-shockwave';
        const hue = 45 - s * 15;
        ring.style.cssText = `left:${e.clientX}px; top:${e.clientY}px; animation-delay:${s * 0.1}s; border-color:hsl(${hue},100%,60%);`;
        document.body.appendChild(ring);
        setTimeout(() => ring.remove(), 900);
    }

    // 36 burst particles
    for (let i = 0; i < 36; i++) {
        const p     = document.createElement('div');
        const angle = (i / 36) * Math.PI * 2 + Math.random() * 0.25;
        const dist  = 50 + Math.random() * 110;
        const hue   = 10 + Math.random() * 50;
        const size  = 3 + Math.random() * 10;
        const life  = 0.4 + Math.random() * 0.55;

        p.className = 'click-particle';
        p.style.cssText = `
            left:${e.clientX}px; top:${e.clientY}px;
            width:${size}px; height:${size}px;
            background:radial-gradient(circle,
                #fff 0%, hsl(${hue},100%,70%) 45%, transparent 100%);
            --dx:${(Math.cos(angle) * dist).toFixed(1)}px;
            --dy:${(Math.sin(angle) * dist).toFixed(1)}px;
            animation-duration:${life}s;
        `;
        document.body.appendChild(p);
        setTimeout(() => p.remove(), (life + 0.1) * 1000);
    }
});

// — HERO GLOW ORBS: 3 floating blobs in the background —
(function () {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    const orbs = [
        { color: 'rgba(212,175,55,0.18)', dur: '12s',
          ox1: '-60%', oy1: '-55%', ox2: '-45%', oy2: '-65%', ox3: '-70%', oy3: '-45%' },
        { color: 'rgba(255,100,0,0.12)',  dur: '16s',
          ox1: '-20%', oy1: '-30%', ox2: '-10%', oy2: '-40%', ox3: '-25%', oy3: '-20%' },
        { color: 'rgba(212,175,55,0.1)',  dur: '20s',
          ox1: '-80%', oy1: '-70%', ox2: '-90%', oy2: '-55%', ox3: '-75%', oy3: '-80%' },
    ];
    orbs.forEach(o => {
        const el = document.createElement('div');
        el.className = 'hero-orb';
        el.style.cssText = `
            left:${o.ox1 === '-60%' ? '65%' : o.ox1 === '-20%' ? '25%' : '80%'};
            top: ${o.oy1 === '-55%' ? '55%' : o.oy1 === '-30%' ? '35%' : '70%'};
            --orb-color:${o.color};
            --orb-dur:${o.dur};
            --ox1:${o.ox1}; --oy1:${o.oy1};
            --ox2:${o.ox2}; --oy2:${o.oy2};
            --ox3:${o.ox3}; --oy3:${o.oy3};
        `;
        hero.appendChild(el);
    });
})();

/* ============================================================
   13. FLOATING EMBERS in dark background sections
   ============================================================ */
(function () {
    document.querySelectorAll('.hero, .education, .projects').forEach(sec => {
        sec.style.overflow = 'hidden';
        for (let i = 0; i < 15; i++) {
            const ember = document.createElement('div');
            ember.className = 'bg-ember';
            ember.style.cssText = `
                left: ${Math.random() * 100}%;
                --ember-dur: ${6 + Math.random() * 10}s;
                --ember-delay: ${Math.random() * 8}s;
                --ember-x: ${(Math.random() - 0.5) * 60}px;
            `;
            sec.appendChild(ember);
        }
    });
})();

/* ============================================================
   CONTACT FORM with success animation
   ============================================================ */
document.getElementById('contactForm')?.addEventListener('submit', async function (e) {
    e.preventDefault();
    const btn   = document.getElementById('submitBtn');
    const label = document.getElementById('btnLabel');

    btn.disabled = true;
    label.textContent = 'Enviando...';

    await new Promise(r => setTimeout(r, 1600));

    label.textContent = '¡Mensaje enviado! ✓';
    btn.style.background = 'linear-gradient(135deg, #4ade80, #22c55e)';

    setTimeout(() => {
        label.textContent = 'Enviar mensaje';
        btn.style.background = '';
        btn.disabled = false;
        this.reset();
    }, 3200);
});

/* ============================================================
   EASTER EGG: HACK MODE & MINIGAME
   ============================================================ */
function startHackMode() {
    let gameWrap = document.getElementById('gameOverlay');
    if (!gameWrap) {
        gameWrap = document.createElement('div');
        gameWrap.id = 'gameOverlay';
        gameWrap.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.95);z-index:10000;display:flex;flex-direction:column;align-items:center;justify-content:center;color:var(--gold);font-family:monospace;';
        
        gameWrap.innerHTML = `
            <h2 style="margin-bottom:20px; font-size:1.5rem; text-transform:uppercase; letter-spacing:4px; text-shadow:0 0 10px var(--gold);">SISTEMA COMPROMETIDO</h2>
            <p style="margin-bottom:15px; color:#4ade80;">Presiona <span style="background:#4ade80;color:#000;padding:2px 8px;border-radius:4px;">ESPACIO</span> para saltar</p>
            <canvas id="gameCanvas" width="600" height="200" style="border:2px solid var(--gold); border-radius:8px; box-shadow:0 0 20px rgba(212,175,55,0.2); background:#04040a; max-width:90vw;"></canvas>
            <button id="closeGameBtn" style="margin-top:30px; padding:10px 24px; background:transparent; color:var(--text); border:1px solid var(--border); border-radius:50px; cursor:none; font-family:inherit; transition:0.3s;" onmouseover="this.style.borderColor='var(--gold)';this.style.color='var(--gold)'" onmouseout="this.style.borderColor='var(--border)';this.style.color='var(--text)'">CERRAR SESIÓN</button>
        `;
        document.body.appendChild(gameWrap);
        
        document.getElementById('closeGameBtn').addEventListener('click', () => {
            gameWrap.style.display = 'none';
        });

        const cvs = document.getElementById('gameCanvas');
        const ctx = cvs.getContext('2d');
        
        let player = { x: 50, y: 150, w: 20, h: 20, vy: 0, gravity: 0.6, jump: -10, grounded: true };
        let obstacles = [];
        let frame = 0;
        let score = 0;
        let isGameOver = false;

        function resetGame() {
            player.y = 150; player.vy = 0; player.grounded = true;
            obstacles = [];
            frame = 0;
            score = 0;
            isGameOver = false;
        }

        window.addEventListener('keydown', e => {
            if (e.code === 'Space' && gameWrap.style.display !== 'none') {
                e.preventDefault();
                if (isGameOver) resetGame();
                else if (player.grounded) {
                    player.vy = player.jump;
                    player.grounded = false;
                    if(typeof playBeep === 'function') playBeep();
                }
            }
        });

        function loop() {
            if (gameWrap.style.display === 'none') {
                requestAnimationFrame(loop);
                return;
            }
            
            ctx.clearRect(0,0,cvs.width,cvs.height);
            
            if (!isGameOver) {
                player.vy += player.gravity;
                player.y += player.vy;
                if (player.y >= 180 - player.h) {
                    player.y = 180 - player.h;
                    player.vy = 0;
                    player.grounded = true;
                }
                
                if (frame % 90 === 0) {
                    obstacles.push({ x: cvs.width, y: 180 - 30, w: 15, h: 30, speed: 5 + Math.random()*3 });
                }
                
                for (let i = obstacles.length - 1; i >= 0; i--) {
                    let obs = obstacles[i];
                    obs.x -= obs.speed;
                    
                    if (player.x < obs.x + obs.w && player.x + player.w > obs.x &&
                        player.y < obs.y + obs.h && player.y + player.h > obs.y) {
                        isGameOver = true;
                    }
                    
                    if (obs.x + obs.w < 0) {
                        obstacles.splice(i, 1);
                        score++;
                    }
                }
                frame++;
            }
            
            ctx.fillStyle = 'rgba(212,175,55,0.3)';
            ctx.fillRect(0, 180, cvs.width, 20);
            
            ctx.fillStyle = '#4ade80';
            ctx.shadowColor = '#4ade80'; ctx.shadowBlur = 10;
            ctx.fillRect(player.x, player.y, player.w, player.h);
            
            ctx.fillStyle = '#ff4757';
            ctx.shadowColor = '#ff4757'; ctx.shadowBlur = 10;
            obstacles.forEach(o => ctx.fillRect(o.x, o.y, o.w, o.h));
            
            ctx.shadowBlur = 0;
            ctx.fillStyle = 'var(--gold)';
            ctx.font = '16px monospace';
            ctx.fillText('SCORE: ' + score, 20, 30);
            
            if (isGameOver) {
                ctx.fillStyle = 'rgba(0,0,0,0.7)';
                ctx.fillRect(0,0,cvs.width,cvs.height);
                ctx.fillStyle = 'var(--gold)';
                ctx.font = '24px monospace';
                ctx.textAlign = 'center';
                ctx.fillText('SISTEMA CAÍDO - Presiona ESPACIO', cvs.width/2, cvs.height/2);
                ctx.textAlign = 'left';
            }
            
            requestAnimationFrame(loop);
        }
        
        if(typeof playPowerUp === 'function') playPowerUp();
        loop();
    } else {
        gameWrap.style.display = 'flex';
        if(typeof playPowerUp === 'function') playPowerUp();
    }
}

(function() {

    // 2. Minigame UI
    const btn = document.getElementById('hackBtn');
    const input = document.getElementById('hackInput');
    const errorMsg = document.getElementById('hackError');
    if (!btn || !input) return;

    function triggerHack() {
        const val = input.value.trim().toLowerCase();
        if (val === 'hack') {
            errorMsg.style.opacity = '0';
            input.value = '';
            startHackMode();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            errorMsg.textContent = 'ERROR: Acceso denegado.';
            errorMsg.style.opacity = '1';
            input.value = '';
            setTimeout(() => { errorMsg.style.opacity = '0'; }, 3000);
        }
    }

    btn.addEventListener('click', triggerHack);
    input.addEventListener('keypress', e => {
        if (e.key === 'Enter') triggerHack();
    });
})();
