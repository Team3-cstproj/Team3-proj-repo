

// Sidebar Toggle Script
const toggleBtn = document.getElementById('toggle-btn');
const sidebar = document.getElementById('sidebar');
const mainContent = document.getElementById('main');
const mobileMenuBtn = document.getElementById('mobile-menu-btn');

// Show & Hide Sidebar on Desktop
toggleBtn?.addEventListener('click', function () {
  if (window.innerWidth >= 768) {
    sidebar.classList.toggle('collapsed');
    mainContent.classList.toggle('collapsed');
  }
  if (window.innerWidth < 768) {
    sidebar.classList.toggle('show');
  }
});

// Show & Hide Sidebar on Mobile
mobileMenuBtn?.addEventListener('click', function () {
  if (window.innerWidth < 768) {
    sidebar.classList.toggle('show');
  }
});
//load localstorage
function loadOrders() {
  const orders = JSON.parse(localStorage.getItem('orders')) || [];
  const tableBody = document.getElementById('orders-table-body');
  tableBody.innerHTML = '';
  
  orders.forEach(order => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${order.id || 'N/A'}</td>
      <td>${order.username}</td>
      <td>${order.productName}</td>
      <td>${order.quantity || '0'}</td>
      <td>${order.orderDate || 'N/A'}</td>
      <td>${order.sellerName || 'N/A'}</td>
      <td>$${order.totalPrice?.toFixed(2) || '0.00'}</td>
    `;
    tableBody.appendChild(row);
  });
}


// Update localStorage
function updateCustomersCount() {
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const customersCount = users.filter(user => user.role === 'customer').length;
  document.getElementById('customers-number').textContent = customersCount;
}


document.addEventListener('DOMContentLoaded', function() {
  loadOrders();
  updateCustomersCount();
});