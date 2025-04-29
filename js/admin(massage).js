

    // Sidebar Toggle Script 
const toggleBtn = document.getElementById('toggle-btn');
const sidebar = document.getElementById('sidebar');
const mainContent = document.getElementById('main');
const mobileMenuBtn = document.getElementById('mobile-menu-btn');

// show & hidden icon Desktop
toggleBtn?.addEventListener('click', function () {
  if (window.innerWidth >= 768) {
    sidebar.classList.toggle('collapsed');
    mainContent.classList.toggle('collapsed');
  }
  if (window.innerWidth < 768) {
    sidebar.classList.toggle('show');
  }
});

// show & hidden icon mobile
mobileMenuBtn?.addEventListener('click', function () {
  if (window.innerWidth < 768) {
    sidebar.classList.toggle('show');
  }
});


///////////////////////////////
///////////////////////////////////
document.addEventListener('DOMContentLoaded', function() {
  // Initialize modal
  const replyModal = new bootstrap.Modal(document.getElementById('replyModal'));
  
  // Load messages from localStorage
  loadMessages();
  
  // Filter messages
  document.querySelectorAll('.filter-option').forEach(option => {
    option.addEventListener('click', function(e) {
      e.preventDefault();
      const filter = this.getAttribute('data-filter');
      filterMessages(filter);
    });
  });
  
  // Search messages
  document.getElementById('search-messages').addEventListener('input', function() {
    searchMessages(this.value);
  });
  
  // Mark all as read
  document.getElementById('mark-all-read').addEventListener('click', function() {
    markAllAsRead();
  });
  
  // Delete selected
  document.getElementById('delete-selected').addEventListener('click', function() {
    deleteSelectedMessages();
  });
  
  // Select all checkbox
  document.getElementById('select-all').addEventListener('change', function() {
    const checkboxes = document.querySelectorAll('#messages-table-body input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
      checkbox.checked = this.checked;
    });
  });
  
  // Send reply
  document.getElementById('send-reply').addEventListener('click', function() {
    sendReply();
    replyModal.hide();
  });
});

function loadMessages() {
  const messagesTable = document.getElementById('messages-table-body');
  messagesTable.innerHTML = '';
  
  // Get messages from localStorage
  const contactData = JSON.parse(localStorage.getItem('contactData'));
  const messages = contactData?.requests || [];
  
  // Add each message to the table
  messages.forEach((message, index) => {
    const row = document.createElement('tr');
    if (!message.read) {
      row.classList.add('unread');
    }
    
    row.innerHTML = `
      <td><input type="checkbox" class="message-checkbox" data-id="${index}"></td>
      <td>${index + 1}</td>
      <td>${message.name}</td>
      <td>${message.email}</td>
      <td><span class="message-preview" title="${message.subject}">${message.subject}</span></td>
      <td>${message.date}</td>
      <td>
        <span class="badge ${message.read ? 'bg-success' : 'bg-warning text-dark'} status-badge">
          ${message.read ? 'Read' : 'Unread'}
        </span>
      </td>
      <td>
        <button class="btn btn-sm btn-outline-primary btn-action reply-btn" data-id="${index}" title="Reply">
          <i class="fas fa-reply"></i>
        </button>
        <button class="btn btn-sm btn-outline-danger btn-action delete-btn" data-id="${index}" title="Delete">
          <i class="fas fa-trash-alt"></i>
        </button>
        ${!message.read ? `
        <button class="btn btn-sm btn-outline-success btn-action mark-read-btn" data-id="${index}" title="Mark as read">
          <i class="fas fa-check"></i>
        </button>
        ` : ''}
      </td>
    `;
    
    messagesTable.appendChild(row);
  });
  
  // Add event listeners to action buttons
  document.querySelectorAll('.reply-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      openReplyModal(parseInt(this.getAttribute('data-id')));
    });
  });
  
  document.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      deleteMessage(parseInt(this.getAttribute('data-id')));
    });
  });
  
  document.querySelectorAll('.mark-read-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      markAsRead(parseInt(this.getAttribute('data-id')));
    });
  });
}

function openReplyModal(messageId) {
  const contactData = JSON.parse(localStorage.getItem('contactData'));
  const message = contactData.requests[messageId];
  
  document.getElementById('original-message').innerHTML = `
    <p><strong>From:</strong> ${message.name} &lt;${message.email}&gt;</p>
    <p><strong>Subject:</strong> ${message.subject}</p>
    <p><strong>Date:</strong> ${message.date}</p>
    <hr>
    <p>${message.message}</p>
  `;
  
  document.getElementById('message-id').value = messageId;
  document.getElementById('reply-subject').value = `Re: ${message.subject}`;
  document.getElementById('reply-message').value = '';
  
  const replyModal = new bootstrap.Modal(document.getElementById('replyModal'));
  replyModal.show();
}

function sendReply() {
  const messageId = document.getElementById('message-id').value;
  const subject = document.getElementById('reply-subject').value;
  const message = document.getElementById('reply-message').value;
  
  // Get current data
  const contactData = JSON.parse(localStorage.getItem('contactData'));
  const originalMessage = contactData.requests[messageId];
  
  // Create reply object
  const reply = {
    originalMessageId: messageId,
    to: originalMessage.email,
    from: "admin@example.com",
    subject: subject,
    message: message,
    date: new Date().toISOString().split('T')[0],
    read: false
  };
  
  // Add reply to storage (you might want a separate storage for replies)
  if (!contactData.replies) {
    contactData.replies = [];
  }
  contactData.replies.push(reply);
  
  // Mark original as read
  contactData.requests[messageId].read = true;
  
  // Save back to localStorage
  localStorage.setItem('contactData', JSON.stringify(contactData));
  
  // Reload messages
  loadMessages();
  
}

function markAsRead(messageId) {
  const contactData = JSON.parse(localStorage.getItem('contactData'));
  contactData.requests[messageId].read = true;
  localStorage.setItem('contactData', JSON.stringify(contactData));
  loadMessages();
}

function markAllAsRead() {
  const contactData = JSON.parse(localStorage.getItem('contactData'));
  contactData.requests.forEach(message => {
    message.read = true;
  });
  localStorage.setItem('contactData', JSON.stringify(contactData));
  loadMessages();
}

function deleteMessage(messageId) {
  if (true) {
    const contactData = JSON.parse(localStorage.getItem('contactData'));
    contactData.requests.splice(messageId, 1);
    localStorage.setItem('contactData', JSON.stringify(contactData));
    loadMessages();
  }
}

function deleteSelectedMessages() {
  const checkboxes = document.querySelectorAll('#messages-table-body input[type="checkbox"]:checked');
  if (checkboxes.length === 0) {
    return;
  }
  
  if (true) {
    const contactData = JSON.parse(localStorage.getItem('contactData'));
    
    const idsToDelete = Array.from(checkboxes).map(cb => parseInt(cb.getAttribute('data-id'))).sort((a, b) => b - a);
    
    idsToDelete.forEach(id => {
      contactData.requests.splice(id, 1);
    });
    
    localStorage.setItem('contactData', JSON.stringify(contactData));
    loadMessages();
    document.getElementById('select-all').checked = false;
  }
}

function filterMessages(filter) {
  const rows = document.querySelectorAll('#messages-table-body tr');
  
  rows.forEach(row => {
    const isRead = row.querySelector('.bg-success') !== null;
    
    switch(filter) {
      case 'all':
        row.style.display = '';
        break;
      case 'read':
        row.style.display = isRead ? '' : 'none';
        break;
      case 'unread':
        row.style.display = isRead ? 'none' : '';
        break;
    }
  });
}

function searchMessages(query) {
  const rows = document.querySelectorAll('#messages-table-body tr');
  const searchTerm = query.toLowerCase();
  
  rows.forEach(row => {
    const text = row.textContent.toLowerCase();
    row.style.display = text.includes(searchTerm) ? '' : 'none';
  });
}