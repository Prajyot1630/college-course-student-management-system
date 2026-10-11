// src/utils/attendance.js
// Attendance status helper with exact threshold rules

/**
 * Returns the attendance status based on percentage.
 * Rules (check Detained first to avoid overlap):
 *   - < 60%  → Detained
 *   - < 75%  → Warning
 *   - >= 75% → Eligible
 */
export function getAttendanceStatus(attendance) {
  const pct = Number(attendance);
  if (pct < 60) return 'Detained';
  if (pct < 75) return 'Warning';
  return 'Eligible';
}

/**
 * Returns the CSS class name for attendance status styling.
 */
export function getAttendanceClass(attendance) {
  const status = getAttendanceStatus(attendance);
  if (status === 'Detained') return 'status-detained';
  if (status === 'Warning') return 'status-warning';
  return 'status-eligible';
}
