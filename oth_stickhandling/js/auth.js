/* ================================================================
   auth.js — OTH identity layer
   Supports: Supabase Auth (email/password + Google) + PIN code fallback
   ================================================================ */
(function () {
  'use strict';

  /* ── Identity state ─────────────────────────────────────────── */
  let _userId  = null;
  let _pinCode = null;
  let _user    = null;

  const db = () => window._supabase;

  /* ── Generate a PIN like OTH-4721 ──────────────────────────── */
  function generatePin() {
    const num = Math.floor(1000 + Math.random() * 9000);
    return `OTH-${num}`;
  }

  /* ── Restore identity from existing session or localStorage ─── */
  async function restoreIdentity() {
    const { data: { session } } = await db().auth.getSession();
    if (session) {
      _userId = session.user.id;
      _user   = session.user;
      return 'auth';
    }
    const savedPin = localStorage.getItem('oth_pin');
    if (savedPin) {
      _pinCode = savedPin;
      await touchPin(savedPin);
      return 'pin';
    }
    return 'none';
  }

  /* ── Update last_seen on a PIN code ─────────────────────────── */
  async function touchPin(pin) {
    await db()
      .from('pin_codes')
      .upsert({ pin_code: pin, last_seen: new Date().toISOString() });
  }

  /* ── Register a new PIN (generates + saves) ─────────────────── */
  async function createPin() {
    let pin, attempts = 0;
    do {
      pin = generatePin();
      const { data } = await db()
        .from('pin_codes')
        .select('pin_code')
        .eq('pin_code', pin)
        .maybeSingle();
      if (!data) break;
      attempts++;
    } while (attempts < 5);

    await db().from('pin_codes').insert({ pin_code: pin });
    localStorage.setItem('oth_pin', pin);
    _pinCode = pin;
    return pin;
  }

  /* ── Enter an existing PIN ───────────────────────────────────── */
  async function enterPin(pin) {
    const normalized = pin.trim().toUpperCase();
    const { data, error } = await db()
      .from('pin_codes')
      .select('pin_code')
      .eq('pin_code', normalized)
      .maybeSingle();

    if (error || !data) return { ok: false, error: 'Code not found' };

    localStorage.setItem('oth_pin', normalized);
    _pinCode = normalized;
    await touchPin(normalized);
    return { ok: true };
  }

  /* ── Google OAuth ────────────────────────────────────────────── */
  async function signInWithGoogle() {
    const { error } = await db().auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.href }
    });
    return { error: error?.message || null };
  }

  /* ── Sign up with email/password ────────────────────────────── */
  async function signUp(email, password) {
    const { data, error } = await db().auth.signUp({ email, password });
    if (error) return { ok: false, error: error.message };
    if (data.user) _userId = data.user.id;
    return { ok: true };
  }

  /* ── Sign in with email/password ────────────────────────────── */
  async function signIn(email, password) {
    const { data, error } = await db().auth.signInWithPassword({ email, password });
    if (error) return { ok: false, error: error.message };
    _userId = data.user.id;
    _user   = data.user;
    return { ok: true };
  }

  /* ── Sign out ────────────────────────────────────────────────── */
  async function signOut() {
    await db().auth.signOut();
    _userId  = null;
    _pinCode = null;
    _user    = null;
    localStorage.removeItem('oth_pin');
  }

  /* ── Fetch all progress rows for the current identity ────────── */
  async function fetchProgress() {
    let query = db().from('drill_progress').select('drill_id, completed');
    if (_userId)       query = query.eq('user_id', _userId);
    else if (_pinCode) query = query.eq('pin_code', _pinCode);
    else return {};

    const { data, error } = await query;
    if (error || !data) return {};

    const map = {};
    data.forEach(row => { map[row.drill_id] = row.completed; });
    return map;
  }

  /* ── Save a single drill check-off ──────────────────────────── */
  async function saveDrill(drillId, done) {
    if (!_userId && !_pinCode) return;
    await db().rpc('upsert_drill', {
      p_user_id:  _userId  || null,
      p_pin_code: _pinCode || null,
      p_drill_id: drillId,
      p_done:     done
    });
  }

  /* ── Expose to window ────────────────────────────────────────── */
  window.OTHAuth = {
    restoreIdentity,
    createPin,
    enterPin,
    signUp,
    signIn,
    signOut,
    fetchProgress,
    saveDrill,
    signInWithGoogle,
    getPin:       () => _pinCode,
    getUserId:    () => _userId,
    getUser:      () => _user,
    isIdentified: () => !!(_userId || _pinCode)
  };

})();
