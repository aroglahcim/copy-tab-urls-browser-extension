browser.runtime.onMessage.addListener(handleMessages);

const textEl = document.querySelector('#text');

async function handleMessages(message) {
  if (message.target !== 'offscreen-doc') {
    return;
  }

  switch (message.type) {
    case 'copy-data-to-clipboard':
      handleClipboardWrite(message.data);
      break;
    default:
      console.warn(`Unexpected message type received: '${message.type}'.`);
  }
}

function handleClipboardWrite(data) {
  try {
    if (typeof data !== 'string') {
      throw new TypeError(`Value provided must be a 'string', got '${typeof data}'.`);
    }
    textEl.value = data;
    textEl.select();
    document.execCommand('copy');
  } finally {
    window.close();
  }
}
