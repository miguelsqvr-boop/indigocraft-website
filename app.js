// ═══════════════════════════════════════════════════════════════
//  DESMOS ACADEMY — APP ENGINE
// ═══════════════════════════════════════════════════════════════

(function () {
  'use strict';

  // ─── State ───────────────────────────────────────────────────
  const state = {
    currentLesson: 0,    // index into LESSONS
    currentStep:   0,    // index into lesson.steps
    xp:            0,
    completedLessons: new Set(),
    quizAnswered:  false,
  };

  // ─── Desmos calc instance ─────────────────────────────────────
  let calc = null;

  // ─── DOM refs ─────────────────────────────────────────────────
  const $ = id => document.getElementById(id);

  const splash         = $('splash');
  const lessonScreen   = $('lesson-screen');
  const gradScreen     = $('grad-screen');
  const startBtn       = $('start-btn');
  const backBtn        = $('back-btn');
  const lessonTitle    = $('lesson-title');
  const lessonSubtitle = $('lesson-subtitle');
  const lessonNumber   = $('lesson-number');
  const lessonBread    = $('lesson-breadcrumb');
  const stepTabs       = $('step-tabs');
  const stepContent    = $('step-content');
  const stepActions    = $('step-actions');
  const calcHintEl     = $('calc-hint');
  const calcLabelEl    = $('calc-label');
  const xpBadge        = $('xp-badge');
  const progressFill   = $('global-progress-fill');
  const progOverview   = $('progress-overview');
  const quizModal      = $('quiz-modal');
  const quizEmoji      = $('quiz-emoji');
  const quizQuestion   = $('quiz-question');
  const quizOptions    = $('quiz-options');
  const quizFeedback   = $('quiz-feedback');
  const celebModal     = $('celebrate-modal');
  const celebIcon      = $('celebrate-icon');
  const celebTitle     = $('celebrate-title');
  const celebMsg       = $('celebrate-msg');
  const xpEarned       = $('xp-earned');
  const celebNext      = $('celebrate-next');
  const restartBtn     = $('restart-btn');

  // ─── Persistence ─────────────────────────────────────────────
  function saveState() {
    localStorage.setItem('desmosAcademy', JSON.stringify({
      xp:               state.xp,
      completedLessons: [...state.completedLessons],
      currentLesson:    state.currentLesson
    }));
  }

  function loadState() {
    try {
      const raw = localStorage.getItem('desmosAcademy');
      if (!raw) return;
      const saved = JSON.parse(raw);
      state.xp               = saved.xp || 0;
      state.completedLessons = new Set(saved.completedLessons || []);
      state.currentLesson    = saved.currentLesson || 0;
    } catch (_) {}
  }

  // ─── Splash ───────────────────────────────────────────────────
  function renderSplash() {
    // Progress pips
    progOverview.innerHTML = LESSONS.map((l, i) => {
      const done    = state.completedLessons.has(i);
      const current = i === state.currentLesson && !done;
      const cls     = done ? 'done' : current ? 'current' : '';
      return `<div class="prog-pip ${cls}" title="${l.title}">${done ? '✓' : i + 1}</div>`;
    }).join('');

    // Button label
    const anyDone = state.completedLessons.size > 0;
    startBtn.textContent = anyDone ? 'Continue Learning →' : 'Start Learning →';
  }

  // ─── Desmos init ─────────────────────────────────────────────
  function initCalculator() {
    if (calc) { calc.destroy(); calc = null; }
    const el = $('calculator');
    calc = Desmos.GraphingCalculator(el, {
      expressions:        true,
      settingsMenu:       true,
      zoomButtons:        true,
      expressionsTopbar:  true,
      border:             false,
      lockViewport:       false,
      language:           'en',
      administerSecretFolders: false,
      images:             true,
      keypad:             false,
    });
    calc.updateSettings({ backgroundColor: '#0d0f1a' });
  }

  // ─── Load lesson into calculator ─────────────────────────────
  function loadLessonCalc(lesson) {
    calc.setBlank();
    const exprs = lesson.initialExpressions || [];
    exprs.forEach(expr => {
      if (expr.type === 'table') {
        calc.setExpression(expr);
      } else {
        calc.setExpression(expr);
      }
    });
    calc.setMathBounds({ left: -6, right: 6, bottom: -4, top: 4 });
  }

  // ─── Render lesson ────────────────────────────────────────────
  function renderLesson() {
    const lesson = LESSONS[state.currentLesson];
    const stepIdx = state.currentStep;
    const step    = lesson.steps[stepIdx];

    // Header
    lessonNumber.textContent   = `Lesson ${lesson.id} of ${LESSONS.length}`;
    lessonTitle.textContent    = lesson.title;
    lessonSubtitle.textContent = lesson.subtitle;
    lessonBread.textContent    = `${lesson.icon} ${lesson.title}`;
    calcHintEl.textContent     = lesson.calcHint || '';
    calcLabelEl.innerHTML      = `${lesson.icon || '📊'} ${lesson.title}`;

    // Progress bar
    const pct = ((state.completedLessons.size) / LESSONS.length) * 100;
    progressFill.style.width = pct + '%';

    // XP
    xpBadge.textContent = `⭐ ${state.xp} XP`;

    // Step tabs
    stepTabs.innerHTML = lesson.steps.map((s, i) => {
      const done    = i < stepIdx || (i === stepIdx && s.isQuiz && state.quizAnswered);
      const active  = i === stepIdx;
      return `<div class="step-tab ${active ? 'active' : ''} ${done ? 'done' : ''}" data-step="${i}">${s.label}</div>`;
    }).join('');

    stepTabs.querySelectorAll('.step-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        state.currentStep = +tab.dataset.step;
        state.quizAnswered = false;
        renderLesson();
      });
    });

    // Step content
    if (step.isQuiz) {
      stepContent.innerHTML = `
        <h3>${step.title}</h3>
        <p style="color: var(--muted); margin-bottom: 1rem;">Answer the question to complete this lesson.</p>
      `;
      stepActions.innerHTML = `<button class="btn-step btn-step-primary" id="take-quiz-btn">Take Quiz →</button>`;
      $('take-quiz-btn').addEventListener('click', () => openQuiz(lesson, step.quiz));
    } else {
      stepContent.innerHTML = `<h3>${step.title}</h3>${step.content}`;
      renderStepActions(lesson, stepIdx);
    }
  }

  function renderStepActions(lesson, stepIdx) {
    const isLast = stepIdx === lesson.steps.length - 1;
    const isFirst = stepIdx === 0;
    stepActions.innerHTML = '';

    if (!isFirst) {
      const prev = document.createElement('button');
      prev.className = 'btn-step btn-step-secondary';
      prev.textContent = '← Prev';
      prev.addEventListener('click', () => {
        state.currentStep--;
        state.quizAnswered = false;
        renderLesson();
      });
      stepActions.appendChild(prev);
    }

    const next = document.createElement('button');
    next.className = 'btn-step btn-step-primary';
    // If next step is quiz, say "Continue"
    const nextStep = lesson.steps[stepIdx + 1];
    next.textContent = isLast ? 'Complete Lesson 🎉' : nextStep && nextStep.isQuiz ? 'Continue →' : 'Next →';
    next.addEventListener('click', () => {
      if (isLast) {
        completeLesson(lesson);
      } else {
        state.currentStep++;
        state.quizAnswered = false;
        renderLesson();
      }
    });
    stepActions.appendChild(next);
  }

  // ─── Quiz ─────────────────────────────────────────────────────
  function openQuiz(lesson, quiz) {
    quizEmoji.textContent    = quiz.emoji;
    quizQuestion.textContent = quiz.question;
    quizFeedback.className   = 'quiz-feedback hidden';
    quizFeedback.textContent = '';

    quizOptions.innerHTML = quiz.options.map((opt, i) =>
      `<button class="quiz-opt" data-idx="${i}">${opt.text}</button>`
    ).join('');

    quizOptions.querySelectorAll('.quiz-opt').forEach(btn => {
      btn.addEventListener('click', () => handleQuizAnswer(btn, quiz, lesson));
    });

    quizModal.classList.remove('hidden');
  }

  function handleQuizAnswer(btn, quiz, lesson) {
    const idx = +btn.dataset.idx;
    const opt = quiz.options[idx];
    const allBtns = quizOptions.querySelectorAll('.quiz-opt');

    allBtns.forEach(b => b.style.pointerEvents = 'none');

    if (opt.correct) {
      btn.classList.add('correct');
      quizFeedback.textContent = '✅ ' + quiz.explanation;
      quizFeedback.className   = 'quiz-feedback success';
      state.quizAnswered = true;

      setTimeout(() => {
        quizModal.classList.add('hidden');
        completeLesson(lesson);
      }, 1800);
    } else {
      btn.classList.add('wrong');
      // Show correct
      allBtns.forEach(b => {
        if (quiz.options[+b.dataset.idx].correct) b.classList.add('correct');
      });
      quizFeedback.textContent = '❌ Not quite. ' + quiz.explanation;
      quizFeedback.className   = 'quiz-feedback error';

      setTimeout(() => {
        quizModal.classList.add('hidden');
        completeLesson(lesson);
      }, 2500);
    }
  }

  // ─── Lesson complete ──────────────────────────────────────────
  function completeLesson(lesson) {
    const alreadyDone = state.completedLessons.has(state.currentLesson);
    if (!alreadyDone) {
      state.xp += lesson.xp;
      state.completedLessons.add(state.currentLesson);
    }

    saveState();

    const allDone = state.completedLessons.size === LESSONS.length;

    celebIcon.textContent  = lesson.icon;
    celebTitle.textContent = alreadyDone ? 'Revisited!' : 'Lesson Complete!';
    celebMsg.textContent   = alreadyDone
      ? `You've revisited "${lesson.title}". Keep exploring!`
      : `You've mastered "${lesson.title}". Keep going!`;
    xpEarned.textContent   = alreadyDone ? 'Already earned XP' : `+${lesson.xp} XP earned!`;
    celebNext.textContent  = allDone ? 'See your results! 🏆' : 'Next Lesson →';

    celebNext.onclick = () => {
      celebModal.classList.add('hidden');
      if (allDone) {
        showGraduation();
      } else {
        // Go to next uncompleted lesson
        let next = state.currentLesson + 1;
        while (next < LESSONS.length && state.completedLessons.has(next)) next++;
        if (next >= LESSONS.length) {
          showGraduation();
        } else {
          state.currentLesson = next;
          state.currentStep   = 0;
          state.quizAnswered  = false;
          loadLessonCalc(LESSONS[next]);
          renderLesson();
          celebModal.classList.add('hidden');
        }
      }
    };

    celebModal.classList.remove('hidden');
    launchConfetti($('confetti-canvas'));
  }

  // ─── Graduation ───────────────────────────────────────────────
  function showGraduation() {
    lessonScreen.classList.remove('active');
    gradScreen.classList.add('active');
    gradScreen.classList.remove('hidden');

    $('grad-stats').innerHTML = `
      <div class="stat-pill"><div class="val">${state.completedLessons.size}</div><div class="lbl">Lessons</div></div>
      <div class="stat-pill"><div class="val">${state.xp}</div><div class="lbl">XP Earned</div></div>
      <div class="stat-pill"><div class="val">7</div><div class="lbl">Skills</div></div>
    `;

    launchConfetti($('grad-confetti'), 300);
  }

  // ─── Confetti ─────────────────────────────────────────────────
  function launchConfetti(canvas, count = 80) {
    if (!canvas) return;
    const ctx  = canvas.getContext('2d');
    const W    = canvas.offsetWidth || 460;
    const H    = canvas.offsetHeight || 500;
    canvas.width  = W;
    canvas.height = H;

    const colors = ['#4f6ef7','#8b5cf6','#10b981','#f59e0b','#ef4444','#06b6d4'];
    const particles = Array.from({ length: count }, () => ({
      x:  Math.random() * W,
      y:  Math.random() * H - H,
      r:  Math.random() * 6 + 3,
      d:  Math.random() * count,
      c:  colors[Math.floor(Math.random() * colors.length)],
      t:  Math.random() * Math.PI * 2,
      ts: (Math.random() - 0.5) * 0.1,
      vy: Math.random() * 3 + 2,
    }));

    let frame = 0;
    function draw() {
      ctx.clearRect(0, 0, W, H);
      particles.forEach(p => {
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.t);
        ctx.fillStyle = p.c;
        ctx.fillRect(-p.r / 2, -p.r / 2, p.r, p.r);
        ctx.restore();
        p.y  += p.vy;
        p.t  += p.ts;
        p.x  += Math.sin(p.d + frame / 20) * 1.5;
        if (p.y > H + 10) { p.y = -10; p.x = Math.random() * W; }
      });
      frame++;
      if (frame < 180) requestAnimationFrame(draw);
      else ctx.clearRect(0, 0, W, H);
    }
    draw();
  }

  // ─── Splash canvas animation ──────────────────────────────────
  function initSplashCanvas() {
    const canvas = $('splash-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    function resize() {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const equations = [
      t => ({ x: Math.cos(t), y: Math.sin(t) }),
      t => ({ x: Math.cos(3*t), y: Math.sin(2*t) }),
      t => ({ x: (1+Math.cos(t))*Math.cos(t), y: (1+Math.cos(t))*Math.sin(t) }),
      t => ({ x: Math.sin(5*t), y: Math.sin(4*t) }),
      t => ({ x: Math.cos(2*t)*Math.cos(t), y: Math.cos(2*t)*Math.sin(t) }),
    ];

    const curves = equations.map((fn, i) => ({
      fn,
      phase: 0,
      color: ['#4f6ef755','#8b5cf655','#10b98155','#f59e0b55','#06b6d455'][i],
      scale: 80 + i * 20,
      speed: 0.004 + i * 0.002,
      ox: 0, oy: 0,
    }));

    let t = 0;
    function drawFrame() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cx = canvas.width  / 2;
      const cy = canvas.height / 2;

      curves.forEach(c => {
        ctx.beginPath();
        for (let i = 0; i <= 400; i++) {
          const angle = (i / 400) * Math.PI * 2 * 3 + c.phase + t * c.speed * 100;
          const pt = c.fn(angle);
          const px = cx + pt.x * c.scale;
          const py = cy + pt.y * c.scale;
          i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
        }
        ctx.strokeStyle = c.color;
        ctx.lineWidth   = 1.5;
        ctx.stroke();
      });

      t++;
      requestAnimationFrame(drawFrame);
    }
    drawFrame();
  }

  // ─── Navigation ──────────────────────────────────────────────
  function showLesson(idx) {
    state.currentLesson = idx;
    state.currentStep   = 0;
    state.quizAnswered  = false;

    splash.classList.remove('active');
    lessonScreen.classList.add('active');

    loadLessonCalc(LESSONS[idx]);
    renderLesson();
  }

  function goBack() {
    lessonScreen.classList.remove('active');
    gradScreen.classList.remove('active');
    gradScreen.classList.add('hidden');
    splash.classList.add('active');
    renderSplash();
  }

  // ─── Bootstrap ───────────────────────────────────────────────
  function init() {
    loadState();
    renderSplash();
    initSplashCanvas();
    initCalculator();

    startBtn.addEventListener('click', () => {
      // Resume from first uncompleted lesson
      let target = 0;
      for (let i = 0; i < LESSONS.length; i++) {
        if (!state.completedLessons.has(i)) { target = i; break; }
        if (i === LESSONS.length - 1) target = LESSONS.length - 1;
      }
      showLesson(target);
    });

    backBtn.addEventListener('click', goBack);

    restartBtn.addEventListener('click', () => {
      state.xp = 0;
      state.completedLessons.clear();
      state.currentLesson = 0;
      state.currentStep   = 0;
      saveState();
      gradScreen.classList.remove('active');
      gradScreen.classList.add('hidden');
      splash.classList.add('active');
      renderSplash();
    });
  }

  document.addEventListener('DOMContentLoaded', init);
})();
