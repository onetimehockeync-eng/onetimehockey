/* ================================================================
   auth-ui.js — OTH Silky Mitts
   Auth bar + modal UI
   Supports: Google OAuth, Email/Password, PIN code
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

  /* ── Shared styles ───────────────────────────────────────────── */
  const inputStyle = `
    width:100%; box-sizing:border-box; background:#1a2436;
    border:1px solid rgba(255,255,255,.15); border-radius:8px;
    padding:.7rem 1rem; color:#fff; font-size:.95rem; font-family:inherit;
    margin-bottom:.6rem; outline:none;
  `;

  const primaryBtnStyle = `
    display:block; width:100%; background:#e04050; color:#fff; border:none;
    border-radius:8px; padding:.75rem; font-size:1rem; cursor:pointer;
    font-family:inherit; font-weight:600;
  `;

  const googleBtnStyle = `
    display:flex; align-items:center; justify-content:center; gap:.6rem;
    width:100%; background:#fff; color:#1a1a1a;
    border:1px solid rgba(0,0,0,.15); border-radius:8px;
    padding:.7rem; font-size:.95rem; cursor:pointer;
    font-family:inherit; margin-bottom:1rem; font-weight:500;
  `;

  const dividerHTML = `
    <div style="display:flex;align-items:center;gap:.75rem;margin-bottom:1rem">
      <div style="flex:1;height:1px;background:rgba(255,255,255,.1)"></div>
      <span style="color:#555;font-size:.8rem">or</span>
      <div style="flex:1;height:1px;background:rgba(255,255,255,.1)"></div>
    </div>
  `;

  const googleIconSVG = `
    <svg width="18" height="18" viewBox="0 0 48 48" style="flex-shrink:0">
      <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9 3.2l6.7-6.7C35.7 2.5 30.2 0 24 0 14.8 0 6.9 5.4 3 13.3l7.8 6C12.8 13 17.9 9.5 24 9.5z"/>
      <path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v8.5h12.7c-.6 3-2.3 5.5-4.8 7.2l7.5 5.8c4.4-4.1 7.1-10.1 7.1-17z"/>
      <path fill="#FBBC05" d="M10.8 28.7A14.5 14.5 0 0 1 9.5 24c0-1.6.3-3.2.8-4.7L2.5 13.3A23.9 23.9 0 0 0 0 24c0 3.9.9 7.5 2.5 10.7l8.3-6z"/>
      <path fill="#34A853" d="M24 48c6.2 0 11.4-2 15.2-5.5l-7.5-5.8c-2 1.4-4.6 2.2-7.7 2.2-6.1 0-11.2-3.5-13.2-8.5l-7.8 6C6.9 42.6 14.8 48 24 48z"/>
    </svg>
  `;

  /* ── Render the sticky bar ───────────────────────────────────── */
  function renderBar(mode) {
    const statusEl  = document.getElementById('oth-auth-status');
    const actionsEl = document.getElementById('oth-auth-actions');
    if (!statusEl || !actionsEl) return;

    if (mode === 'auth') {
      const user    = A().getUser();
      const email   = user?.email || '';
      const initial = email ? email[0].toUpperCase() : '?';
      const avatar  = user?.user_metadata?.avatar_url;

      const avatarHTML = avatar
        ? `<img src="${avatar}" style="width:24px;height:24px;border-radius:50%;object-fit:cover;flex-shrink:0">`
        : `<div style="width:24px;height:24px;border-radius:50%;background:#e04050;color:#fff;font-size:.75rem;font-weight:700;display:flex;align-items:center;justify-content:center;flex-shrink:0">${initial}</div>`;

      statusEl.innerHTML = `
        <div style="display:flex;align-items:center;gap:.5rem">
          ${avatarHTML}
          <span style="opacity:.9">${email}</span>
        </div>`;
      actionsEl.innerHTML = btn('Sign out', 'OTHAuthUI.signOut()');

    } else if (mode === 'pin') {
      const pin = A().getPin();
      statusEl.innerHTML  = `Your code: <strong style="color:#e04050;letter-spacing:.08em">${pin}</strong> — write this down`;
      actionsEl.innerHTML = btn('Change code', 'OTHAuthUI.showPinEntry()') +
                            btn('Create account', 'OTHAuthUI.showSignUp()', true);

    } else {
      statusEl.textContent = 'Save your progress across devices';
      actionsEl.innerHTML  = btn('Get a code', 'OTHAuthUI.getCode()') +
                             btn('Enter code', 'OTHAuthUI.showPinEntry()') +
                             btn('Sign in', 'OTHAuthUI.showSignIn()', true);
    }
  }

  function btn(label, onclick, primary = false) {
    const bg = primary ? '#e04050' : 'rgba(255,255,255,.08)';
    return `<button onclick="${onclick}" style="background:${bg};color:#fff;border:none;border-radius:6px;padding:.35rem .8rem;font-size:.8rem;cursor:pointer;font-family:inherit;white-space:nowrap;font-weight:500">${label}</button>`;
  }

  /* ── Reload after identity change ────────────────────────────── */
  async function reloadAfterLogin() {
    modal.close();
    location.reload();
  }

  /* ── Google OAuth ────────────────────────────────────────────── */
  async function signInWithGoogle() {
    const { error } = await A().signInWithGoogle();
    if (error) alert('Google sign-in failed: ' + error);
  }

  /* ── Get a new PIN code ──────────────────────────────────────── */
  async function getCode() {
    const pin = await A().createPin();
    renderBar('pin');
    modal.open(`
      <h2 style="margin:0 0 .5rem;font-size:1.3rem;color:#fff">Your access code</h2>
      <p style="color:#aaa;font-size:.9rem;margin:0 0 1.5rem;line-height:1.6">
        Write this down or take a screenshot. Enter it on any device to restore
        your progress. No email or password required.
      </p>
      <div style="background:#e04050;color:#fff;font-size:2rem;font-weight:800;letter-spacing:.14em;text-align:center;border-radius:10px;padding:1.1rem;margin-bottom:1rem;user-select:all">
        ${pin}
      </div>
      <p style="color:#666;font-size:.8rem;text-align:center;margin:0 0 1.5rem">
        Tap the code above to select it for copying
      </p>
      <button onclick="OTHModal.close();location.reload()" style="${primaryBtnStyle}">
        Start Training →
      </button>
      <p style="text-align:center;margin-top:1rem;color:#aaa;font-size:.82rem">
        Want full sync across devices?
        <span onclick="OTHAuthUI.showSignUp()" style="color:#e04050;cursor:pointer">Create an account instead</span>
      </p>
    `);
  }

  /* ── Enter an existing PIN ───────────────────────────────────── */
  function showPinEntry() {
    modal.open(`
      <h2 style="margin:0 0 .5rem;font-size:1.3rem;color:#fff">Enter your code</h2>
      <p style="color:#aaa;font-size:.9rem;margin:0 0 1.5rem;line-height:1.6">
        Enter the code you were given (e.g. <span style="color:#e04050;letter-spacing:.06em">OTH-4721</span>)
      </p>
      <input id="oth-pin-input" type="text" placeholder="OTH-XXXX"
        autocomplete="off" autocapitalize="characters" spellcheck="false"
        style="${inputStyle}text-transform:uppercase;letter-spacing:.1em;font-size:1.1rem;text-align:center;" />
      <div id="oth-pin-err" style="color:#e04050;font-size:.85rem;min-height:1.2rem;margin-bottom:.5rem"></div>
      <button onclick="OTHAuthUI.submitPin()" style="${primaryBtnStyle}margin-bottom:.75rem">
        Load My Progress →
      </button>
      <p style="text-align:center;color:#aaa;font-size:.82rem;margin:0">
        Don't have a code?
        <span onclick="OTHAuthUI.getCode()" style="color:#e04050;cursor:pointer">Get one now</span>
      </p>
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
    const inp   = document.getElementById('oth-pin-input');
    const errEl = document.getElementById('oth-pin-err');
    if (!inp) return;
    const result = await A().enterPin(inp.value);
    if (!result.ok) {
      if (errEl) errEl.textContent = result.error || 'Code not found — double-check and try again';
      inp.style.borderColor = '#e04050';
      return;
    }
    await reloadAfterLogin();
  }

  /* ── Sign up modal ───────────────────────────────────────────── */
  function showSignUp() {
    modal.open(`
      <h2 style="margin:0 0 .5rem;font-size:1.3rem;color:#fff">Create an account</h2>
      <p style="color:#aaa;font-size:.9rem;margin:0 0 1.25rem;line-height:1.6">
        Progress syncs automatically across all your devices.
      </p>
      <button onclick="OTHAuthUI.signInWithGoogle()" style="${googleBtnStyle}">
        ${googleIconSVG}
        Continue with Google
      </button>
      ${dividerHTML}
      <input id="oth-su-email" type="email" placeholder="Email" autocomplete="email" style="${inputStyle}" />
      <input id="oth-su-pass" type="password" placeholder="Password (min 6 characters)" autocomplete="new-password" style="${inputStyle}" />
      <div id="oth-su-err" style="color:#e04050;font-size:.85rem;min-height:1.2rem;margin-bottom:.5rem"></div>
      <button onclick="OTHAuthUI.submitSignUp()" style="${primaryBtnStyle}margin-bottom:.75rem">
        Create Account
      </button>
      <p style="text-align:center;color:#aaa;font-size:.82rem;margin:0">
        Already have an account?
        <span onclick="OTHAuthUI.showSignIn()" style="color:#e04050;cursor:pointer">Sign in</span>
        &nbsp;·&nbsp;
        <span onclick="OTHAuthUI.showPinEntry()" style="color:#e04050;cursor:pointer">Use a code instead</span>
      </p>
    `);
  }

  async function submitSignUp() {
    const email = document.getElementById('oth-su-email')?.value?.trim();
    const pass  = document.getElementById('oth-su-pass')?.value;
    const errEl = document.getElementById('oth-su-err');
    if (!email || !pass) { if (errEl) errEl.textContent = 'Please enter an email and password'; return; }
    if (pass.length < 6) { if (errEl) errEl.textContent = 'Password must be at least 6 characters'; return; }
    if (errEl) errEl.textContent = 'Creating account…';
    const result = await A().signUp(email, pass);
    if (!result.ok) { if (errEl) errEl.textContent = result.error; return; }
    modal.open(`
      <h2 style="margin:0 0 1rem;color:#fff">Check your email ✓</h2>
      <p style="color:#aaa;line-height:1.6;margin:0 0 1.5rem">
        We sent a confirmation link to <strong style="color:#fff">${email}</strong>.
        Click it to activate your account, then come back here and sign in.
      </p>
      <button onclick="OTHAuthUI.showSignIn()" style="${primaryBtnStyle}">Go to Sign In</button>
    `);
  }

  /* ── Sign in modal ───────────────────────────────────────────── */
  function showSignIn() {
    modal.open(`
      <h2 style="margin:0 0 .5rem;font-size:1.3rem;color:#fff">Sign in</h2>
      <p style="color:#aaa;font-size:.9rem;margin:0 0 1.25rem;line-height:1.6">
        Welcome back. Your progress loads automatically.
      </p>
      <button onclick="OTHAuthUI.signInWithGoogle()" style="${googleBtnStyle}">
        ${googleIconSVG}
        Continue with Google
      </button>
      ${dividerHTML}
      <input id="oth-si-email" type="email" placeholder="Email" autocomplete="email" style="${inputStyle}" />
      <input id="oth-si-pass" type="password" placeholder="Password" autocomplete="current-password" style="${inputStyle}" />
      <div id="oth-si-err" style="color:#e04050;font-size:.85rem;min-height:1.2rem;margin-bottom:.5rem"></div>
      <button onclick="OTHAuthUI.submitSignIn()" style="${primaryBtnStyle}margin-bottom:.75rem">Sign In</button>
      <p style="text-align:center;color:#aaa;font-size:.82rem;margin:0 0 .5rem">
        <span onclick="OTHAuthUI.showForgotPassword()" style="color:#e04050;cursor:pointer">Forgot password?</span>
      </p>
      <p style="text-align:center;color:#aaa;font-size:.82rem;margin:0">
        No account?
        <span onclick="OTHAuthUI.showSignUp()" style="color:#e04050;cursor:pointer">Create one</span>
        &nbsp;·&nbsp;
        <span onclick="OTHAuthUI.showPinEntry()" style="color:#e04050;cursor:pointer">Use a code instead</span>
      </p>
    `);
    setTimeout(() => {
      const emailInp = document.getElementById('oth-si-email');
      const passInp  = document.getElementById('oth-si-pass');
      if (emailInp) emailInp.focus();
      if (passInp) passInp.addEventListener('keydown', e => { if (e.key === 'Enter') window.OTHAuthUI.submitSignIn(); });
    }, 50);
  }

  async function submitSignIn() {
    const email = document.getElementById('oth-si-email')?.value?.trim();
    const pass  = document.getElementById('oth-si-pass')?.value;
    const errEl = document.getElementById('oth-si-err');
    if (!email || !pass) { if (errEl) errEl.textContent = 'Please enter your email and password'; return; }
    if (errEl) errEl.textContent = 'Signing in…';
    const result = await A().signIn(email, pass);
    if (!result.ok) { if (errEl) errEl.textContent = result.error; return; }
    await reloadAfterLogin();
  }

  /* ── Forgot password modal ───────────────────────────────────── */
  function showForgotPassword() {
    modal.open(`
      <h2 style="margin:0 0 .5rem;font-size:1.3rem;color:#fff">Reset password</h2>
      <p style="color:#aaa;font-size:.9rem;margin:0 0 1.5rem;line-height:1.6">
        Enter your email and we'll send you a reset link.
      </p>
      <input id="oth-fp-email" type="email" placeholder="Email" autocomplete="email" style="${inputStyle}" />
      <div id="oth-fp-err" style="color:#e04050;font-size:.85rem;min-height:1.2rem;margin-bottom:.5rem"></div>
      <button onclick="OTHAuthUI.submitForgotPassword()" style="${primaryBtnStyle}margin-bottom:.75rem">Send Reset Link</button>
      <p style="text-align:center;color:#aaa;font-size:.82rem;margin:0">
        <span onclick="OTHAuthUI.showSignIn()" style="color:#e04050;cursor:pointer">← Back to sign in</span>
      </p>
    `);
    setTimeout(() => {
      const inp = document.getElementById('oth-fp-email');
      if (inp) {
        inp.focus();
        inp.addEventListener('keydown', e => { if (e.key === 'Enter') window.OTHAuthUI.submitForgotPassword(); });
      }
    }, 50);
  }

  async function submitForgotPassword() {
    const email = document.getElementById('oth-fp-email')?.value?.trim();
    const errEl = document.getElementById('oth-fp-err');
    if (!email) { if (errEl) errEl.textContent = 'Please enter your email address'; return; }
    if (errEl) errEl.textContent = 'Sending…';
    const { error } = await window._supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin + window.location.pathname
    });
    if (error) { if (errEl) errEl.textContent = error.message; return; }
    modal.open(`
      <h2 style="margin:0 0 1rem;color:#fff">Email sent ✓</h2>
      <p style="color:#aaa;line-height:1.6;margin:0 0 1.5rem">
        Check your inbox at <strong style="color:#fff">${email}</strong> for a password reset link.
      </p>
      <button onclick="OTHModal.close()" style="${primaryBtnStyle}">Done</button>
    `);
  }

  /* ── Sign out ────────────────────────────────────────────────── */
  async function signOut() {
    await A().signOut();
    location.reload();
  }

  /* ── Close modal on background click / Escape ───────────────── */
  document.addEventListener('DOMContentLoaded', () => {
    const bg = document.getElementById('oth-modal-bg');
    if (bg) bg.addEventListener('click', e => { if (e.target === bg) modal.close(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') modal.close(); });
  });

  /* ── Public API ──────────────────────────────────────────────── */
  window.OTHAuthUI = {
    render:               renderBar,
    getCode,
    showPinEntry,
    submitPin,
    showSignUp,
    submitSignUp,
    showSignIn,
    submitSignIn,
    showForgotPassword,
    submitForgotPassword,
    signInWithGoogle,
    signOut,
  };

})();
