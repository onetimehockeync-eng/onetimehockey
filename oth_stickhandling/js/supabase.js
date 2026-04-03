/* ================================================================
supabase.js — Supabase client (no npm, CDN-loaded)
================================================================ */
const SUPABASE_URL = 'https://ugeukjhzvqmlhbykpxug.supabase.co'; // ← replace
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVnZXVramh6dnFtbGhieWtweHVnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUyMzQwMjMsImV4cCI6MjA5MDgxMDAyM30.59qFSgoVWpNdyEkH0bqXDsgBORDJn-RwbGGScryg_AY'; // ← replace
// Loaded via CDN <script> tag in each HTML file (see Part 4)
const { createClient } = supabase;
window._supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
