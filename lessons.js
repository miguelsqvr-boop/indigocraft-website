// ═══════════════════════════════════════════════════════════════
//  DESMOS ACADEMY — LESSON DATA
// ═══════════════════════════════════════════════════════════════

window.LESSONS = [
  // ───────────────────────────────────────────
  // LESSON 1: BASIC GRAPHING
  // ───────────────────────────────────────────
  {
    id: 1,
    title: "Your First Graph",
    subtitle: "Plot functions, meet the calculator interface, and see math come alive.",
    color: "#4f6ef7",
    icon: "📈",
    xp: 100,
    calcHint: "Type expressions in the left panel of Desmos to graph them instantly.",
    initialExpressions: [
      { id: "e1", latex: "y = x^2", color: "#4f6ef7" }
    ],
    steps: [
      {
        label: "Intro",
        title: "Welcome to Desmos!",
        content: `
          <p>Desmos is a free, browser-based graphing calculator that turns equations into beautiful, interactive graphs in real time.</p>
          <p>On the right you can already see a classic: <strong>y = x²</strong> — a parabola. Every point on that curve satisfies that equation.</p>
          <div class="tip-box">Desmos updates your graph <em>instantly</em> as you type. No pressing Enter, no waiting.</div>
          <p>In this lesson you'll learn how to type expressions and understand what you're seeing.</p>
        `
      },
      {
        label: "Add Lines",
        title: "Graphing lines",
        content: `
          <p>The simplest graphs are <strong>lines</strong>. In Desmos, click an empty expression box and type:</p>
          <div class="math-block">y = 2x + 1</div>
          <p>You'll see a straight line with slope 2 and y-intercept 1 appear immediately.</p>
          <ol>
            <li>Try <code>y = x</code> — a diagonal line through the origin.</li>
            <li>Try <code>y = -3x + 5</code> — a steeper, downward slope.</li>
            <li>Try <code>y = 4</code> — a horizontal line!</li>
          </ol>
          <div class="challenge-box">Add <code>y = 2x + 1</code> and <code>y = -2x + 1</code> at the same time. What shape do they form?</div>
        `
      },
      {
        label: "Curves",
        title: "Curves & polynomials",
        content: `
          <p>Desmos handles anything you throw at it. Try these in new expression lines:</p>
          <div class="math-block">y = x^3 - 3x</div>
          <div class="math-block">y = sin(x)</div>
          <div class="math-block">y = e^x</div>
          <p>Notice how <strong>x^3</strong> means x³ and <strong>e^x</strong> means eˣ. Desmos uses standard math notation.</p>
          <div class="tip-box">Click the colored circle next to any expression to change its color or style (dashed, thick, etc.).</div>
          <div class="challenge-box">Graph <code>y = x^4 - 4x^2</code>. How many bumps does it have?</div>
        `
      },
      {
        label: "Quiz",
        title: "Quick check!",
        isQuiz: true,
        quiz: {
          emoji: "🤔",
          question: "What graph does y = 3 produce in Desmos?",
          options: [
            { text: "A horizontal line at y = 3", correct: true },
            { text: "A parabola passing through (0, 3)", correct: false },
            { text: "A vertical line at x = 3", correct: false },
            { text: "A sine wave scaled by 3", correct: false }
          ],
          explanation: "Correct! y = 3 means 'every point where the y-value is 3,' which draws a horizontal line across the entire graph."
        }
      }
    ]
  },

  // ───────────────────────────────────────────
  // LESSON 2: SLIDERS
  // ───────────────────────────────────────────
  {
    id: 2,
    title: "Sliders & Parameters",
    subtitle: "Make parameters interactive and watch math transform before your eyes.",
    color: "#8b5cf6",
    icon: "🎚️",
    xp: 150,
    calcHint: "Type a letter like 'a' in an expression — Desmos will ask if you want to add a slider.",
    initialExpressions: [
      { id: "a",  latex: "a = 1" },
      { id: "e1", latex: "y = ax^2", color: "#8b5cf6" }
    ],
    steps: [
      {
        label: "What is a Slider?",
        title: "Sliders are magic",
        content: `
          <p>A <strong>slider</strong> lets you change a number by dragging — and every graph that uses that number updates live.</p>
          <p>On the right, you can see <code>y = ax²</code> where <code>a</code> is a slider. Try dragging the slider for <strong>a</strong> in the expression list!</p>
          <div class="tip-box">When a is positive: parabola opens up. When a is negative: it flips down. When |a| is large: it's narrow. When |a| is near 0: it's wide.</div>
          <p>This is called <strong>parameter exploration</strong> — one of Desmos's superpowers.</p>
        `
      },
      {
        label: "Creating Sliders",
        title: "Make your own slider",
        content: `
          <p>Creating a slider is easy:</p>
          <ol>
            <li>Type <code>b = 2</code> in a new expression. Desmos creates a slider for <code>b</code>.</li>
            <li>Now in another expression, type <code>y = x^2 + bx + 1</code></li>
            <li>Drag the <strong>b</strong> slider and watch the parabola shift!</li>
          </ol>
          <p>You can also <strong>set bounds</strong> on a slider: click the slider, then set min/max/step in the settings.</p>
          <div class="tip-box">Press the ▶ play button next to a slider to animate it automatically. Great for presentations!</div>
          <div class="challenge-box">Create sliders <code>a</code>, <code>b</code>, <code>c</code> and graph <code>y = ax² + bx + c</code>. Find values that make the parabola touch the x-axis at exactly one point.</div>
        `
      },
      {
        label: "Transformations",
        title: "Function transformations",
        content: `
          <p>Sliders reveal the secrets of <strong>function transformations</strong>:</p>
          <div class="math-block">y = a·sin(bx + c) + d</div>
          <p>Try building this with 4 sliders:</p>
          <ul>
            <li><strong>a</strong> — amplitude (height of the wave)</li>
            <li><strong>b</strong> — frequency (how squished/stretched)</li>
            <li><strong>c</strong> — horizontal shift (phase)</li>
            <li><strong>d</strong> — vertical shift</li>
          </ul>
          <div class="challenge-box">Set a=2, b=3, c=π/2, d=1. What does the graph look like? Can you predict it before graphing?</div>
        `
      },
      {
        label: "Quiz",
        title: "Test yourself",
        isQuiz: true,
        quiz: {
          emoji: "🎚️",
          question: "In y = a·x², what happens when you set a = -1?",
          options: [
            { text: "The parabola flips upside down", correct: true },
            { text: "The parabola shifts left by 1", correct: false },
            { text: "The parabola disappears", correct: false },
            { text: "The parabola becomes a line", correct: false }
          ],
          explanation: "Yes! Negating 'a' reflects the parabola over the x-axis, so it opens downward instead of upward."
        }
      }
    ]
  },

  // ───────────────────────────────────────────
  // LESSON 3: TABLES & REGRESSION
  // ───────────────────────────────────────────
  {
    id: 3,
    title: "Tables & Regression",
    subtitle: "Enter real data, plot scatter plots, and fit curves to find hidden patterns.",
    color: "#06b6d4",
    icon: "📊",
    xp: 175,
    calcHint: "Click the '+' button → choose 'table' to add a data table.",
    initialExpressions: [
      { id: "t1", type: "table", columns: [
        { latex: "x_1", values: ["1","2","3","4","5","6"] },
        { latex: "y_1", values: ["2.1","3.9","6.2","8.1","10.3","11.9"], color: "#06b6d4" }
      ]},
      { id: "e1", latex: "y_1 \\sim mx_1 + b", color: "#4f6ef7" }
    ],
    steps: [
      {
        label: "Tables",
        title: "Entering data",
        content: `
          <p>Desmos can work with <strong>real data</strong>, not just equations. The table on the right contains 6 data points — and Desmos plotted them as a scatter plot instantly.</p>
          <p>To add a table yourself:</p>
          <ol>
            <li>Click <strong>+</strong> at the top of the expression list</li>
            <li>Choose <strong>Table</strong></li>
            <li>Type your x and y values</li>
          </ol>
          <div class="tip-box">You can copy-paste data from a spreadsheet directly into a Desmos table!</div>
        `
      },
      {
        label: "Regression",
        title: "Fitting a curve",
        content: `
          <p>Look at the expression <code>y₁ ~ mx₁ + b</code>. The <strong>~</strong> symbol (tilde) tells Desmos to run a <strong>regression</strong> — find the best-fit line.</p>
          <p>Desmos automatically calculates <code>m</code> and <code>b</code> and shows you the R² value (how well it fits).</p>
          <p>You can fit any curve:</p>
          <div class="math-block">y₁ ~ ax₁² + bx₁ + c</div>
          <div class="math-block">y₁ ~ ae^(bx₁)</div>
          <div class="challenge-box">Add a quadratic regression <code>y₁ ~ ax₁² + bx₁ + c</code>. Is it a better or worse fit than the linear one?</div>
        `
      },
      {
        label: "Lists",
        title: "Lists in Desmos",
        content: `
          <p>Desmos supports <strong>lists</strong> — collections of numbers that are graphed all at once.</p>
          <div class="math-block">[1, 4, 9, 16, 25]</div>
          <p>Try these powerful list tricks:</p>
          <ul>
            <li><code>L = [1, 2, 3, 4, 5]</code> — define a list</li>
            <li><code>L^2</code> — squares every element</li>
            <li><code>2L + 1</code> — linear transform of every element</li>
            <li><code>(L, L^2)</code> — plots the list against its squares!</li>
          </ul>
          <div class="tip-box">Type <code>[1...10]</code> to create the list [1, 2, 3, ..., 10] without typing every number.</div>
        `
      },
      {
        label: "Quiz",
        title: "Data check",
        isQuiz: true,
        quiz: {
          emoji: "📊",
          question: "In Desmos, what does the ~ (tilde) operator do?",
          options: [
            { text: "Performs a regression (best-fit) on the data", correct: true },
            { text: "Checks if two expressions are approximately equal", correct: false },
            { text: "Creates a new list from the expression", correct: false },
            { text: "Plots the absolute value of a function", correct: false }
          ],
          explanation: "Exactly! The tilde ~ means 'fit this model to the data' — Desmos finds the optimal parameter values that minimize the error."
        }
      }
    ]
  },

  // ───────────────────────────────────────────
  // LESSON 4: PARAMETRIC EQUATIONS
  // ───────────────────────────────────────────
  {
    id: 4,
    title: "Parametric Curves",
    subtitle: "Escape y=f(x) and draw any shape imaginable using a hidden time parameter.",
    color: "#10b981",
    icon: "🌀",
    xp: 200,
    calcHint: "Type (cos(t), sin(t)) — notice the parentheses for parametric mode.",
    initialExpressions: [
      { id: "e1", latex: "(\\cos(t), \\sin(t))", color: "#10b981" },
      { id: "e2", latex: "(2\\cos(t), \\sin(t))", color: "#4f6ef7" }
    ],
    steps: [
      {
        label: "What's Parametric?",
        title: "A new way to draw",
        content: `
          <p>Normal functions say <em>"for this x, here's y."</em> Parametric equations say <em>"at this time t, here's where we are (x, y)."</em></p>
          <p>The unit circle is the perfect example:</p>
          <div class="math-block">x = cos(t),  y = sin(t)</div>
          <p>As <strong>t</strong> goes from 0 to 2π, the point traces a perfect circle. Look at the right — that's what's happening!</p>
          <div class="tip-box">In Desmos, type <code>(cos(t), sin(t))</code> and it automatically knows you want a parametric curve.</div>
        `
      },
      {
        label: "Lissajous Curves",
        title: "Lissajous magic",
        content: `
          <p><strong>Lissajous figures</strong> appear when you use different frequencies on x and y:</p>
          <div class="math-block">(sin(3t), sin(2t))</div>
          <div class="math-block">(sin(5t), sin(4t))</div>
          <p>These create intricate looping patterns that were historically used to calibrate oscilloscopes!</p>
          <ol>
            <li>Clear the current expressions</li>
            <li>Type <code>(sin(3t), sin(2t))</code></li>
            <li>Try <code>(sin(5t), sin(4t))</code></li>
            <li>Experiment with other integer ratios</li>
          </ol>
          <div class="challenge-box">What's the ratio of the frequencies in <code>(sin(3t), sin(2t))</code>? 3:2. Try 4:3 and 5:4. What pattern do you notice?</div>
        `
      },
      {
        label: "Domain",
        title: "Controlling the domain",
        content: `
          <p>You can limit how much of a parametric curve is drawn using <strong>domain restrictions</strong>:</p>
          <div class="math-block">(cos(t), sin(t))  {0 ≤ t ≤ π}</div>
          <p>This draws only the top half of the circle. In Desmos syntax:</p>
          <div class="math-block">(cos(t), sin(t)) \\{0 \\le t \\le \\pi\\}</div>
          <ul>
            <li>Draw a spiral: <code>(t·cos(t), t·sin(t))</code></li>
            <li>Draw a heart: <code>(16sin(t)³, 13cos(t) − 5cos(2t) − 2cos(3t) − cos(4t))</code></li>
          </ul>
          <div class="tip-box">The heart equation above is a famous Desmos classic. Try it!</div>
        `
      },
      {
        label: "Quiz",
        title: "Parametric check",
        isQuiz: true,
        quiz: {
          emoji: "🌀",
          question: "What shape does (cos(t), sin(t)) trace as t goes from 0 to 2π?",
          options: [
            { text: "A perfect circle with radius 1", correct: true },
            { text: "A parabola opening upward", correct: false },
            { text: "A straight diagonal line", correct: false },
            { text: "A figure-eight (lemniscate)", correct: false }
          ],
          explanation: "Yes! Since cos²(t) + sin²(t) = 1 for all t, every point satisfies x² + y² = 1 — that's a unit circle."
        }
      }
    ]
  },

  // ───────────────────────────────────────────
  // LESSON 5: POLAR GRAPHS
  // ───────────────────────────────────────────
  {
    id: 5,
    title: "Polar Graphs",
    subtitle: "Switch coordinate systems and discover roses, spirals, and the beautiful cardioid.",
    color: "#f59e0b",
    icon: "🌹",
    xp: 200,
    calcHint: "Type r = ... to graph in polar coordinates. θ is typed as 'theta'.",
    initialExpressions: [
      { id: "e1", latex: "r = 1 + \\cos(\\theta)", color: "#f59e0b" }
    ],
    steps: [
      {
        label: "Polar Coords",
        title: "A new coordinate system",
        content: `
          <p>Instead of (x, y), <strong>polar coordinates</strong> describe a point by its <em>distance from the origin</em> (r) and its <em>angle</em> (θ).</p>
          <p>In Desmos, you're already looking at the <strong>cardioid</strong>:</p>
          <div class="math-block">r = 1 + cos(θ)</div>
          <p>As θ sweeps from 0 to 2π, the distance r varies — creating that heart-shaped curve.</p>
          <div class="tip-box">Desmos automatically detects polar mode when you write <code>r = ...</code>. No settings to change!</div>
        `
      },
      {
        label: "Roses",
        title: "Rose curves",
        content: `
          <p><strong>Rose curves</strong> are stunning polar graphs:</p>
          <div class="math-block">r = cos(nθ)</div>
          <p>The number of "petals" depends on n:</p>
          <ul>
            <li><code>r = cos(2θ)</code> → 4 petals</li>
            <li><code>r = cos(3θ)</code> → 3 petals</li>
            <li><code>r = cos(4θ)</code> → 8 petals</li>
            <li><code>r = cos(5θ)</code> → 5 petals</li>
          </ul>
          <p>Rule: <strong>even n</strong> gives 2n petals; <strong>odd n</strong> gives n petals.</p>
          <div class="challenge-box">How many petals does <code>r = cos(7θ)</code> have? Predict first, then graph it!</div>
        `
      },
      {
        label: "Spirals",
        title: "Spirals & more",
        content: `
          <p>Polar coordinates shine for <strong>spirals</strong> — where r grows with θ:</p>
          <div class="math-block">r = θ / (2π)</div>
          <p>This is the <strong>Archimedean spiral</strong> — equally spaced coils. Try extending the θ range to see more coils.</p>
          <p>Other beautiful polar curves to explore:</p>
          <ul>
            <li><code>r = sin(θ/2)</code> — infinity-like loop</li>
            <li><code>r = 1 + 2sin(θ)</code> — limaçon with inner loop</li>
            <li><code>r² = cos(2θ)</code> — lemniscate of Bernoulli (figure-eight)</li>
          </ul>
          <div class="tip-box">You can graph multiple polar curves at once. Each gets its own color!</div>
        `
      },
      {
        label: "Quiz",
        title: "Polar check",
        isQuiz: true,
        quiz: {
          emoji: "🌹",
          question: "How many petals does r = cos(4θ) produce?",
          options: [
            { text: "8 petals", correct: true },
            { text: "4 petals", correct: false },
            { text: "2 petals", correct: false },
            { text: "16 petals", correct: false }
          ],
          explanation: "Correct! When n is even, r = cos(nθ) produces 2n petals. So n=4 gives 8 petals."
        }
      }
    ]
  },

  // ───────────────────────────────────────────
  // LESSON 6: PIECEWISE & ART
  // ───────────────────────────────────────────
  {
    id: 6,
    title: "Piecewise Functions & Desmos Art",
    subtitle: "Use domain restrictions and piecewise notation to draw pictures with pure math.",
    color: "#ef4444",
    icon: "🎨",
    xp: 225,
    calcHint: "Use curly braces {} to restrict a function's domain: y=x² {x>0}",
    initialExpressions: [
      { id: "e1", latex: "y = \\sqrt{1 - x^2} \\{-1 \\le x \\le 1\\}", color: "#ef4444" },
      { id: "e2", latex: "y = -\\frac{1}{2}\\sqrt{1 - \\left(\\frac{x}{1.3}\\right)^2} \\{-1.3 \\le x \\le 1.3\\}", color: "#ef4444" },
      { id: "e3", latex: "y = 0.5x^2 - 0.3 \\{-0.7 \\le x \\le 0.7\\}", color: "#ef4444" }
    ],
    steps: [
      {
        label: "Domain Restrictions",
        title: "Restricting domains",
        content: `
          <p>You can tell Desmos to only draw part of a function using <strong>curly braces</strong>:</p>
          <div class="math-block">y = x²  {x > 0}</div>
          <p>This draws only the right half of the parabola. You can combine conditions:</p>
          <div class="math-block">y = sin(x)  {0 ≤ x ≤ 2π}</div>
          <p>On the right, three restricted curves form a simple face! Look at how each piece contributes.</p>
          <div class="tip-box">Restrictions can involve both x and y: <code>y = x {x > 0} {y < 3}</code> draws only part of the line.</div>
        `
      },
      {
        label: "Piecewise",
        title: "Piecewise functions",
        content: `
          <p>A <strong>piecewise function</strong> uses different formulas for different parts of the domain. Desmos syntax:</p>
          <div class="math-block">y = {x < 0: -x, x}</div>
          <p>This is actually the absolute value! General syntax:</p>
          <div class="math-block">y = {condition: value_if_true, value_if_false}</div>
          <p>You can chain multiple pieces:</p>
          <div class="math-block">y = {x < -1: x², -1 ≤ x ≤ 1: 0, x²}</div>
          <div class="challenge-box">Build a piecewise function that draws a square wave: alternates between y=1 and y=-1 every π units.</div>
        `
      },
      {
        label: "Desmos Art",
        title: "Math as art",
        content: `
          <p>Desmos has a thriving art community. People build portraits, logos, and intricate patterns using only equations.</p>
          <p>Start simple — make a smiley face:</p>
          <ol>
            <li>Head: <code>x² + y² = 25</code></li>
            <li>Left eye: <code>(x+2)² + (y-2)² = 0.5</code></li>
            <li>Right eye: <code>(x-2)² + (y-2)² = 0.5</code></li>
            <li>Smile: <code>y = -√(4-x²) - 1  {-2≤x≤2}</code></li>
          </ol>
          <div class="tip-box">Pros use <strong>implicit equations</strong> (no explicit y=) for maximum control. Try <code>x²+y²=r²</code> with a slider r!</div>
          <div class="challenge-box">Add eyebrows, a nose, or hair to the face. How creative can you get with pure math?</div>
        `
      },
      {
        label: "Quiz",
        title: "Art check",
        isQuiz: true,
        quiz: {
          emoji: "🎨",
          question: "What does {x > 0} mean when added after a Desmos expression?",
          options: [
            { text: "Only draw the graph where x is positive", correct: true },
            { text: "Shift the graph 0 units to the right", correct: false },
            { text: "Evaluate the function only at x = 0", correct: false },
            { text: "Set the domain variable to the expression x > 0", correct: false }
          ],
          explanation: "Exactly! Curly braces in Desmos are domain/range restrictions — they filter which parts of the graph actually get drawn."
        }
      }
    ]
  },

  // ───────────────────────────────────────────
  // LESSON 7: ADVANCED FEATURES
  // ───────────────────────────────────────────
  {
    id: 7,
    title: "Advanced: Folders, Notes & Sharing",
    subtitle: "Organize your work, add annotations, and share your creations with the world.",
    color: "#10b981",
    icon: "🚀",
    xp: 250,
    calcHint: "Click the + button to add folders, notes, and images to your graph.",
    initialExpressions: [
      { id: "e1", latex: "a = 1" },
      { id: "e2", latex: "f(x) = a \\cdot \\sin(x) + \\cos(ax)", color: "#10b981" },
      { id: "e3", latex: "g(x) = f(x) - f(-x)", color: "#8b5cf6" }
    ],
    steps: [
      {
        label: "Functions",
        title: "Defining functions",
        content: `
          <p>You can define <strong>reusable functions</strong> in Desmos — just like in real math:</p>
          <div class="math-block">f(x) = x² + 1</div>
          <p>Now you can use <code>f(x)</code> anywhere:</p>
          <ul>
            <li><code>y = f(x) + f(2x)</code> — compose the function</li>
            <li><code>y = f(x+3) - f(x)</code> — finite difference</li>
            <li><code>f(a)</code> — evaluate at a slider value!</li>
          </ul>
          <p>On the right, <code>f(x)</code> uses slider <code>a</code>, and <code>g(x)</code> is defined in terms of <code>f</code>. Drag the <strong>a</strong> slider and watch both update.</p>
          <div class="tip-box">Functions can have multiple inputs: <code>dist(a, b) = √(a² + b²)</code></div>
        `
      },
      {
        label: "Organization",
        title: "Folders & notes",
        content: `
          <p>As graphs get complex, <strong>organization matters</strong>. Desmos gives you:</p>
          <ul>
            <li><strong>Folders</strong> — group related expressions; collapse/expand them. Click + → Folder.</li>
            <li><strong>Notes</strong> — add explanatory text anywhere in the list. Click + → Note.</li>
            <li><strong>Images</strong> — import images as backgrounds for art projects.</li>
          </ul>
          <p>Pro workflow:</p>
          <ol>
            <li>Put "Settings" sliders in a folder at the top</li>
            <li>Use notes as section headers</li>
            <li>Group related curves in folders with descriptive names</li>
          </ol>
          <div class="tip-box">You can toggle an entire folder visible/hidden with one click — great for layered art projects.</div>
        `
      },
      {
        label: "Share & Export",
        title: "Share your work",
        content: `
          <p>Desmos makes sharing effortless:</p>
          <ul>
            <li><strong>Share link</strong> — click the Share button (↗) for a URL anyone can open</li>
            <li><strong>Embed</strong> — get an iframe code to put Desmos on any webpage</li>
            <li><strong>Export image</strong> — download a PNG of your graph</li>
            <li><strong>Activity Builder</strong> — create interactive lessons for students</li>
          </ul>
          <div class="challenge-box">Create a graph you're proud of — parametric art, an equation portrait, or a cool visual — and share the link with someone!</div>
          <div class="tip-box">Desmos also has a <strong>Geometry</strong> tool, a <strong>Scientific Calculator</strong>, and a <strong>3D Calculator</strong> (beta) — explore them all at desmos.com!</div>
        `
      },
      {
        label: "Quiz",
        title: "Final challenge!",
        isQuiz: true,
        quiz: {
          emoji: "🚀",
          question: "If you define f(x) = x² in Desmos, what does f(3) evaluate to?",
          options: [
            { text: "9", correct: true },
            { text: "6", correct: false },
            { text: "3", correct: false },
            { text: "f(3) cannot be evaluated, only graphed", correct: false }
          ],
          explanation: "Correct! f(3) = 3² = 9. Desmos evaluates function definitions — you can even type f(3) as a standalone expression and see 9 appear!"
        }
      }
    ]
  }
];
