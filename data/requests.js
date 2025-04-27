const initialContactData = {
    requests: [
      {
        name: "Alex Johnson",
        subject: "Product Inquiry",
        email: "alex@example.com",
        message: "I'd like more information about your services.",
        date: "2025-04-20"
      },
      {
        name: "Sarah Miller",
        subject: "Support Request",
        email: "sarah@example.com",
        message: "I need help with my recent purchase.",
        date: "2025-04-22"
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

  
const allRequests =getContactRequests();
  
  
  