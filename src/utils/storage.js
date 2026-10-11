// src/utils/storage.js
// localStorage helpers with safe JSON parsing

export function loadFromStorage(key, fallback) {
  try {
    const data = localStorage.getItem(key);
    if (data === null) return fallback;
    const parsed = JSON.parse(data);
    if (!Array.isArray(parsed)) return fallback;
    return parsed;
  } catch {
    return fallback;
  }
}

export function saveToStorage(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error('Failed to save to localStorage:', e);
  }
}
