const initialContactData = {
  requests: [
    {
      id: 1,
      name: "Alex Johnson",
      subject: "Product Inquiry",
      email: "alex@example.com",
      message: "I'd like more information about your services.",
      date: "2025-04-20",
      read: false
    },
    {
      id: 2,
      name: "Sarah Miller",
      subject: "Support Request",
      email: "sarah@example.com",
      message: "I need help with my recent purchase.",
      date: "2025-04-22",
      read: false
    },
    {
      id: 3,
      name: "Michael Brown",
      subject: "Order Status",
      email: "michael@example.com",
      message: "When will my order #12345 be shipped?",
      date: "2025-04-23",
      read: true
    },
    {
      id: 4,
      name: "Emily Davis",
      subject: "Return Request",
      email: "emily@example.com",
      message: "I would like to return a defective product.",
      date: "2025-04-24",
      read: false
    }
  ],
  replies: [
        {
      id: 501,
      name: "John Doe",
      subject: "replay to your request",
      email: "user1@example.com",
      message: "We are considring your request we will check it and response with in 48 hours"
    },
    {
      id: 502,
      name: "Jane Smith",
      subject:"replay to your request",
      email: "user2@example.com",
      message: "We are considring your request we will check it and response with in 48 hours"
        },
    {
      id: 503,
      name: "Robert Johnson",
      subject: "replay to your request",
      email: "user3@example.com",
      message: "We are considring your request we will check it and response with in 48 hours"
    }
    
  ]
};

function initializeContactData() {
  if (!localStorage.getItem('contactData')) {
    localStorage.setItem('contactData', JSON.stringify(initialContactData));
  }
}

initializeContactData();

function getContactRequests() {
  const contactData = localStorage.getItem('contactData');
  return contactData ? JSON.parse(contactData).requests : [];
}

function getContactReplies() {
  const contactData = localStorage.getItem('contactData');
  return contactData ? JSON.parse(contactData).replies : [];
}

const allRequests = getContactRequests();
const allReplies = getContactReplies();