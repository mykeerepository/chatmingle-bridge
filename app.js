const messages = [
  {
    id: "1",
    userId: "1",
    username: "Mykee",
    avatar: "",
    lastMessage: "The nature here is fantastic!!",
    timestamp: "11:28 PM",
    isOnline: true,
  },
  {
    id: "2",
    userId: "2",
    username: "Alex Winter",
    avatar: "",
    lastMessage: "Hey, how's it going?",
    timestamp: "10:15 PM",
    isOnline: false,
  },
  {
    id: "3",
    userId: "3",
    username: "Sam Spring",
    avatar: "",
    lastMessage: "See you tomorrow!",
    timestamp: "9:45 PM",
    isOnline: true,
  },
];

const users = {
  "1": {
    username: "Mykee",
    avatar: "",
    status: "Active now",
  },
  "2": {
    username: "Alex Winter",
    avatar: "",
    status: "Offline",
  },
  "3": {
    username: "Sam Spring",
    avatar: "",
    status: "Active now",
  },
};

const gradients = [
  "linear-gradient(135deg, #9b87f5 0%, #7E69AB 100%)",
  "linear-gradient(135deg, #D946EF 0%, #8B5CF6 100%)",
  "linear-gradient(135deg, #6E59A5 0%, #E5DEFF 100%)",
];

function getGradientBackground(index) {
  return gradients[index % gradients.length];
}

function createAvatar(user, index) {
  if (user.avatar) {
    return `<img src="${user.avatar}" alt="${user.username}" />`;
  }
  return `<span style="background: ${getGradientBackground(index)}">${user.username[0]}</span>`;
}

function createChatItem(message, index) {
  return `
    <div class="chat-item" data-user-id="${message.userId}">
      <div class="avatar">
        ${createAvatar(message, index)}
        ${message.isOnline ? '<span class="online-indicator"></span>' : ''}
      </div>
      <div class="chat-item-content">
        <div class="chat-item-header">
          <span class="username">${message.username}</span>
          <span class="timestamp">${message.timestamp}</span>
        </div>
        <p class="last-message">${message.lastMessage}</p>
      </div>
    </div>
  `;
}

function renderChatList() {
  const chatListContent = document.getElementById('chatListContent');
  chatListContent.innerHTML = messages.map((message, index) => createChatItem(message, index)).join('');
}

function updateChatView(userId) {
  const chatView = document.getElementById('chatView');
  const chatViewContent = document.getElementById('chatViewContent');
  const chatViewPlaceholder = document.getElementById('chatViewPlaceholder');
  const chatViewUsername = document.getElementById('chatViewUsername');
  const chatViewStatus = document.getElementById('chatViewStatus');
  const chatViewAvatar = document.getElementById('chatViewAvatar');

  if (!userId) {
    chatViewContent.classList.add('hidden');
    chatViewPlaceholder.classList.remove('hidden');
    return;
  }

  const user = users[userId];
  const index = parseInt(userId) - 1;

  chatViewContent.classList.remove('hidden');
  chatViewPlaceholder.classList.add('hidden');
  chatViewUsername.textContent = user.username;
  chatViewStatus.textContent = user.status;
  chatViewAvatar.innerHTML = createAvatar(user, index);

  // Update active state in chat list
  const chatItems = document.querySelectorAll('.chat-item');
  chatItems.forEach(item => {
    item.classList.toggle('active', item.dataset.userId === userId);
  });

  // Show chat view on mobile
  if (window.innerWidth <= 768) {
    chatView.classList.add('active');
  }
}

function initializeEventListeners() {
  // Chat item click handler
  document.getElementById('chatListContent').addEventListener('click', (e) => {
    const chatItem = e.target.closest('.chat-item');
    if (chatItem) {
      const userId = chatItem.dataset.userId;
      updateChatView(userId);
    }
  });

  // Back button handler
  document.getElementById('backButton').addEventListener('click', () => {
    const chatView = document.getElementById('chatView');
    chatView.classList.remove('active');
  });

  // Message input auto-resize
  const messageInput = document.getElementById('messageInput');
  if (messageInput) {
    messageInput.addEventListener('input', function() {
      this.style.height = 'auto';
      this.style.height = (this.scrollHeight) + 'px';
      // Limit maximum height
      if (this.scrollHeight > 120) {
        this.style.height = '120px';
      }
    });

    // Handle Enter key (Send on Enter, new line on Shift+Enter)
    messageInput.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        const message = this.value.trim();
        if (message) {
          // Here you would typically send the message
          console.log('Sending message:', message);
          this.value = '';
          this.style.height = 'auto';
        }
      }
    });
  }

  // Send button handler
  const sendButton = document.querySelector('.send-button');
  if (sendButton) {
    sendButton.addEventListener('click', () => {
      const messageInput = document.getElementById('messageInput');
      const message = messageInput.value.trim();
      if (message) {
        // Here you would typically send the message
        console.log('Sending message:', message);
        messageInput.value = '';
        messageInput.style.height = 'auto';
      }
    });
  }
}

// Initialize the emoji picker
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
          <h3>Recents</h3>
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

// Expose necessary functions to window object
window.renderChatList = renderChatList;
window.initializeEventListeners = initializeEventListeners;

// Remove the DOMContentLoaded event listener from here since we're handling it in index.html
