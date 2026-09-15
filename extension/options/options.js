import { DEFAULT_SETTINGS } from '../lib/settings.js';

const ALLOWED_PRESETS = ['newline', 'space', 'comma', 'semicolon', 'custom'];
const customInput = document.getElementById('customSeparator');
const statusEl = document.getElementById('status');
let statusTimer;

function selectedPreset() {
  return document.querySelector('input[name="separatorPreset"]:checked')?.value
    ?? DEFAULT_SETTINGS.separatorPreset;
}

function setCustomEnabled() {
  customInput.disabled = selectedPreset() !== 'custom';
}

function flashStatus(message) {
  statusEl.textContent = message;
  clearTimeout(statusTimer);
  statusTimer = setTimeout(() => {
    statusEl.textContent = '';
  }, 1200);
}

async function persist() {
  await browser.storage.sync.set({
    separatorPreset: selectedPreset(),
    customSeparator: customInput.value,
  });
  flashStatus('Saved.');
}

async function restore() {
  const stored = await browser.storage.sync.get(DEFAULT_SETTINGS);
  const preset = ALLOWED_PRESETS.includes(stored.separatorPreset)
    ? stored.separatorPreset
    : DEFAULT_SETTINGS.separatorPreset;
  const radio = document.querySelector(`input[name="separatorPreset"][value="${preset}"]`);
  if (radio) {
    radio.checked = true;
  }
  customInput.value = stored.customSeparator ?? '';
  setCustomEnabled();
}

document.querySelectorAll('input[name="separatorPreset"]').forEach((input) => {
  input.addEventListener('change', () => {
    setCustomEnabled();
    persist();
  });
});

customInput.addEventListener('input', persist);

restore();
