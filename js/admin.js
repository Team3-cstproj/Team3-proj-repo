

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

//----------------------

let Total_sales = 0;
let Total_orders=0;
function loadOrders() {
  const orders = JSON.parse(localStorage.getItem('orders')) || [];
  const tableBody = document.getElementById('orders-table-body');
  
  tableBody.innerHTML = '';
  Total_sales = 0;
Total_orders=0;

  orders.forEach(order => {

    Total_sales += Number(order.totalPrice) || 0;
    Total_orders += Number(order.quantity) || 0;

    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${order.id || 'N/A'}</td>
      <td>${order.userName || 'N/A'}</td>
      <td>${order.productName || 'N/A'}</td>
      <td>${order.quantity || '0'}</td>
      <td>${order.orderDate || 'N/A'}</td>
      <td>${order.sellerName || 'N/A'}</td>
      <td>$${(Number(order.totalPrice) || 0).toFixed(2)}</td>
    `;
    tableBody.appendChild(row);
  });

  document.getElementById('Totalsaless').textContent = `$${Total_sales.toFixed(2)}`;
  document.getElementById('numorders').textContent = `$${Total_orders}`;
}

function updateCustomersCount() {
  const orders = JSON.parse(localStorage.getItem('orders')) || [];
  //  calculate numberCustomer an unique
  const uniqueCustomerIds = new Set();

  orders.forEach(order => {
    if (order.userId) {
      uniqueCustomerIds.add(order.userId);
    }
  });
   document.getElementById('customers-number').textContent = uniqueCustomerIds.size;
}

document.addEventListener('DOMContentLoaded', function() {
  loadOrders();
  updateCustomersCount();
});