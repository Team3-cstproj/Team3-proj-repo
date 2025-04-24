const initialAuthData = {
    // Admin 
    admin: {
      id: 1,
      username: "admin",
      email: "admin@example.com",
      password: "admin123", 
      role: "admin",
      name: "Admin User",
      joinDate: "2023-01-01"
    },
  
    // Sellers 
    sellers: [
      {
        id: 301,
        username: "seller1",
        email: "seller1@example.com",
        password: "seller123",
        role: "seller",
        name: "Fashion House",
        joinDate: "2023-02-15",
        storeName: "Men's Fashion Store",
        rating: 4.5,
        productsSold: 420
      },
      {
        id: 302,
        username: "seller2",
        email: "seller2@example.com",
        password: "seller123",
        role: "seller",
        name: "Ladies Boutique",
        joinDate: "2023-03-10",
        storeName: "Women's Accessories",
        rating: 4.2,
        productsSold: 380
      },
      {
        id: 303,
        username: "seller3",
        email: "seller3@example.com",
        password: "seller123",
        role: "seller",
        name: "Sports Gear",
        joinDate: "2023-04-05",
        storeName: "Sportswear Central",
        rating: 4.7,
        productsSold: 510
      },
      {
        id: 304,
        username: "seller4",
        email: "seller4@example.com",
        password: "seller123",
        role: "seller",
        name: "Denim Masters",
        joinDate: "2023-05-20",
        storeName: "Jeans & Co.",
        rating: 4.3,
        productsSold: 290
      }
    ],
  
    //  users 
    users: [
      {
        id: 501,
        username: "user1",
        email: "user1@example.com",
        password: "user123",
        role: "user",
        name: "John Doe",
        joinDate: "2023-06-01",
        orders: 5,
      },
      {
        id: 502,
        username: "user2",
        email: "user2@example.com",
        password: "user123",
        role: "user",
        name: "Jane Smith",
        joinDate: "2023-06-15",
        orders: 3,
      },
      {
        id: 503,
        username: "user3",
        email: "user3@example.com",
        password: "user123",
        role: "user",
        name: "Robert Johnson",
        joinDate: "2023-07-02",
        orders: 7,
      },
      {
        id: 504,
        username: "user4",
        email: "user4@example.com",
        password: "user123",
        role: "user",
        name: "Emily Davis",
        joinDate: "2023-07-20",
        orders: 2,
      },
      {
        id: 505,
        username: "user5",
        email: "user5@example.com",
        password: "user123",
        role: "user",
        name: "Michael Wilson",
        joinDate: "2023-08-05",
        orders: 4,
      }
    ]
  };
  
  function initializeAuthData() {
    if (!localStorage.getItem('authData')) {
      localStorage.setItem('authData', JSON.stringify(initialAuthData));
    }
    
    //  store users separately 
    if (!localStorage.getItem('users')) {
      const allUsers = [
        initialAuthData.admin,
        ...initialAuthData.sellers,
        ...initialAuthData.users
      ];
      localStorage.setItem('users', JSON.stringify(allUsers));
    }
  }
  
  initializeAuthData();
  
  // get data
  function getAuthData() {
    const authData = localStorage.getItem('authData');
    return authData ? JSON.parse(authData) : null;
  }
  //for authentication in log in and sign up
  function getAllUsers() {
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users) : [];
  }
  