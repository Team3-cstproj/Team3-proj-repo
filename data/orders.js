const intialOrders = [
    {
        id: 1,
        userId: 501,
        userName: "user1",
        sellerId: 201,
        sellerName: "seller1",
        productId: 101,
        productName: "Classic Denim Hoodie",
        quantity: 2,
        orderDate: "2023-06-10",
        totalPrice: 49.98,
        country: "USA",
        city: "New York",
        address: "123 Main St",
        postalCode: "10001",
        phone: "123-456-7890"
    },
    {
        id: 2,
        userId: 502,
        userName: "user2",
        sellerId: 202,
        sellerName: "seller2",
        productId: 102,
        productName: "Leather Jacket",
        quantity: 1,
        orderDate: "2023-06-12",
        totalPrice: 89.99,
        country: "USA",
        city: "New York",
        address: "123 Main St",
        postalCode: "10001",
        phone: "123-456-7890"
    },
    {
        id: 3,
        userId: 503,
        userName: "user3",
        sellerId: 203,
        sellerName: "seller3",
        productId: 103,
        productName: "Running Shoes",
        quantity: 1,
        orderDate: "2023-06-15",
        totalPrice: 59.99,
        country: "USA",
        city: "New York",
        address: "123 Main St",
        postalCode: "10001",
        phone: "123-456-7890"
    },
    {
        id: 4,
        userId: 504,
        userName: "user4",
        sellerId: 204,
        sellerName: "seller4",
        productId: 104,
        productName: "Casual Sneakers",
        quantity: 2,
        orderDate: "2023-06-18",
        totalPrice: 79.98, 
        country: "USA",
        city: "New York",
        address: "123 Main St",
        postalCode: "10001",
        phone: "123-456-7890",
        country: "USA",
        city: "New York",
        address: "123 Main St",
        postalCode: "10001",
        phone: "123-456-7890"
        
    },
    {
        id: 5,
        userId: 505,
        userName: "user5",
        sellerId: 205,
        sellerName: "seller5",
        productId: 105,
        productName: "Stylish Sunglasses",
        quantity: 1,
        orderDate: "2023-06-20",
        totalPrice: 29.99,
        country: "USA",
        city: "New York",
        address: "123 Main St",
        postalCode: "10001",
        phone: "123-456-7890"
    }
    ,
    {
        id: 6,
        userId: 501,
        userName: "user1",
        sellerId: 206,
        sellerName: "seller6",
        productId: 106,
        productName: "Winter Jacket",
        quantity: 1,
        orderDate: "2023-06-22",
        totalPrice: 99.99,
        country: "USA",
        city: "New York",
        address: "123 Main St",
        postalCode: "10001",
        phone: "123-456-7890"
    },
    {
        id: 7,
        userId: 502,
        userName: "user2",
        sellerId: 207,
        sellerName: "seller7",
        productId: 107,
        productName: "Leather Boots",
        quantity: 1,
        orderDate: "2023-06-25",
        totalPrice: 129.99,
        country: "USA",
        city: "New York",
        address: "123 Main St",
        postalCode: "10001",
        phone: "123-456-7890"
    },
    {
        id: 8,
        userId: 503,
        userName: "user3",
        sellerId: 208,
        sellerName: "seller8",
        productId: 108,
        productName: "Sports Watch",
        quantity: 1,
        orderDate: "2023-06-28",
        totalPrice: 199.99,
        country: "USA",
        city: "New York",
        address: "123 Main St",
        postalCode: "10001",
        phone: "123-456-7890"
    }
];


function initializeData() {
    if (!localStorage.getItem('orders')) {
        localStorage.setItem('orders', JSON.stringify(intialOrders));
    }
}

initializeData();


function getAllOrders() {
  const orders = localStorage.getItem('orders');
  return orders ? JSON.parse(orders) : [];
}
const allOrders = getAllOrders();
