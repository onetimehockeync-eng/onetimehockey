/* ================================================================
   auth-ui.js — Auth bar + modal UI for OTH stickhandling
   ================================================================ */
(function () {
  'use strict';

  const A = () => window.OTHAuth;

  /* ── Modal helpers ──────────────────────────────────────────── */
  const modal = {
    open(html) {
      document.getElementById('oth-modal-body').innerHTML = html;
      document.getElementById('oth-modal-bg').style.display = 'flex';
    },
    close() {
      document.getElementById('oth-modal-bg').style.display = 'none';
    }
  };
  window.OTHModal = modal;

  /* ── Render the sticky bar ───────────────────────────────────── */
  function renderBar(mode) {
    const statusEl  = document.getElementById('oth-auth-status');
    const actionsEl = document.getElementById('oth-auth-actions');
    if (!statusEl || !actionsEl) return;

    if (mode === 'auth') {
      statusEl.textContent  = '✓ Signed in — progress synced';
      actionsEl.innerHTML   = btn('Sign out', 'OTHAuthUI.signOut()');
    } else if (mode === 'pin') {
      const pin = A().getPin();
      statusEl.innerHTML    = `Your code: <strong style="color:#e04050;letter-spacing:.06em">${pin}</strong> — write this down`;
      actionsEl.innerHTML   = btn('Change code', 'OTHAuthUI.showPinEntry()') +
                              btn('Create account', 'OTHAuthUI.showSignUp()', true);
    } else {
      statusEl.textContent  = 'Save your progress across devices';
      actionsEl.innerHTML   = btn('Get a code', 'OTHAuthUI.getCode()') +
                              btn('Enter code', 'OTHAuthUI.showPinEntry()') +
                              btn('Sign in', 'OTHAuthUI.showSignIn()', true);
    }
  }

  function btn(label, onclick, primary = false) {
    const bg = primary ? '#e04050' : 'rgba(255,255,255,.08)';
    return `<button onclick="${onclick}" style="
      background:${bg}; color:#fff; border:none; border-radius:6px;
      padding:.35rem .8rem; font-size:.8rem; cursor:pointer;
      font-family:inherit; white-space:nowrap">${label}</button>`;
  }

  /* ── Reload progress + rebuild UI after identity change ─────── */
  async function reloadAfterLogin() {
    modal.close();
    const remote = await A().fetchProgress();
    // Merge with local — remote wins
    Object.assign(window._progress_ref || {}, remote);
    // Trigger a page reload so all grids re-render cleanly
    location.reload();
  }

  /* ── Get a new PIN code ──────────────────────────────────────── */
  async function getCode() {
    const pin = await A().createPin();
    renderBar('pin');
    modal.open(`
      <h2 style="margin:0 0 .5rem;font-size:1.3rem">Your access code</h2>
      <p style="color:#aaa;font-size:.9rem;margin:0 0 1.5rem">
        Write this down. Enter it on any device to restore your progress.
        No email or password required.
      </p>
      <div style="
        background:#e04050;color:#fff;font-size:2rem;font-weight:800;
        letter-spacing:.12em;text-align:center;border-radius:10px;
        padding:1rem;margin-bottom:1.5rem">${pin}</div>
      <p style="color:#aaa;font-size:.82rem;text-align:center;margin:0">
        Your progress saves automatically as you check off drills.
      </p>
      <button onclick="OTHModal.close();location.reload()" style="
        display:block;width:100%;margin-top:1.25rem;background:#e04050;
        color:#fff;border:none;border-radius:8px;padding:.75rem;
        font-size:1rem;cursor:pointer;font-family:inherit">
        Start Training →
      </button>
    `);
  }

  /* ── Enter an existing PIN ───────────────────────────────────── */
  function showPinEntry() {
    modal.open(`
      <h2 style="margin:0 0 .5rem;font-size:1.3rem">Enter your code</h2>
      <p style="color:#aaa;font-size:.9rem;margin:0 0 1.5rem">
        Enter the code you received (e.g. OTH-4721)
      </p>
      <input id="oth-pin-input" type="text" placeholder="OTH-XXXX"
        style="width:100%;box-sizing:border-box;background:#1a2436;
          border:1px solid rgba(255,255,255,.15);border-radius:8px;
          padding:.7rem 1rem;color:#fff;font-size:1rem;font-family:inherit;
          text-transform:uppercase;letter-spacing:.06em;margin-bottom:.75rem" />
      <div id="oth-pin-err" style="color:#e04050;font-size:.85rem;min-height:1.2rem;margin-bottom:.5rem"></div>
      <button onclick="OTHAuthUI.submitPin()" style="
        display:block;width:100%;background:#e04050;color:#fff;border:none;
        border-radius:8px;padding:.75rem;font-size:1rem;cursor:pointer;
        font-family:inherit">
        Load My Progress →
      </button>
    `);
    setTimeout(() => {
      const inp = document.getElementById('oth-pin-input');
      if (inp) {
        inp.focus();
        inp.addEventListener('keydown', e => { if (e.key === 'Enter') window.OTHAuthUI.submitPin(); });
      }
    }, 50);
  }

  async function submitPin() {
    const inp = document.getElementById('oth-pin-input');
    const errEl = document.getElementById('oth-pin-err');
    if (!inp) return;
    const result = await A().enterPin(inp.value);
    if (!result.ok) {
      if (errEl) errEl.textContent = result.error || 'Invalid code';
      return;
    }
    await reloadAfterLogin();
  }

  /* ── Sign up modal ───────────────────────────────────────────── */
  function showSignUp() {
    modal.open(`
      <h2 style="margin:0 0 .5rem;font-size:1.3rem">Create an account</h2>
      <p style="color:#aaa;font-size:.9rem;margin:0 0 1.5rem">
        Your progress syncs across all devices automatically.
      </p>
      <input id="oth-su-email" type="email" placeholder="Email"
        style="width:100%;box-sizing:border-box;background:#1a2436;
          border:1px solid rgba(255,255,255,.15);border-radius:8px;
          padding:.7rem 1rem;color:#fff;font-size:.95rem;font-family:inherit;
          margin-bottom:.6rem" />
      <input id="oth-su-pass" type="password" placeholder="Password (min 6 chars)"
        style="width:100%;box-sizing:border-box;background:#1a2436;
          border:1px solid rgba(255,255,255,.15);border-radius:8px;
          padding:.7rem 1rem;color:#fff;font-size:.95rem;font-family:inherit;
          margin-bottom:.6rem" />
      <div id="oth-su-err" style="color:#e04050;font-size:.85rem;min-height:1.2rem;margin-bottom:.5rem"></div>
      <button onclick="OTHAuthUI.submitSignUp()" style="
        display:block;width:100%;background:#e04050;color:#fff;border:none;
        border-radius:8px;padding:.75rem;font-size:1rem;cursor:pointer;
        font-family:inherit;margin-bottom:.75rem">Create Account</button>
      <p style="text-align:center;color:#aaa;font-size:.82rem;margin:0">
        Already have an account?
        <span onclick="OTHAuthUI.showSignIn()" style="color:#e04050;cursor:pointer">Sign in</span>
      </p>
    `);
  }

  async function submitSignUp() {
    const email = document.getElementById('oth-su-email')?.value;
    const pass  = document.getElementById('oth-su-pass')?.value;
    const errEl = document.getElementById('oth-su-err');
    const result = await A().signUp(email, pass);
    if (!result.ok) {
      if (errEl) errEl.textContent = result.error;
      return;
    }
    modal.open(`
      <h2 style="margin:0 0 1rem">Check your email ✓</h2>
      <p style="color:#aaa">We sent a confirmation link to <strong style="color:#fff">${email}</strong>.
      The email will come from Supabase Auth. Click the link in the email to activate your account, then come back and sign in.</p>
      <button onclick="OTHModal.close()" style="
        display:block;width:100%;margin-top:1.5rem;background:#e04050;
        color:#fff;border:none;border-radius:8px;padding:.75rem;
        font-size:1rem;cursor:pointer;font-family:inherit">OK</button>
    `);
  }

  /* ── Sign in modal ───────────────────────────────────────────── */
  function showSignIn() {
    modal.open(`
      <h2 style="margin:0 0 .5rem;font-size:1.3rem">Sign in</h2>
      <p style="color:#aaa;font-size:.9rem;margin:0 0 1.5rem">
        Welcome back. Your progress will load automatically.
      </p>
      <input id="oth-si-email" type="email" placeholder="Email"
        style="width:100%;box-sizing:border-box;background:#1a2436;
          border:1px solid rgba(255,255,255,.15);border-radius:8px;
          padding:.7rem 1rem;color:#fff;font-size:.95rem;font-family:inherit;
          margin-bottom:.6rem" />
      <input id="oth-si-pass" type="password" placeholder="Password"
        style="width:100%;box-sizing:border-box;background:#1a2436;
          border:1px solid rgba(255,255,255,.15);border-radius:8px;
          padding:.7rem 1rem;color:#fff;font-size:.95rem;font-family:inherit;
          margin-bottom:.6rem" />
      <div id="oth-si-err" style="color:#e04050;font-size:.85rem;min-height:1.2rem;margin-bottom:.5rem"></div>
      <button onclick="OTHAuthUI.submitSignIn()" style="
        display:block;width:100%;background:#e04050;color:#fff;border:none;
        border-radius:8px;padding:.75rem;font-size:1rem;cursor:pointer;
        font-family:inherit;margin-bottom:.75rem">Sign In</button>
      <p style="text-align:center;color:#aaa;font-size:.82rem;margin:0">
        No account?
        <span onclick="OTHAuthUI.showSignUp()" style="color:#e04050;cursor:pointer">Create one</span>
        &nbsp;·&nbsp;
        <span onclick="OTHAuthUI.showPinEntry()" style="color:#e04050;cursor:pointer">Use a code instead</span>
      </p>
    `);
  }

  async function submitSignIn() {
    const email = document.getElementById('oth-si-email')?.value;
    const pass  = document.getElementById('oth-si-pass')?.value;
    const errEl = document.getElementById('oth-si-err');
    const result = await A().signIn(email, pass);
    if (!result.ok) {
      if (errEl) errEl.textContent = result.error;
      return;
    }
    await reloadAfterLogin();
  }

  /* ── Sign out ────────────────────────────────────────────────── */
  async function signOut() {
    await A().signOut();
    location.reload();
  }

  /* ── Public API ──────────────────────────────────────────────── */
  window.OTHAuthUI = { render: renderBar, getCode, showPinEntry, submitPin,
                       showSignUp, submitSignUp, showSignIn, submitSignIn, signOut };

})();
