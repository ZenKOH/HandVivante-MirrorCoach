'use strict';

const APP_KEY = 'handVivanteMirrorCoach.v1';
const USER_KEY = 'handVivanteMirrorCoach.user.v1';
const $ = (id) => document.getElementById(id);
const E = (v) => String(v ?? '')
  .replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;').replaceAll("'", '&#039;');
const N = (v, d = 0) => Number.isFinite(Number(v)) ? Number(v) : d;
const uid = (prefix) => crypto?.randomUUID ? `${prefix}-${crypto.randomUUID()}` : `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
const today = () => new Date().toISOString().slice(0, 10);
const ago = (days) => { const d = new Date(); d.setDate(d.getDate() - days); return d.toISOString().slice(0, 10); };
const fmtDate = (value) => value ? new Date(`${value}T12:00:00`).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }) : 'No date';
const clamp = (n, min, max) => Math.max(min, Math.min(max, n));
const avg = (arr) => arr.length ? arr.reduce((a, b) => a + Number(b || 0), 0) / arr.length : 0;
const isWithin7Days = (dateString) => {
  const date = new Date(`${dateString}T12:00:00`);
  const now = new Date();
  const start = new Date(now); start.setDate(now.getDate() - 6); start.setHours(0, 0, 0, 0);
  return date >= start && date <= now;
};

const MOVEMENT_FAMILIES = [
  'Gross hand opening / closing',
  'Finger individuation',
  'Thumb opposition',
  'Cylindrical power grasp / release',
  'Spherical grasp / release',
  'Lateral pinch',
  'Tripod pinch',
  'Release control',
  'Bimanual stabilisation',
  'Task-oriented reach, grasp and place'
];
