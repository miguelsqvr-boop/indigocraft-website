/* ═══════════════════════════════════════════════
   DESMOS ACADEMY — APP ENGINE
═══════════════════════════════════════════════ */
(function () {
  'use strict';

  // ── State ────────────────────────────────────
  const S = {
    lesson:    0,
    step:      0,
    xp:        0,
    done:      new Set(),
    quizDone:  false,
  };

  // ── DOM ──────────────────────────────────────
  const el = id => document.getElementById(id);

  const screens = {
    splash:  el('screen-splash'),
    lesson:  el('screen-lesson'),
    grad:    el('screen-grad'),
  };

  // ── Desmos instance ──────────────────────────
  let calc = null;

  // ─────────────────────────────────────────────
  // PERSISTENCE
  // ─────────────────────────────────────────────
  function save() {
    localStorage.setItem('da3', JSON.stringify({
      xp:     S.xp,
      done:   [...S.done],
      lesson: S.lesson,
    }));
  }

  function load() {
    try {
      const d = JSON.parse(localStorage.getItem('da3') || '{}');
      S.xp     = d.xp     || 0;
      S.done   = new Set(d.done   || []);
      S.lesson = d.lesson || 0;
    } catch (_) {}
  }

  // ─────────────────────────────────────────────
  // SCREEN MANAGEMENT
  // ─────────────────────────────────────────────
  function showScreen(name) {
    Object.entries(screens).forEach(([k, v]) => {
      v.classList.toggle('active',  k === name);
      v.classList.toggle('hidden',  k !== name);
    });
  }

  // ─────────────────────────────────────────────
  // SPLASH
  // ─────────────────────────────────────────────
  function renderSplash() {
    // Lesson map
    const map = el('lesson-map');
    map.innerHTML = LESSONS.map((L, i) => {
      const done    = S.done.has(i);
      const active  = i === nextIncomplete();
      return `
        <div class="lmap-node" data-i="${i}" title="${L.title}">
          <div class="lmap-pip ${done ? 'done' : active ? 'active' : ''}">${L.icon}</div>
          <div class="lmap-label">${L.title.split(' ').slice(0,2).join(' ')}</div>
        </div>`;
    }).join('');

    map.querySelectorAll('.lmap-node').forEach(n => {
      n.addEventListener('click', () => openLesson(+n.dataset.i));
    });

    // CTA
    const any = S.done.size > 0;
    el('cta-label').textContent  = any ? 'Continue' : 'Begin Journey';
    el('splash-meta').textContent = `${S.done.size}/${LESSONS.length} complete · ${S.xp} XP`;
  }

  function nextIncomplete() {
    for (let i = 0; i < LESSONS.length; i++) if (!S.done.has(i)) return i;
    return LESSONS.length - 1;
  }

  // ─────────────────────────────────────────────
  // BG CANVAS ANIMATION
  // ─────────────────────────────────────────────
  function initBg() {
    const cv  = el('bg-canvas');
    const ctx = cv.getContext('2d');
    const fns = [
      t => [Math.cos(t), Math.sin(t)],
      t => [Math.cos(3*t)*Math.cos(t), Math.cos(3*t)*Math.sin(t)],
      t => [Math.sin(3*t), Math.sin(2*t)],
      t => [(1+Math.cos(t))*Math.cos(t), (1+Math.cos(t))*Math.sin(t)],
      t => [Math.cos(2*t)*Math.cos(t), Math.cos(2*t)*Math.sin(t)],
    ];
    const colors = ['#6366f155','#a855f755','#22c55e44','#eab30844','#14b8a644'];

    function resize() { cv.width = innerWidth; cv.height = innerHeight; }
    resize();
    addEventListener('resize', resize);

    let frame = 0;
    (function draw() {
      ctx.clearRect(0, 0, cv.width, cv.height);
      const cx = cv.width/2, cy = cv.height/2;
      fns.forEach((fn, fi) => {
        const sc = Math.min(cx, cy) * (.35 + fi * .06);
        ctx.beginPath();
        for (let i = 0; i <= 500; i++) {
          const t   = (i/500)*Math.PI*6 + frame*0.004*(1+fi*.3);
          const [x,y] = fn(t);
          i === 0 ? ctx.moveTo(cx+x*sc, cy+y*sc) : ctx.lineTo(cx+x*sc, cy+y*sc);
        }
        ctx.strokeStyle = colors[fi];
        ctx.lineWidth   = 1.2;
        ctx.stroke();
      });
      frame++;
      requestAnimationFrame(draw);
    })();
  }

  // ─────────────────────────────────────────────
  // CALCULATOR
  // ─────────────────────────────────────────────
  function initCalc() {
    if (calc) { calc.destroy(); calc = null; }
    calc = Desmos.GraphingCalculator(el('calculator'), {
      expressions:       true,
      settingsMenu:      true,
      zoomButtons:       true,
      expressionsTopbar: true,
      border:            false,
      language:          'en',
    });
    calc.updateSettings({ backgroundColor: '#08090f' });
  }

  function loadCalc(lesson) {
    calc.setBlank();
    (lesson.initExprs || []).forEach(e => calc.setExpression(e));
    calc.setMathBounds({ left:-7, right:7, bottom:-5, top:5 });
  }

  // ─────────────────────────────────────────────
  // LESSON RENDERING
  // ─────────────────────────────────────────────
  function openLesson(idx) {
    S.lesson     = idx;
    S.step       = 0;
    S.quizDone   = false;
    showScreen('lesson');
    loadCalc(LESSONS[idx]);
    renderLesson();
  }

  function renderLesson() {
    const L   = LESSONS[S.lesson];
    const st  = L.steps[S.step];
    const pct = (S.done.size / LESSONS.length) * 100;

    // Topbar
    el('progress-fill').style.width = pct + '%';
    el('topbar-xp').textContent     = '⭐ ' + S.xp;

    // Panel header
    el('lesson-tag').textContent   = `Lesson ${L.id} of ${LESSONS.length}  ·  ${L.icon}`;
    el('lesson-title').textContent = L.title;
    el('lesson-sub').textContent   = L.sub;

    // Calc label
    el('calc-title').textContent = L.calcTitle || L.title;
    el('calc-footer').textContent = L.calcHint || '';

    // Step pills
    el('step-nav').innerHTML = L.steps.map((s, i) => {
      const done   = i < S.step || (i === S.step && S.quizDone);
      const active = i === S.step;
      return `<div class="step-pill ${active?'active':''} ${done?'done':''}" data-i="${i}">${s.label}</div>`;
    }).join('');
    el('step-nav').querySelectorAll('.step-pill').forEach(p =>
      p.addEventListener('click', () => { S.step = +p.dataset.i; S.quizDone = false; renderLesson(); })
    );

    // Content
    if (st.isQuiz) {
      renderQuizStep(L, st);
    } else {
      el('panel-content').innerHTML = `<h3>${st.title}</h3>${st.body}`;
      renderFooter(L);
    }
  }

  function renderQuizStep(L, st) {
    el('panel-content').innerHTML = `
      <h3>${st.title}</h3>
      <p>Answer the question below to complete this lesson and earn your XP.</p>
      <div class="challenge" style="margin-top:1rem">Click "Take Quiz" when you're ready.</div>
    `;
    el('panel-footer').innerHTML = '';
    const btn = document.createElement('button');
    btn.className   = 'btn-next';
    btn.textContent = '🧠 Take Quiz';
    btn.addEventListener('click', () => openQuiz(L, st.quiz));
    el('panel-footer').appendChild(btn);
  }

  function renderFooter(L) {
    const footer  = el('panel-footer');
    footer.innerHTML = '';
    const isFirst = S.step === 0;
    const isLast  = S.step === L.steps.length - 1;

    if (!isFirst) {
      const prev = document.createElement('button');
      prev.className   = 'btn-prev';
      prev.textContent = '←';
      prev.addEventListener('click', () => { S.step--; S.quizDone = false; renderLesson(); });
      footer.appendChild(prev);
    }

    const next = document.createElement('button');
    next.className = 'btn-next';
    const nextSt   = L.steps[S.step + 1];
    next.textContent = isLast
      ? 'Finish Lesson 🎉'
      : nextSt?.isQuiz ? 'Continue →' : 'Next →';
    next.addEventListener('click', () => {
      if (isLast) finishLesson(L);
      else { S.step++; S.quizDone = false; renderLesson(); }
    });
    footer.appendChild(next);
  }

  // ─────────────────────────────────────────────
  // QUIZ
  // ─────────────────────────────────────────────
  function openQuiz(L, quiz) {
    const ov = el('overlay-quiz');
    el('quiz-emo').textContent = quiz.emoji;
    el('quiz-q').textContent   = quiz.question;
    el('quiz-fb').className    = 'quiz-fb hidden';

    el('quiz-opts').innerHTML = quiz.options.map((o, i) =>
      `<button class="quiz-opt" data-i="${i}">${o.text}</button>`
    ).join('');

    el('quiz-opts').querySelectorAll('.quiz-opt').forEach(b =>
      b.addEventListener('click', () => handleAnswer(b, L, quiz))
    );

    ov.classList.remove('hidden');
  }

  function handleAnswer(btn, L, quiz) {
    const i   = +btn.dataset.i;
    const ok  = quiz.options[i].correct;
    const all = el('quiz-opts').querySelectorAll('.quiz-opt');
    all.forEach(b => b.style.pointerEvents = 'none');

    btn.classList.add(ok ? 'correct' : 'wrong');
    if (!ok) all.forEach(b => { if (quiz.options[+b.dataset.i].correct) b.classList.add('correct'); });

    const fb = el('quiz-fb');
    fb.textContent = (ok ? '✅ ' : '❌ ') + quiz.explain;
    fb.className   = 'quiz-fb ' + (ok ? 'ok' : 'bad');

    setTimeout(() => {
      el('overlay-quiz').classList.add('hidden');
      S.quizDone = true;
      finishLesson(L);
    }, ok ? 1800 : 2600);
  }

  // ─────────────────────────────────────────────
  // LESSON COMPLETE
  // ─────────────────────────────────────────────
  function finishLesson(L) {
    const idx      = S.lesson;
    const already  = S.done.has(idx);
    if (!already) { S.xp += L.xp; S.done.add(idx); }
    save();

    const allDone = S.done.size === LESSONS.length;

    // Win modal
    el('win-icon').textContent  = L.icon;
    el('win-title').textContent = already ? 'Revisited!' : 'Lesson Complete!';
    el('win-msg').textContent   = already
      ? `You revisited "${L.title}".`
      : `"${L.title}" is now in your toolkit.`;
    el('win-xp').textContent    = already ? 'XP already earned' : `+${L.xp} XP`;
    el('btn-next').textContent  = allDone ? 'See Results 🏆' : 'Next Lesson →';

    el('btn-next').onclick = () => {
      el('overlay-win').classList.add('hidden');
      if (allDone) {
        showGrad();
      } else {
        const next = nextIncomplete();
        openLesson(next);
      }
    };

    el('overlay-win').classList.remove('hidden');
    confetti(el('win-canvas'), 70);
  }

  // ─────────────────────────────────────────────
  // GRADUATION
  // ─────────────────────────────────────────────
  function showGrad() {
    showScreen('grad');
    el('grad-pills').innerHTML = `
      <div class="gpill"><div class="v">${S.done.size}</div><div class="l">Lessons</div></div>
      <div class="gpill"><div class="v">${S.xp}</div><div class="l">XP Earned</div></div>
      <div class="gpill"><div class="v">7</div><div class="l">Skills</div></div>
    `;
    confetti(el('grad-canvas'), 250);
  }

  // ─────────────────────────────────────────────
  // CONFETTI
  // ─────────────────────────────────────────────
  function confetti(cv, n) {
    if (!cv) return;
    const ctx = cv.getContext('2d');
    cv.width  = cv.offsetWidth  || 460;
    cv.height = cv.offsetHeight || 500;
    const cols = ['#6366f1','#a855f7','#22c55e','#eab308','#ef4444','#14b8a6','#f97316'];
    const ps   = Array.from({length:n}, () => ({
      x:  Math.random() * cv.width,
      y:  Math.random() * cv.height - cv.height,
      r:  Math.random() * 7 + 3,
      c:  cols[Math.floor(Math.random()*cols.length)],
      vy: Math.random() * 3 + 2,
      vx: (Math.random() - .5) * 2,
      rot: Math.random() * Math.PI * 2,
      rs:  (Math.random() - .5) * .12,
    }));
    let f = 0;
    (function draw() {
      ctx.clearRect(0, 0, cv.width, cv.height);
      ps.forEach(p => {
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.c;
        ctx.fillRect(-p.r/2, -p.r/2, p.r, p.r * 1.6);
        ctx.restore();
        p.y   += p.vy;
        p.x   += p.vx;
        p.rot += p.rs;
        if (p.y > cv.height + 10) { p.y = -10; p.x = Math.random() * cv.width; }
      });
      f++;
      if (f < 220) requestAnimationFrame(draw);
      else ctx.clearRect(0, 0, cv.width, cv.height);
    })();
  }

  // ─────────────────────────────────────────────
  // BOOTSTRAP
  // ─────────────────────────────────────────────
  function init() {
    load();
    showScreen('splash');
    renderSplash();
    initBg();
    initCalc();

    el('btn-start').addEventListener('click', () => openLesson(nextIncomplete()));

    el('btn-back').addEventListener('click', () => {
      showScreen('splash');
      renderSplash();
    });

    el('btn-restart').addEventListener('click', () => {
      S.xp = 0; S.done.clear(); S.lesson = 0; S.step = 0;
      save();
      showScreen('splash');
      renderSplash();
    });
  }

  document.addEventListener('DOMContentLoaded', init);
})();
