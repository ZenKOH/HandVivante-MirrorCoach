'use strict';

const APP_KEY = 'handVivanteMirrorCoach.v1';
const USER_KEY = 'handVivanteMirrorCoach.user.v1';
const $ = (id) => document.getElementById(id);
const E = (v) => String(v ?? '')
  .replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;').replaceAll("'", '&#039;');
const N = (v, d = 0) => Number.isFinite(Number(v)) ? Number(v) : d;
const uid = (prefix) => crypto?.randomUUID ? `${prefix}-${crypto.randomUUID()}` : `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
const dateKey = (date = new Date()) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
};
const parseDateKey = (value) => {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(value || ''));
  if (!match) return null;
  const date = new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
  return Number.isNaN(date.getTime()) ? null : date;
};
const today = () => dateKey();
const ago = (days) => { const d = new Date(); d.setDate(d.getDate() - days); return dateKey(d); };
const fmtDate = (value) => { const date = parseDateKey(value); return date ? date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }) : 'No date'; };
const clamp = (n, min, max) => Math.max(min, Math.min(max, n));
const avg = (arr) => arr.length ? arr.reduce((a, b) => a + Number(b || 0), 0) / arr.length : 0;
const isWithin7Days = (dateString) => {
  const date = parseDateKey(dateString);
  if (!date) return false;
  const end = new Date(); end.setHours(23, 59, 59, 999);
  const start = new Date(end); start.setDate(end.getDate() - 6); start.setHours(0, 0, 0, 0);
  return date >= start && date <= end;
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
