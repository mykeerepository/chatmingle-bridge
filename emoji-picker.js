function createEmojiPicker() {
  const recentEmojis = ['😍', '💚', '😝', '😢'];
  const smileysAndPeople = [
    '😀', '😃', '😄', '😁', '😅', '🥹', '😂', '🤣',
    '😊', '😢', '😉', '😌', '😇', '🙂', '😈', '😊'
  ];

  return `
    <div class="emoji-picker">
      <div class="emoji-picker-header">
        <div class="emoji-search">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <input type="text" placeholder="Search emoji" />
        </div>
        <div class="emoji-categories">
          <button class="active">😀</button>
          <button>GIF</button>
          <button>👤</button>
          <button>📎</button>
        </div>
      </div>
      <div class="emoji-sections">
        <div class="emoji-section">
          <h3>Frequently Used</h3>
          <div class="emoji-grid">
            ${recentEmojis.map(emoji => `
              <button class="emoji-btn">${emoji}</button>
            `).join('')}
          </div>
        </div>
        <div class="emoji-section">
          <h3>Smileys & People</h3>
          <div class="emoji-grid">
            ${smileysAndPeople.map(emoji => `
              <button class="emoji-btn">${emoji}</button>
            `).join('')}
          </div>
        </div>
      </div>
    </div>
  `;
}

function initializeEmojiPicker() {
  const messageInput = document.getElementById('messageInput');
  const emojiButton = document.querySelector('.emoji-button');
  let emojiPickerVisible = false;
  let emojiPickerElement = null;

  emojiButton.addEventListener('click', () => {
    if (emojiPickerVisible) {
      emojiPickerElement.remove();
      emojiPickerVisible = false;
    } else {
      emojiPickerElement = document.createElement('div');
      emojiPickerElement.innerHTML = createEmojiPicker();
      emojiPickerElement.classList.add('emoji-picker-container');
      document.querySelector('.message-input-container').appendChild(emojiPickerElement);
      emojiPickerVisible = true;

      // Add click handlers for emoji buttons
      const emojiButtons = emojiPickerElement.querySelectorAll('.emoji-btn');
      emojiButtons.forEach(btn => {
        btn.addEventListener('click', () => {
          const emoji = btn.textContent;
          const start = messageInput.selectionStart;
          const end = messageInput.selectionEnd;
          const text = messageInput.value;
          messageInput.value = text.substring(0, start) + emoji + text.substring(end);
          messageInput.focus();
          messageInput.selectionStart = messageInput.selectionEnd = start + emoji.length;
        });
      });
    }
  });

  // Close emoji picker when clicking outside
  document.addEventListener('click', (e) => {
    if (emojiPickerVisible && !e.target.closest('.emoji-picker-container') && !e.target.closest('.emoji-button')) {
      emojiPickerElement.remove();
      emojiPickerVisible = false;
    }
  });
}

export { initializeEmojiPicker };