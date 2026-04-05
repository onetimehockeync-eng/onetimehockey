/* ================================================================
   ONE TIME HOCKEY — STICKHANDLING PROGRAM
   main.js — All drill data from spreadsheet + interactivity
   Levels: Foundation · Tricks · Advanced
   Video: YouTube embed placeholder on each drill
   ================================================================ */
(function(){
'use strict';

/* ── VIDEO PLACEHOLDER ──────────────────────────────────────────
   Replace 'PLACEHOLDER' values below with your actual YouTube
   embed URLs once videos are ready. Format:
   https://www.youtube.com/embed/XXXXXXXXXXX
   (Get this from YouTube → Share → Embed → copy the src value)
   ──────────────────────────────────────────────────────────────── */
const VIDEO_PLACEHOLDER = 'PLACEHOLDER';

/* ── DRILL DATA — FOUNDATION (9 drills) ────────────────────────── */
const FOUNDATION = [
  {
    id:'F1', name:'Around the World', tag:'foundation', duration:'3 reps / 3 sets',
    desc:'Move the puck around your body — the single best range-of-motion builder. This will help build the coordination and feel that every advanced move depends on.',
    steps:[
      'Start with the puck on the FH side, push it forward and catch on BH.',
      'FH Sweep across to the BH side, catching on the BH.',
      'FH toe pull back, catch on BH to your side',
      'Reverse direction to FH = 1 rep'
    ],
    tip:'The stick will be twisting and turning in your hands throughout the drill. Try to keep this controlled and smooth. Your top hand manipulates the blade — your bottom hand provides support and lateral movement.',
    keyPoints:['Top Hand Manipulation','Bottom Hand Support','Lateral Movement','Blade Manipulation'],
    video: "https://www.youtube.com/embed/-lW14Zh0FjM"
  },
  {
    id:'F2', name:'Side to Side — Full Reach', tag:'foundation', duration:'30 sec / 3 sets',
    desc:'Reach the puck as far as possible but keep both hands on the stick. The full range provides puck protection.',
    steps:[
      'Start with puck centered in front of you',
      'Reach puck all the way to FH side — extend arms',
      'Sweep back to BH — extend arms'
    ],
    tip:'Most players stickhandle in a 12-inch corridor. Players who keep the puck work with at least a 4-foot corridor. Rotate your wrist and keep your head up.',
    keyPoints:['Top Hand Manipulation','Bottom Hand Support','Lateral Movement','Rhythm'],
    video: "https://www.youtube.com/embed/qSRIxY17PbY"
  },
  {
    id:'F3', name:'Toe Drag — Stationary', tag:'foundation', duration:'3 reps / 3 sets',
    desc:'Drag the puck back with the FH toe and then pull to the BH in one motion. The most powerful move in hockey — many skills involve a toe drag. Toe drag to shoot, toe drag to sauce, and toe drag deke. Just to name a few.',
    steps:[
      'Puck sitting on your FH side',
      'Roll your top wrist over — the toe of the blade shields the puck from the defender.',
      'Pull the puck back using the toe',
      'As it clears back, immediately drag it to the BH side',
      'BH push past the defender',
      'Master slow before fast — then speed up'
    ],
    tip:'Make sure to move lateral and not forward too soon. Remember, in a game a defender is in front of you.',
    keyPoints:['Blade Manipulation','Top Hand Manipulation','Deception'],
    video: "https://www.youtube.com/embed/7yWLb_WNJTc"
  },
  {
    id:'F4', name:'Pull to Skate', tag:'foundation', duration:'10 reps (FH & BH)',
    desc:'FH toe drag off foot/skate and BH toe pull off foot/skate. Builds balance and coordination.',
    steps:[
      'Stickhandle puck in front of you',
      'Pull puck back to your foot/skate and kick it back to your stick (FH & BH)',
      'Add a few quick handles between reps to find your rhythm'
    ],
    tip:'Add a few quick handles to help find rhythm. Head Up. Move your feet a bit on every rep — stay loose and athletic throughout the drill.',
    keyPoints:['Top Hand Manipulation','Blade Manipulation','Footwork'],
    video: "https://www.youtube.com/embed/_5RaD7uuSiQ"
  },
  {
    id:'F5', name:'Quick Handles', tag:'foundation', duration:'30 sec / 3 sets',
    desc:'Rapid short taps cupping the blade over the puck. Builds vibration sensitivity — the ability to feel the puck without watching it.',
    steps:[
      'Cup stick blade over the puck — like cupping a ball with your palm',
      'Tap puck back and forth in tiny strokes — 4 to 6 inches each side',
      'Active Top Hand',
      'Gradually increase speed while maintaining feel and control',
      'Push to max speed'
    ],
    tip:'These look like micro-handles before a big deke. That\'s exactly what they are — feel-builders. This is all about the top hand. Don\'t tighten your shoulder. Stay loose. Rotate your top hand to catch the puck — don\'t chop at it.',
    keyPoints:['Top Hand Manipulation','Bottom Hand Support','Conditioning'],
    video: "https://www.youtube.com/embed/kDGQoENY8yg"
  },
  {
    id:'F6', name:'Top-Hand Only', tag:'conditioning', duration:'30 sec / 3 sets',
    desc:'Handles with top hand only. Remove the bottom hand entirely. The single most efficient drill for building forearm and wrist strength. All handles depend on this muscle.',
    steps:[
      'Remove bottom hand — hold stick with top hand only at the knob',
      'Quick handles using only top hand rotation',
      'Keep knees bent — Stay in an athetic stance'
    ],
    tip:'If your forearm burns badly by 30 seconds, this drill will fix that. Stay in a good hockey position throughout — don\'t stand straight up.',
    keyPoints:['Top Hand Manipulation','Conditioning'],
    video: "https://www.youtube.com/embed/xD0-kXOV6ic"
  },
  {
    id:'F7', name:'Dangles', tag:'foundation', duration:'30 sec / 4 sets',
    desc:'Place 2 pucks/small objects 18" apart. Peform continuous figure-8 stickhandling. It is ok to look at the puck on this one.',
    steps:[
      'Set two small objects approximately 18 inches apart',
      'Stickhandle around the forehand object and then around the backhand object',
      'Create a smooth figure-8 — no hesitation at the crossover point = 1 dangle',
      'Progress: Once you can get 15 dangles reduce the distance to 12"'
    ],
    tip:'Stay loose and find a rhythm. Don\'t forget to move your feet. The crossover transition is where most players hesitate — that hesitation is what you\'re trying to eliminate.',
    keyPoints:['Top Hand Manipulation','Bottom Hand Support','Blade Manipulation','Rhythm'],
    video: "https://www.youtube.com/embed/hcVLp5Z3TlU"
  },
  {
    id:'F8', name:'Minefield — Eyes Up', tag:'game', duration:'30 sec / 3 sets',
    desc:'Scatter 6-8 random obstacles. Stickhandle through them without touching any, eyes up the whole time. Kills the puck-watching habit that keeps players at the recreational level.',
    steps:[
      'Drop 6-8 small objects randomly — no pattern',
      'Try not to look down. Use peripheral vision.',
      'Stickhandle through the obstacles — any route, any speed, any move',
      'Touch an object = 5 push ups after the set.
    ],
    tip:'Eyes-up. Every rep where you look down is anti-training — you are reinforcing the wrong habit. Your brain knows where the obstacles are. Trust your hands to find the way.',
    keyPoints:['Top Hand Manipulation','Bottom Hand Support','Blade Manipulation','Conditioning','Creativity','Lateral Movement'],
    video: "https://www.youtube.com/embed/T8jBJ31vclk"
  },
  {
    id:'F9', name:'Flowstyle', tag:'game', duration:'30 sec / 3 sets',
    desc:'Stickhandle freely with no restrictions. Keep eyes up as much as possible to simulate game scanning. Move around and flow into the movements.',
    steps:[
      'Be creative',
      'Let your hands flow',
      'Push yourself'
    ],
    tip:'The brain runs the hands. Let your hands go. Stream of consciousness stickhandling.',
    keyPoints:['Top Hand Manipulation','Bottom Hand Support','Blade Manipulation','Conditioning','Creativity','Lateral Movement','Rhythm'],
    video: "https://www.youtube.com/embed/cFhrMFzU0q4"
  }
];

/* ── DRILL DATA — TRICKS (9 drills) ─────────────────────────────── */
const TRICKS = [
  {
    id:'T1', name:'Pancake Pickup', tag:'trick', duration:'10 pickups',
    desc:'Bend at the knees and lower arms towards the ice. Put pressure on the stick in order to slide the blade under the puck and scoop it up. Foundation for the Michigan and all carry moves.',
    steps:[
      'Focus on blade pressure and wrist rotation',
      'Control the puck and bring to waist level',
      'Gently place it back on the ice',
      'Build up to 10 clean pickups in a row before moving to juggling'
    ],
    tip:'The scoop and hold IS the entire skill. Lower your hands and knees together — the blade angle and pressure on the back side of the puck are key.',
    keyPoints:['Top Hand Manipulation','Bottom Hand Support','Blade Manipulation','Trick'],
    video: "https://www.youtube.com/embed/guHRro-VeWo"
  },
  {
    id:'T2', name:'Toe Pickup', tag:'trick', duration:'10 pickups',
    desc:'Cup the toe over the puck and apply pressure with the thumb of the bottom hand. A different blade entry than the pancake — gives you more options for where to pick the puck up.',
    steps:[
      'The toe of the stick should be positioned on the far edge of the puck',
      'Push down with the bottom hand thumb to lever the blade under',
      'Pop the puck up onto the blade',
      'Hands then work together to move the blade around the puck',
      'Scoop puck to waist level and gently place on ice'
    ],
    tip:'This pickup can be done more easily while skating because the puck can be picked up while moving. Practice stationary first until the wrist motion is automatic.',
    keyPoints:['Top Hand Manipulation','Bottom Hand Support','Blade Manipulation','Trick'],
    video: "https://www.youtube.com/embed/pkfzNaSj6CE"
  },
  {
    id:'T3', name:'Scoop Pickup', tag:'trick', duration:'10 pickups',
    desc:'Start this move with a toe drag and let the puck speed carry it onto the blade. The momentum of the toe drag does the work — this is the most game-applicable pickup.',
    steps:[
      'Toe drag to build puck momentum',
      'Drop hands slightly to change blade angle',
      'Contact the puck with the heel of the blade',
      'Slice under and across — momentum carries puck onto blade',
      'Control and hold'
    ],
    tip:'This is much easier on ice while moving because the skating momentum helps slice under the puck. Work the stationary version until the blade angle is automatic.',
    keyPoints:['Top Hand Manipulation','Bottom Hand Support','Blade Manipulation','Trick'],
    video: "https://www.youtube.com/embed/BLXhfOFyO9I"
  },
  {
    id:'T4', name:'Forehand Juggle', tag:'trick', duration:'10 juggles',
    desc:'Choose a pickup. Toss the puck in the air with your forehand so the puck completes 1/2 revolution and catch it on the forehand blade. Foundation of all juggling moves.',
    steps:[
      'Execute your pickup',
      'Toss the puck up — 1/2 revolution rotation',
      'Catch on forehand blade — soft hands',
      'Repeat for 10 clean juggles',
      'Bend your knees for greater catch control'
    ],
    tip:'The goal is to get 10 complete juggles. Bend your knees for greater catch control. Keep your eye on the rotation of the puck — not the blade.',
    keyPoints:['Top Hand Manipulation','Bottom Hand Support','Blade Manipulation','Rhythm','Trick'],
    video: "https://www.youtube.com/embed/y8SrcLIJzik"
  },
  {
    id:'T5', name:'Forehand — Backhand Juggle', tag:'trick', duration:'10 juggles (FH & BH)',
    desc:'Toss the puck from forehand, catch on backhand, flip back to forehand. Alternating juggle that builds bilateral blade awareness and the wrist rotation used in every deke.',
    steps:[
      'Execute your pickup',
      'Toss — 1/2 revolution',
      'Catch on backhand blade',
      'Flip puck 1/2 revolution and catch on forehand blade',
      'Repeat for 10 complete forehand & backhand cycles'
    ],
    tip:'The goal is 10 complete juggles for both FH and BH. Rotate your hands and stick early to prepare for the catch — don\'t wait until the puck is already falling.',
    keyPoints:['Top Hand Manipulation','Bottom Hand Support','Blade Manipulation','Rhythm','Trick'],
    video: "https://www.youtube.com/embed/shxp5_0G50A"
  },
  {
    id:'T6', name:'High Juggle', tag:'trick', duration:'10 juggles',
    desc:'Toss the puck so it completes at least one full revolution before catching on the forehand. Demands precise timing and builds aerial puck tracking.',
    steps:[
      'Execute your pickup',
      'Full revolution toss — higher than the forehand juggle',
      'Track the rotation all the way down',
      'Catch on forehand blade with soft hands'
    ],
    tip:'Keep your eye on the rotation and focus on the puck\'s spin — not its height. Soft hands on the catch.',
    keyPoints:['Top Hand Manipulation','Bottom Hand Support','Blade Manipulation','Rhythm','Trick'],
    video: "https://www.youtube.com/embed/Nok_QE1z8sE"
  },
  {
    id:'T7', name:'Stick Walk Juggle', tag:'trick', duration:'5 juggles',
    desc:'Pick up the puck and toss it 1/2 revolution, catch on the forehand heel. Then launch straight up and catch on the shaft of the hockey stick, below the hands.',
    steps:[
      'Execute your pickup',
      'Walk to blade heel with 1/2 revolution toss',
      'Launch puck straight up from heel',
      'Catch on stick blade',
      'Goal: 5 complete patterns'
    ],
    tip:'Keep your eye on the rotation and focus on contact point. The heel-to-blade transition is the hard part — practice it separately before connecting the full pattern.',
    keyPoints:['Top Hand Manipulation','Bottom Hand Support','Blade Manipulation','Rhythm','Trick'],
    video: "https://www.youtube.com/embed/nuRExm33A9s"
  },
  {
    id:'T8', name:'Zoro — Air', tag:'trick', duration:'5 reps',
    desc:'Pick up the puck. Control it at chest level. Turn your bottom hand over the top — the puck spins around the blade in a circular pattern. Pure blade-feel coordination builder.',
    steps:[
      'Execute your pickup',
      'Roll bottom hand over and top hand under',
      'The puck spins around the blade in a controlled circle',
      'Return to start position',
      'Goal: 5 complete reps'
    ],
    tip:'Keep your eye on the blade rotation and find a consistent rhythm before adding speed. This is all about wrist coordination — don\'t muscle it.',
    keyPoints:['Top Hand Manipulation','Bottom Hand Support','Rhythm','Trick'],
    video: "https://www.youtube.com/embed/hWtWxOF6fhY"
  },
  {
    id:'T9', name:'Windmill', tag:'trick', duration:'5 reps',
    desc:'Use centripetal force to keep the puck on the blade while spinning the stick around in a full circle. Builds the blade awareness and proprioception behind every advanced move.',
    steps:[
      'Execute your pickup',
      'Move the bottom hand up and around',
      'Keep the stick anchored with your top hand and feel the stick rotate',
      'Maintain consistent rotation speed — centripetal force holds the puck',
      'Goal: 5 complete windmills without dropping'
    ],
    tip:'The physics work — don\'t fight them. Consistent rotation speed is the entire skill. Hesitation in the rotation is what drops the puck. Start slow and build up.',
    keyPoints:['Top Hand Manipulation','Bottom Hand Support','Rhythm','Trick'],
    video: "https://www.youtube.com/embed/zTJ81hmQWMM"
  }
];

/* ── DRILL DATA — ADVANCED (6 drills) ──────────────────────────── */
const ADVANCED = [
  {
    id:'A1', name:'Shot Fake — Forehand to Backhand', tag:'game', duration:'10 reps / 3 sets',
    desc:'Load like you\'re shooting, kill it dead, take it to backhand. Foundational deception move — makes every other deke more effective because the defender learns to respect your hands.',
    steps:[
      'Move puck to forehand side, load your body weight for a shot',
      'Sell the fake — head shifts, shoulder drops, weight transfers',
      'Kill the shot dead — catch puck on back of blade',
      'Backhand drag across and pick up on backhand',
      'Finish with a forward step to simulate driving past the defender'
    ],
    tip:'Be sure to fake and sell the shot. If the defender doesn\'t believe you will shoot, they won\'t bite. The fake has to look 100% like a real shot until the moment you kill it.',
    keyPoints:['Top Hand Manipulation','Bottom Hand Support','Blade Manipulation','Deception'],
    video: "https://www.youtube.com/embed/Z1KqWcQtxHk"
  },
  {
    id:'A2', name:'Between-the-Legs', tag:'game', duration:'10 reps / 3 sets (each variation)',
    desc:'Two variations: (1) Off skate toe forehand, (2) Off skate toe backhand.',
    steps:[
      'Variation 1 — Off skate toe forehand: pull to skate then between legs',
      'Variation 2 — Off skate toe backhand: backhand version of variation 3',
      '10 reps of each variation, 3 sets'
    ],
    tip:'This trains coordination, balance, and deception.',
    keyPoints:['Top Hand Manipulation','Blade Manipulation','Deception'],
    video: "https://www.youtube.com/embed/1F1kBQHI05k"
  },
  {
    id:'A3', name:'Jump Deke — Chip Over Stick', tag:'game', duration:'3 reps / 3 sets (FH & BH)',
    desc:'Lay a stick on the ice to simulate a poke check. Lift the puck over it — forehand and backhand. The move that destroys poke-checkers once defenders know you can do it.',
    steps:[
      'Forehand (FH): handles on FH side, pick the puck up and move it across your body over the obstacle',
      'Backhand (BH): Toe drag to BH, BH sauce over the obstacle back to the FH side',
      '3 reps each way, 3 sets',
    ],
    tip:'You don\'t need a spectacular aerial — 3 to 6 inches is enough. The shorter the chip, the faster you regain control. Move your feet.',
    keyPoints:['Top Hand Manipulation','Blade Manipulation','Deception'],
    video: "https://www.youtube.com/embed/Laz-TCH5BHU"
  },
  {
    id:'A4', name:'Wall Ball — Heads Up Pass/Receive', tag:'game', duration:'30 seconds / 3 sets',
    desc:'Find a wall to pass and receive with your head up — both forehand and backhand. Trains the receive-deke connection all game situations demand.',
    steps:[
      'Pass puck against a rebound surface',
      'Receive the pass — cushion it, don\'t stab at it',
      'Immediately transition into handles or a deke — no pause',
      'Both forehand and backhand passing and receiving',
      'If you find a corner you can work FH & BH simultaneously'
    ],
    tip:'Be smooth and find a rhythm. Head up.',
    keyPoints:['Top Hand Manipulation','Bottom Hand Support','Conditioning','Rhythm','Scanning'],
    video: "https://www.youtube.com/embed/cKzGmnM-qtQ"
  },
  {
    id:'A5', name:'Wall Ball — Speed', tag:'game', duration:'30 seconds / 3 sets',
    desc:'Five feet from the rebound surface. One-touch passing between you and the wall as fast as possible. Conditions fast hands and immediate puck release under pressure.',
    steps:[
      'Position 5 feet from the wall',
      'Firm passes — aim for a specific spot on the wall',
      'React fast to the rebound',
      'One-touch passing — no settling',
      'Find a rhythm and then push harder each set'
    ],
    tip:'Head up. Aim for a spot on the wall and hit it. Find a rhythm and then challenge yourself by passing harder and harder.',
    keyPoints:['Top Hand Manipulation','Bottom Hand Support','Conditioning','Rhythm'],
    video: "https://www.youtube.com/embed/i_glWYlxeE0"
  },
  {
    id:'A6', name:'Ball Juggle', tag:'trick', duration:'50+ reps',
    desc:'Juggle a tennis ball. Try to keep the ball in the air for as many reps as you can with your stick blade. Pure blade-feel, hand-eye coordination, and concentration training.',
    steps:[
      'Control the ball in the air with the blade of your stick',
      'Bounce the ball off your blade at least 50 consecutive times',
      'Keep your eyes on the ball at all times',
      'Stay relaxed — tense shoulders kill your touch',
      'Progress: try to beat your personal record each session.'
    ],
    tip:'Concentrate. Relax your shoulders. A tennis ball is lighter and bouncier than a puck — it demands greater blade sensitivity. Players who can juggle 50+ reps have blade feel that shows in every other drill. Once you can get 50 incorporate a shaft juggle every 10.',
    keyPoints:['Bottom Hand Support','Blade Manipulation','Rhythm','Trick'],
    video: "https://www.youtube.com/embed/toJjONlltVE"
  }
];

/* ── ALL DRILLS MAP ─────────────────────────────────────────────── */
const DRILLS = { foundation: FOUNDATION, advanced: ADVANCED, tricks: TRICKS };

/* ── PROGRESS TRACKING ──────────────────────────────────────────── */
let progress = {};

async function loadProgress() {
  // Try Supabase first if identity is available
  if (window.OTHAuth && window.OTHAuth.isIdentified()) {
    try {
      const remote = await window.OTHAuth.fetchProgress();
      progress = remote;
      return;
    } catch(e) { /* fall through to localStorage */ }
  }
  // Fallback: localStorage (pre-login / offline)
  try { progress = JSON.parse(localStorage.getItem('oth_sh_prog') || '{}'); } catch(e) { progress = {}; }
}

function saveProgress() {
  // Always keep a local copy for instant UI response
  try { localStorage.setItem('oth_sh_prog', JSON.stringify(progress)); } catch(e) {}
}

function toggleDrill(id){
  progress[id] = !progress[id];
  saveProgress();
  // Async write to Supabase — non-blocking
  if (window.OTHAuth && window.OTHAuth.isIdentified()) {
    window.OTHAuth.saveDrill(id, !!progress[id]);
  }
  const card = document.getElementById('card-'+id);
  const chk  = document.getElementById('chk-'+id);
  if(card) card.classList.toggle('completed', !!progress[id]);
  if(chk)  chk.innerHTML = progress[id] ? checkSVG() : '';
  updateAllProgress();
}
function checkSVG(){
  return '<svg viewBox="0 0 13 11" fill="none" style="width:13px;height:13px;stroke:var(--white);stroke-width:2;stroke-linecap:round;stroke-linejoin:round;display:block"><polyline points="1,5.5 5,9.5 12,1.5"/></svg>';
}
function countDone(level){ return DRILLS[level] ? DRILLS[level].filter(d=>progress[d.id]).length : 0; }
function totalDone(){ return Object.values(progress).filter(Boolean).length; }
function totalDrills(){
  return FOUNDATION.length + TRICKS.length + ADVANCED.length;
}
function updateAllProgress(){
  const done = totalDone(), total = totalDrills(), pct = Math.round(done/total*100);
  const fill = document.getElementById('prog-fill');
  if(fill) fill.style.width = pct+'%';
  const cnt = document.getElementById('prog-count');
  if(cnt) cnt.textContent = done+'/'+total;
  const lbl = document.getElementById('prog-label');
  if(lbl) lbl.textContent = pct+'% complete';
  [['foundation', FOUNDATION.length], ['tricks', TRICKS.length], ['advanced', ADVANCED.length]].forEach(([lv, tot])=>{
    const el = document.getElementById('prog-'+lv);
    if(el) el.textContent = countDone(lv)+'/'+tot;
  });
}

/* ── DRILL CARD BUILDER ─────────────────────────────────────────── */
const TAG_CLASS = {
  foundation:'dtag-foundation', trick:'dtag-trick', deke:'dtag-deke',
  game:'dtag-game', conditioning:'dtag-conditioning'
};

function buildCard(drill){
  const done = !!progress[drill.id];
  const hasVideo = drill.video && drill.video !== 'PLACEHOLDER' && drill.video.trim() !== '';
  const card = document.createElement('article');
  card.className = 'drill-card'+(done?' completed':'');
  card.id = 'card-'+drill.id;

  const videoBlock = hasVideo
    ? `<div class="video-wrap"><iframe src="${drill.video}" frameborder="0" allowfullscreen allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" loading="lazy" title="${drill.name} demonstration"></iframe></div>`
    : `<div class="video-placeholder"><div class="vp-icon"></div><span>Video coming soon</span><span class="vp-sub"><!-- Replace VIDEO_PLACEHOLDER with YouTube embed URL in main.js --></span></div>`;

  card.innerHTML = `
    <div class="drill-top">
      <div class="drill-meta">
        <div class="drill-num">${drill.id}</div>
        <div class="drill-name">${drill.name}</div>
        <div class="drill-tags"><span class="dtag ${TAG_CLASS[drill.tag]||'dtag-foundation'}">${drill.tag}</span></div>
        <div class="drill-timing">${drill.duration}</div>
      </div>
      <div class="drill-check" id="chk-${drill.id}" onclick="event.stopPropagation();window.toggleDrill('${drill.id}')" title="Mark complete" role="button" aria-label="Mark ${drill.name} complete">
        ${done ? checkSVG() : ''}
      </div>
    </div>
    <div class="drill-preview">${drill.desc}</div>
    ${videoBlock}
    <div class="drill-detail" id="detail-${drill.id}">
      <div class="steps-title">Step by step</div>
      <div class="steps">
        ${drill.steps.map((s,i)=>`<div class="step"><div class="step-n">${i+1}</div><p>${s}</p></div>`).join('')}
      </div>
      <div class="tip"><div class="tip-lbl">Coach tip</div><p>${drill.tip}</p></div>
      ${drill.keyPoints && drill.keyPoints.length
        ? `<div class="key-pts">${drill.keyPoints.map(k=>`<span class="kp">${k}</span>`).join('')}</div>`
        : ''}
    </div>
    <div class="card-footer">
      <button class="expand-btn" id="expbtn-${drill.id}" onclick="window.toggleDetail('${drill.id}')">
        <span class="expand-label">Steps & tip</span><span class="expand-icon">+</span>
      </button>
    </div>`;
  return card;
}

window.toggleDetail = function(id){
  const detail = document.getElementById('detail-'+id);
  const btn    = document.getElementById('expbtn-'+id);
  if(!detail) return;
  const open = detail.classList.toggle('open');
  if(btn){
    btn.classList.toggle('open', open);
    btn.querySelector('.expand-label').textContent = open ? 'Hide' : 'Steps & tip';
    btn.querySelector('.expand-icon').textContent  = open ? '−' : '+';
  }
};
window.toggleDrill   = toggleDrill;

/* ── GRID BUILDER ───────────────────────────────────────────────── */
function buildGrid(level){
  const grid = document.getElementById('grid-'+level);
  if(!grid || grid.children.length) return;
  (DRILLS[level]||[]).forEach(d => grid.appendChild(buildCard(d)));
  // Restore completed state
  (DRILLS[level]||[]).forEach(d=>{
    if(progress[d.id]){
      const c = document.getElementById('card-'+d.id);
      const chk = document.getElementById('chk-'+d.id);
      if(c) c.classList.add('completed');
      if(chk) chk.innerHTML = checkSVG();
    }
  });
}

/* ── MOBILE NAV ─────────────────────────────────────────────────── */
const burger  = document.querySelector('.burger');
const overlay = document.querySelector('.mob-overlay');
const closeBtn= document.querySelector('.mob-close');
function openMenu(){
  if(overlay){ overlay.classList.add('open'); document.body.style.overflow='hidden'; }
  if(burger){ burger.classList.add('open'); }
}
function closeMenu(){
  if(overlay){ overlay.classList.remove('open'); document.body.style.overflow=''; }
  if(burger){ burger.classList.remove('open'); }
}
if(burger) burger.addEventListener('click', function(){
  overlay && overlay.classList.contains('open') ? closeMenu() : openMenu();
});
if(closeBtn) closeBtn.addEventListener('click', closeMenu);
if(overlay) overlay.querySelectorAll('a').forEach(a=>a.addEventListener('click', closeMenu));

/* ── ACTIVE NAV LINK ────────────────────────────────────────────── */
const page = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a, .mob-overlay a').forEach(a=>{
  const href = (a.getAttribute('href')||'').replace(/^\.\//, '');
  if(href === page || (page === '' && href === 'index.html')) a.classList.add('active');
});

/* ── SCROLL REVEAL ──────────────────────────────────────────────── */
function revealOnScroll(){
  if(!('IntersectionObserver' in window)) return;
  const obs = new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        e.target.style.opacity='1';
        e.target.style.transform='translateY(0)';
        obs.unobserve(e.target);
      }
    });
  }, {threshold:.08});
  document.querySelectorAll('.drill-card, .principle-card').forEach(el=>{
    el.style.opacity='0';
    el.style.transform='translateY(16px)';
    el.style.transition='opacity .4s ease, transform .4s ease';
    obs.observe(el);
  });
}

window.resetProgress = function(){
  if(!confirm('Reset all progress?')) return;
  progress = {};
  saveProgress();
  document.querySelectorAll('.drill-card.completed').forEach(c=>c.classList.remove('completed'));
  document.querySelectorAll('[id^="chk-"]').forEach(c=>c.innerHTML='');
  updateAllProgress();
};

window.printProgram = function(){
  document.querySelectorAll('.drill-detail').forEach(d=>d.classList.add('open'));
  window.print();
  setTimeout(()=>document.querySelectorAll('.drill-detail').forEach(d=>d.classList.remove('open')),1200);
};

/* ── INIT ────────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', async function(){
  // 1. Boot identity layer
  if (window.OTHAuth) {
    const mode = await window.OTHAuth.restoreIdentity();
    if (window.OTHAuthUI) window.OTHAuthUI.render(mode);
  }

  // 2. Load progress (remote if identified, local otherwise)
  await loadProgress();

  // 3. Build UI
  buildGrid('foundation');
  buildGrid('tricks');
  buildGrid('advanced');
  updateAllProgress();
  setTimeout(revealOnScroll, 150);
});
})();
