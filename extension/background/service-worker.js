import { DEFAULT_SETTINGS, resolveSeparator } from '../lib/settings.js';

const MENU_ID = 'copy-tab-urls';
const OFFSCREEN_PATH = 'offscreen/offscreen.html';

browser.runtime.onInstalled.addListener(() => {
  browser.contextMenus.create({
    id: MENU_ID,
    title: 'Copy URL(s)',
    contexts: ['tab'],
  });
});

browser.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId !== MENU_ID || !Number.isInteger(tab?.windowId)) {
    return;
  }

  const selected = await browser.tabs.query({
    highlighted: true,
    windowId: tab.windowId,
  });
  const urls = selected.map((item) => item.url).filter(Boolean);
  if (urls.length === 0) {
    return;
  }

  const stored = await browser.storage.sync.get(DEFAULT_SETTINGS);
  await copyText(urls.join(resolveSeparator(stored)));
});

let creatingOffscreen;

async function copyText(text) {
  await setupOffscreenDocument();
  await browser.runtime.sendMessage({
    type: 'copy-data-to-clipboard',
    target: 'offscreen-doc',
    data: text,
  });
}

async function setupOffscreenDocument() {
  const offscreenUrl = browser.runtime.getURL(OFFSCREEN_PATH);
  const existing = await browser.runtime.getContexts({
    contextTypes: ['OFFSCREEN_DOCUMENT'],
    documentUrls: [offscreenUrl],
  });
  if (existing.length > 0) {
    return;
  }

  if (creatingOffscreen) {
    await creatingOffscreen;
    return;
  }

  creatingOffscreen = browser.offscreen.createDocument({
    url: OFFSCREEN_PATH,
    reasons: ['CLIPBOARD'],
    justification: 'Write selected tab URLs to the clipboard.',
  });
  try {
    await creatingOffscreen;
  } finally {
    creatingOffscreen = undefined;
  }
}
