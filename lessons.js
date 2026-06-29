/* ═══════════════════════════════════════════════
   DESMOS ACADEMY — LESSON DATA
   7 lessons, 4 steps each (3 content + 1 quiz)
═══════════════════════════════════════════════ */
window.LESSONS = [

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   L1 · FIRST GRAPH
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
{
  id: 1, icon: '📈', color: '#6366f1',
  title: 'Your First Graph',
  sub:   'Type an equation, see it live. No buttons to press.',
  calcHint: 'Type any equation in the expression panel on the left side of the calculator.',
  calcTitle: '📈 Basic Graphing',
  xp: 100,
  initExprs: [
    { id:'e1', latex:'y=x^{2}', color:'#6366f1' }
  ],
  steps: [
    {
      label: 'What is Desmos?',
      title: 'Meet Desmos',
      body: `
        <p>Desmos is a free, browser-based graphing calculator. You type an equation — it draws the graph <em>instantly</em>. No enter key needed.</p>
        <p>On the right you can already see <strong>y = x²</strong> — the classic parabola. Every point on that curve satisfies the equation.</p>
        <div class="tip">Desmos is used by millions of students, teachers, and mathematicians. Best of all — it's completely free.</div>
        <p>Click anywhere on the graph to read coordinates. Scroll to zoom. Drag to pan.</p>
      `
    },
    {
      label: 'Lines & Curves',
      title: 'Graph anything',
      body: `
        <p>Click an empty expression row in the calculator and start typing. Try each of these:</p>
        <div class="formula">y = 2x + 1</div>
        <div class="formula">y = sin(x)</div>
        <div class="formula">y = e^x</div>
        <p>Each one plots instantly in a new color. You can have dozens of graphs at once.</p>
        <div class="tip">Use <code>^</code> for exponents, <code>sqrt(x)</code> for √x, and <code>pi</code> for π.</div>
        <div class="challenge">Add <code>y = cos(x)</code> and <code>y = sin(x)</code> at the same time. Where do they intersect?</div>
      `
    },
    {
      label: 'Try It',
      title: 'Type a function',
      body: `
        <p>Try typing these in the Desmos panel on the right to get comfortable:</p>
        <ol>
          <li><code>y = x^3 - 3x</code> — cubic with two bumps</li>
          <li><code>y = 1/x</code> — hyperbola (has a hole at x=0!)</li>
          <li><code>y = |x|</code> — absolute value V-shape</li>
          <li><code>x^2 + y^2 = 25</code> — a circle! (no need for y=)</li>
        </ol>
        <p>Notice the last one: Desmos handles <strong>implicit equations</strong> too — not just y=f(x).</p>
        <div class="challenge">Graph the circle <code>x² + y² = 25</code>. What is its radius?</div>
      `
    },
    {
      label: 'Quiz',
      title: 'Quick check',
      isQuiz: true,
      quiz: {
        emoji: '🤔',
        question: 'What does the equation y = 4 graph in Desmos?',
        options: [
          { text: 'A horizontal line at y = 4', correct: true },
          { text: 'A parabola through (0, 4)', correct: false },
          { text: 'A vertical line at x = 4', correct: false },
          { text: 'A point at (4, 4)', correct: false }
        ],
        explain: 'y = 4 means every point where the y-value equals 4 — that\'s an infinite horizontal line.'
      }
    }
  ]
},

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   L2 · SLIDERS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
{
  id: 2, icon: '🎚️', color: '#a855f7',
  title: 'Sliders & Parameters',
  sub:   'Drag a number and watch everything update live.',
  calcHint: 'Drag the "a" slider in the expression list and watch the parabola transform.',
  calcTitle: '🎚️ Interactive Sliders',
  xp: 120,
  initExprs: [
    { id:'a',  latex:'a=1' },
    { id:'b',  latex:'b=0' },
    { id:'e1', latex:'y=ax^{2}+b', color:'#a855f7' }
  ],
  steps: [
    {
      label: 'What\'s a Slider?',
      title: 'Parameters come alive',
      body: `
        <p>A <strong>slider</strong> is a variable you can drag. Every graph that uses it updates in real time.</p>
        <p>On the right: <code>y = ax² + b</code>. Drag the <strong>a</strong> slider slowly from positive to negative. Watch the parabola flip!</p>
        <ul>
          <li><strong>a &gt; 0</strong> — opens upward</li>
          <li><strong>a &lt; 0</strong> — opens downward</li>
          <li><strong>|a| large</strong> — narrow</li>
          <li><strong>|a| small</strong> — wide</li>
        </ul>
        <div class="tip">Press the ▶ play button next to any slider to animate it automatically.</div>
      `
    },
    {
      label: 'Make Your Own',
      title: 'Create a slider',
      body: `
        <p>Creating a slider takes 2 seconds:</p>
        <ol>
          <li>Click a blank expression row</li>
          <li>Type <code>c = 3</code></li>
          <li>Desmos adds a slider for <code>c</code> automatically</li>
          <li>Now use <code>c</code> in any graph</li>
        </ol>
        <p>You can also click the slider to set <strong>min</strong>, <strong>max</strong>, and <strong>step</strong> — great for whole-number experiments.</p>
        <div class="challenge">Add slider <code>c</code> and graph <code>y = ax² + bx + c</code>. Find values of a, b, c that make the parabola touch the x-axis at exactly one point.</div>
      `
    },
    {
      label: 'Transformations',
      title: 'See transformations',
      body: `
        <p>Sliders reveal exactly how function transformations work. Build this with 4 sliders:</p>
        <div class="formula">y = a · sin(bx + c) + d</div>
        <ul>
          <li><strong>a</strong> — amplitude (wave height)</li>
          <li><strong>b</strong> — frequency (squish/stretch)</li>
          <li><strong>c</strong> — phase shift (left/right)</li>
          <li><strong>d</strong> — vertical shift (up/down)</li>
        </ul>
        <p>This is how textbooks explain trig transformations — but with sliders it takes seconds to feel intuitively.</p>
        <div class="tip">Animate <strong>c</strong> from 0 to 2π to watch a traveling wave.</div>
      `
    },
    {
      label: 'Quiz',
      title: 'Slider check',
      isQuiz: true,
      quiz: {
        emoji: '🎚️',
        question: 'In y = a·x², what happens when you set a = −2?',
        options: [
          { text: 'The parabola flips downward and gets narrower', correct: true },
          { text: 'The parabola shifts left by 2', correct: false },
          { text: 'The parabola disappears', correct: false },
          { text: 'Nothing changes', correct: false }
        ],
        explain: 'Correct! The negative sign flips the parabola, and the factor of 2 makes it narrower than y = x².'
      }
    }
  ]
},

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   L3 · TABLES & REGRESSION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
{
  id: 3, icon: '📊', color: '#14b8a6',
  title: 'Tables & Regression',
  sub:   'Plot real data, find the best-fit curve, uncover patterns.',
  calcHint: 'Click + → Table to add your own data. Try the regression expression already loaded.',
  calcTitle: '📊 Data & Regression',
  xp: 140,
  initExprs: [
    { id:'t1', type:'table', columns:[
      { latex:'x_1', values:['1','2','3','4','5','6','7'] },
      { latex:'y_1', values:['1.2','3.8','9.1','15.9','25.2','35.8','49.1'], color:'#14b8a6' }
    ]},
    { id:'r1', latex:'y_1\\sim ax_1^{2}+b', color:'#6366f1' }
  ],
  steps: [
    {
      label: 'Tables',
      title: 'Entering data',
      body: `
        <p>Desmos can work with real data, not just equations. Click <strong>+</strong> → <strong>Table</strong> to add one.</p>
        <p>On the right is a table with 7 data points — Desmos automatically plots them as a scatter plot.</p>
        <div class="tip">You can paste data from Excel or Google Sheets directly into a Desmos table. Works instantly.</div>
        <p>Each column in the table becomes a <strong>list</strong> you can use in expressions. The column headers (x₁, y₁) are the variable names.</p>
      `
    },
    {
      label: 'Regression',
      title: 'Best-fit curves',
      body: `
        <p>See the expression <code>y₁ ~ ax₁² + b</code>? The <strong>~</strong> tilde means <em>"fit this model to my data."</em></p>
        <p>Desmos finds the best values of <strong>a</strong> and <strong>b</strong> and shows you:</p>
        <ul>
          <li>The fitted values of each parameter</li>
          <li><strong>R²</strong> — how well the curve fits (1.0 = perfect)</li>
          <li>The curve drawn through the scatter plot</li>
        </ul>
        <div class="formula">y₁ ~ mx₁ + b  (linear)</div>
        <div class="formula">y₁ ~ ae^(bx₁) (exponential)</div>
        <div class="challenge">Add a linear regression <code>y₁ ~ mx₁ + b</code>. Compare R² with the quadratic fit. Which fits better?</div>
      `
    },
    {
      label: 'Lists',
      title: 'Lists are powerful',
      body: `
        <p>Every table column is a <strong>list</strong>. Lists let you do math on entire datasets at once:</p>
        <ul>
          <li><code>L = [1, 4, 9, 16]</code> — define a list</li>
          <li><code>L + 10</code> — adds 10 to every element</li>
          <li><code>L^2</code> — squares every element</li>
          <li><code>(L, sqrt(L))</code> — plots pairs as points!</li>
        </ul>
        <div class="formula">[1...10]</div>
        <p>This shorthand generates the list [1, 2, 3, …, 10] instantly. Use it to plot many points at once.</p>
        <div class="tip">Try <code>([1...20], sin([1...20]))</code> — plots 20 sine values as a scatter!</div>
      `
    },
    {
      label: 'Quiz',
      title: 'Data check',
      isQuiz: true,
      quiz: {
        emoji: '📊',
        question: 'In Desmos, what does the ~ (tilde) operator do in an expression like y₁ ~ ax₁² + b?',
        options: [
          { text: 'Runs a regression to find the best-fit values of a and b', correct: true },
          { text: 'Checks if the two sides are approximately equal', correct: false },
          { text: 'Creates a new column in the table', correct: false },
          { text: 'Plots the equation without the data', correct: false }
        ],
        explain: 'The tilde tells Desmos: "find the values of the free parameters (a, b) that minimize the error between the model and the data."'
      }
    }
  ]
},

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   L4 · PARAMETRIC CURVES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
{
  id: 4, icon: '🌀', color: '#22c55e',
  title: 'Parametric Curves',
  sub:   'Draw any shape imaginable by using time as a hidden variable.',
  calcHint: 'Type (cos(t), sin(t)) — note the parentheses. Desmos auto-detects parametric mode.',
  calcTitle: '🌀 Parametric Curves',
  xp: 160,
  initExprs: [
    { id:'e1', latex:'(\\cos(t), \\sin(t))', color:'#22c55e' },
    { id:'e2', latex:'(2\\cos(t), \\sin(t))', color:'#a855f7' },
    { id:'e3', latex:'(\\cos(3t)\\cos(t), \\cos(3t)\\sin(t))', color:'#f97316' }
  ],
  steps: [
    {
      label: 'What\'s Parametric?',
      title: 'A new way to draw',
      body: `
        <p>Normal functions say: <em>"given x, here's y."</em></p>
        <p>Parametric equations say: <em>"at time t, here's where we are: (x(t), y(t))."</em></p>
        <div class="formula">(cos(t), sin(t))</div>
        <p>As t goes 0 → 2π, the point traces a <strong>perfect circle</strong>. On the right you can already see this — plus an ellipse and a polar rose!</p>
        <div class="tip">In Desmos, just type <code>(expression, expression)</code> and it automatically graphs parametrically.</div>
      `
    },
    {
      label: 'Lissajous',
      title: 'Lissajous figures',
      body: `
        <p>Change the frequencies and the curves get wild. These are called <strong>Lissajous figures</strong>:</p>
        <div class="formula">(sin(3t), sin(2t))</div>
        <div class="formula">(sin(5t), sin(4t))</div>
        <p>The shape depends entirely on the <strong>ratio</strong> of the two frequencies. They were historically used to tune oscilloscopes.</p>
        <div class="challenge">Try <code>(sin(3t), sin(2t))</code>. Then try <code>(sin(4t), sin(3t))</code>. Count the loops — what pattern emerges?</div>
        <div class="tip">Add a slider <code>n</code> and graph <code>(sin(nt), sin(2t))</code>. Drag <strong>n</strong> slowly for a visual treat.</div>
      `
    },
    {
      label: 'Domain & Art',
      title: 'Domain & beautiful shapes',
      body: `
        <p>You can restrict how much of a parametric curve is drawn:</p>
        <div class="formula">(cos(t), sin(t)) {0 ≤ t ≤ π}</div>
        <p>This draws only the top semicircle. Try these famous curves:</p>
        <ul>
          <li><strong>Spiral:</strong> <code>(t·cos(t), t·sin(t))</code></li>
          <li><strong>Butterfly:</strong> <code>(sin(t)·(e^cos(t) − 2cos(4t)), cos(t)·(e^cos(t) − 2cos(4t)))</code></li>
          <li><strong>Heart:</strong> <code>(16sin(t)³, 13cos(t)−5cos(2t)−2cos(3t)−cos(4t))</code></li>
        </ul>
        <div class="challenge">Draw the heart! Paste the equation above into Desmos.</div>
      `
    },
    {
      label: 'Quiz',
      title: 'Parametric check',
      isQuiz: true,
      quiz: {
        emoji: '🌀',
        question: 'What shape does (cos(t), sin(t)) trace as t runs from 0 to 2π?',
        options: [
          { text: 'A unit circle', correct: true },
          { text: 'A parabola opening right', correct: false },
          { text: 'A straight diagonal line', correct: false },
          { text: 'A figure-eight', correct: false }
        ],
        explain: 'Because cos²(t) + sin²(t) = 1 always, every point satisfies x² + y² = 1 — that\'s a unit circle.'
      }
    }
  ]
},

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   L5 · POLAR GRAPHS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
{
  id: 5, icon: '🌹', color: '#eab308',
  title: 'Polar Graphs',
  sub:   'Roses, spirals, and the cardioid — angle-based beauty.',
  calcHint: 'Type r = ... to graph in polar. Use "theta" for θ.',
  calcTitle: '🌹 Polar Graphs',
  xp: 160,
  initExprs: [
    { id:'e1', latex:'r=1+\\cos(\\theta)', color:'#eab308' },
    { id:'e2', latex:'r=\\cos(3\\theta)', color:'#ec4899' }
  ],
  steps: [
    {
      label: 'Polar Coords',
      title: 'Distance + angle',
      body: `
        <p>Instead of (x, y), polar coordinates describe a point by:</p>
        <ul>
          <li><strong>r</strong> — distance from the origin</li>
          <li><strong>θ</strong> — angle from the positive x-axis</li>
        </ul>
        <p>In Desmos, write <code>r = ...</code> and it automatically switches to polar mode. On the right you can see the <strong>cardioid</strong> (<code>r = 1 + cos θ</code>) and a 3-petal rose.</p>
        <div class="tip">Desmos detects polar mode automatically — no settings to change. Just write r = something.</div>
      `
    },
    {
      label: 'Roses',
      title: 'Rose curves',
      body: `
        <p>Rose curves follow a simple rule:</p>
        <div class="formula">r = cos(nθ)</div>
        <ul>
          <li><strong>n odd</strong> → n petals</li>
          <li><strong>n even</strong> → 2n petals</li>
        </ul>
        <p>Examples:</p>
        <ul>
          <li><code>r = cos(2θ)</code> → 4 petals</li>
          <li><code>r = cos(3θ)</code> → 3 petals</li>
          <li><code>r = cos(5θ)</code> → 5 petals</li>
          <li><code>r = cos(6θ)</code> → 12 petals</li>
        </ul>
        <div class="challenge">Predict how many petals <code>r = cos(7θ)</code> has. Then graph it!</div>
      `
    },
    {
      label: 'Spirals & More',
      title: 'Spirals and exotic curves',
      body: `
        <p>Some stunning polar curves to explore:</p>
        <ul>
          <li><strong>Archimedean spiral:</strong> <code>r = θ/(2π)</code></li>
          <li><strong>Limaçon with loop:</strong> <code>r = 1 + 2sin(θ)</code></li>
          <li><strong>Lemniscate:</strong> <code>r² = cos(2θ)</code></li>
          <li><strong>Fermat spiral:</strong> <code>r = sqrt(θ)</code></li>
        </ul>
        <p>Add a slider <code>n</code> and graph <code>r = cos(nθ)</code>. Press ▶ on the slider and watch the petals bloom and un-bloom.</p>
        <div class="tip">You can mix polar and Cartesian expressions in the same Desmos graph!</div>
      `
    },
    {
      label: 'Quiz',
      title: 'Polar check',
      isQuiz: true,
      quiz: {
        emoji: '🌹',
        question: 'How many petals does r = cos(4θ) produce?',
        options: [
          { text: '8 petals', correct: true },
          { text: '4 petals', correct: false },
          { text: '2 petals', correct: false },
          { text: '12 petals', correct: false }
        ],
        explain: 'When n is even, r = cos(nθ) produces 2n petals. n = 4 → 8 petals.'
      }
    }
  ]
},

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   L6 · PIECEWISE & ART
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
{
  id: 6, icon: '🎨', color: '#ef4444',
  title: 'Piecewise Functions & Desmos Art',
  sub:   'Use domain restrictions to sculpt curves into pictures.',
  calcHint: 'Add {x > 0} after any expression to restrict where it draws.',
  calcTitle: '🎨 Piecewise & Art',
  xp: 180,
  initExprs: [
    { id:'e1', latex:'x^{2}+y^{2}=36', color:'#ef4444' },
    { id:'e2', latex:'(x+2)^{2}+(y-2)^{2}=1', color:'#1e1e2e' },
    { id:'e3', latex:'(x-2)^{2}+(y-2)^{2}=1', color:'#1e1e2e' },
    { id:'e4', latex:'-\\sqrt{4-x^{2}}-1\\left\\{-2\\le x\\le2\\right\\}', color:'#ef4444' },
    { id:'e5', latex:'y=2.5\\left\\{-0.5\\le x\\le0.5\\right\\}', color:'#ef4444' }
  ],
  steps: [
    {
      label: 'Domain Restrictions',
      title: 'Curly brace magic',
      body: `
        <p>Add curly braces after any expression to restrict where it draws:</p>
        <div class="formula">y = x²  {x > 0}</div>
        <p>This only draws the right half of the parabola. Combine conditions:</p>
        <div class="formula">y = sin(x)  {0 ≤ x ≤ 2π}</div>
        <p>On the right is a smiley face built entirely from circles and restricted curves. Every piece is just an equation with curly braces.</p>
        <div class="tip">You can restrict both x and y: <code>y = x {x > 0} {y < 3}</code></div>
      `
    },
    {
      label: 'Piecewise',
      title: 'Piecewise functions',
      body: `
        <p>A piecewise function uses different formulas for different domains. Desmos syntax:</p>
        <div class="formula">y = {x < 0: −x, x}</div>
        <p>That's the absolute value! The format is:</p>
        <div class="formula">{condition: value_if_true, value_if_false}</div>
        <p>Chain multiple pieces:</p>
        <div class="formula">y = {x < −2: x², −2 ≤ x ≤ 2: 1, x²}</div>
        <div class="challenge">Build a square wave: <code>y = {sin(x) > 0: 1, -1}</code>. Try it!</div>
      `
    },
    {
      label: 'Math Art',
      title: 'Art with equations',
      body: `
        <p>Desmos has an active art community. People build portraits, logos, and detailed scenes using only equations.</p>
        <p>Pro techniques:</p>
        <ul>
          <li><strong>Implicit curves</strong> — <code>x²+y²=r²</code> gives full creative control</li>
          <li><strong>Inequalities</strong> — <code>y < x²</code> fills a region with color</li>
          <li><strong>Images</strong> — import a photo as a background, trace it with equations</li>
          <li><strong>Folders</strong> — organize complex art into collapsible groups</li>
        </ul>
        <div class="challenge">Modify the smiley face on the right. Add eyebrows, hair, or a hat using restricted curves.</div>
        <div class="tip">Search "Desmos art" online to see what's possible. Some pieces have thousands of equations!</div>
      `
    },
    {
      label: 'Quiz',
      title: 'Art check',
      isQuiz: true,
      quiz: {
        emoji: '🎨',
        question: 'What does adding {x > 0} after a Desmos expression do?',
        options: [
          { text: 'Only draws the graph where x is positive', correct: true },
          { text: 'Shifts the graph right by 0 units', correct: false },
          { text: 'Creates a new variable x with value 0', correct: false },
          { text: 'Evaluates the function only at x = 0', correct: false }
        ],
        explain: 'Curly braces are domain/range restrictions — they filter which parts of the graph actually render.'
      }
    }
  ]
},

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   L7 · ADVANCED
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
{
  id: 7, icon: '🚀', color: '#f97316',
  title: 'Advanced: Functions, Notes & Sharing',
  sub:   'Define reusable functions, organize your work, and share with the world.',
  calcHint: 'Try calling f(a) where a is a slider to evaluate your function interactively.',
  calcTitle: '🚀 Advanced Features',
  xp: 200,
  initExprs: [
    { id:'k',  latex:'k=1' },
    { id:'f1', latex:'f(x)=\\frac{\\sin(kx)}{x}', color:'#f97316' },
    { id:'f2', latex:'g(x)=f(x)-f(-x)', color:'#a855f7' },
    { id:'f3', latex:'h(x)=f(x)+f(x+\\pi/k)', color:'#14b8a6' }
  ],
  steps: [
    {
      label: 'Custom Functions',
      title: 'Define your own functions',
      body: `
        <p>You can define reusable functions just like in real math:</p>
        <div class="formula">f(x) = sin(x) / x</div>
        <p>On the right: <code>f(x)</code> is defined with slider <code>k</code>, then <code>g</code> and <code>h</code> are built on top of it. Drag <strong>k</strong> and all three update.</p>
        <div class="tip">Functions can take multiple inputs: <code>dist(a,b) = sqrt(a²+b²)</code></div>
        <p>You can also evaluate functions at specific values: <code>f(3)</code>, <code>f(pi)</code>, or even <code>f(a)</code> with a slider.</p>
      `
    },
    {
      label: 'Folders & Notes',
      title: 'Stay organized',
      body: `
        <p>As projects grow complex, organization is essential. Desmos gives you:</p>
        <ul>
          <li><strong>Folders</strong> — click + → Folder. Group expressions, collapse with one click.</li>
          <li><strong>Notes</strong> — click + → Note. Add explanatory text between expressions.</li>
          <li><strong>Images</strong> — import backgrounds for art projects.</li>
        </ul>
        <p>Pro workflow:</p>
        <ol>
          <li>Keep sliders/settings in a folder at the top</li>
          <li>Use notes as section headings</li>
          <li>Toggle a whole folder visible/hidden at once</li>
        </ol>
        <div class="tip">You can hide individual expressions by clicking the colored dot to the left of each one.</div>
      `
    },
    {
      label: 'Share & Beyond',
      title: 'Share your work',
      body: `
        <p>Sharing in Desmos is one click:</p>
        <ul>
          <li><strong>Share link</strong> — click ↗ for a URL anyone can open</li>
          <li><strong>Embed</strong> — iframe code for your own website</li>
          <li><strong>PNG export</strong> — download a high-res image</li>
          <li><strong>Activity Builder</strong> — turn your graph into an interactive student lesson</li>
        </ul>
        <p>Beyond the graphing calculator, Desmos also offers:</p>
        <ul>
          <li>🔢 <strong>Scientific Calculator</strong></li>
          <li>📐 <strong>Geometry Tool</strong></li>
          <li>🌐 <strong>3D Calculator</strong> (at desmos.com/3d)</li>
        </ul>
        <div class="challenge">Build a graph you're proud of and share the link with someone!</div>
      `
    },
    {
      label: 'Final Quiz',
      title: 'Grand finale',
      isQuiz: true,
      quiz: {
        emoji: '🚀',
        question: 'If you define f(x) = x³ − x in Desmos, what does f(2) equal?',
        options: [
          { text: '6', correct: true },
          { text: '8', correct: false },
          { text: '2', correct: false },
          { text: 'f(2) cannot be evaluated in Desmos', correct: false }
        ],
        explain: 'f(2) = 2³ − 2 = 8 − 2 = 6. You can type f(2) directly into a Desmos expression and it evaluates to 6!'
      }
    }
  ]
}

]; // end LESSONS
