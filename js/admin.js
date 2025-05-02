
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

//  Variable for Pagination
let currentOrdersPage = 1;
const ordersPerPage = 4;
let Total_sales = 0;
let Total_orders = 0;

function loadOrders(page = 1) {
  try {
    const allOrders = JSON.parse(localStorage.getItem('orders')) || [];
    const tableBody = document.getElementById('orders-table-body');
    
    if (!tableBody) {
      console.error('Element with ID "orders-table-body" not found');
      return;
    }
    
    tableBody.innerHTML = '';
    Total_sales = 0;
    Total_orders = 0;
    const uniqueCustomerIds = new Set();

    // Sort orders by order ID (most recent first)
    allOrders.sort((a, b) => b.id - a.id); // Sorting by order ID in descending order

    const startIndex = (page - 1) * ordersPerPage;
    const endIndex = startIndex + ordersPerPage;
    const ordersToShow = allOrders.slice(startIndex, endIndex);

    if (ordersToShow.length === 0) {
      tableBody.innerHTML = `
        <tr>
          <td colspan="7" class="text-center py-4">No orders found</td>
        </tr>
      `;
    } else {
      ordersToShow.forEach(order => {
        Total_sales += Number(order.totalPrice) || 0;
        Total_orders += Number(order.quantity) || 0;
        if (order.userId) uniqueCustomerIds.add(order.userId);

        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${order.id || 'N/A'}</td>
          <td>${order.userName || 'N/A'}</td>
          <td><a href="receipt.html?ids=${+order.id}" style="color:rgb(25, 48, 124); text-decoration: none;">${order.productName || 'N/A'}</a></td>
          <td>${order.quantity || '0'}</td>
          <td>${order.orderDate || 'N/A'}</td>
          <td>${order.sellerName || 'N/A'}</td>
          <td>$${(Number(order.totalPrice) || 0).toFixed(2)}</td>
        `;
        tableBody.appendChild(row);
      });
    }


    
    // Setup pagination
    setupOrdersPagination(allOrders.length, page);
  } catch (error) {
    console.error('Error in loadOrders:', error);
  }
}

function updateStatistics(sales, orders, customers) {
  const salesEl = document.getElementById('Totalsaless');
  const ordersEl = document.getElementById('numorders');
  const customersEl = document.getElementById('customers-number');
  
  if (salesEl) salesEl.textContent = `$${sales.toFixed(2)}`;
  if (ordersEl) ordersEl.textContent = orders;
  if (customersEl) customersEl.textContent = customers;
}
const orderss = JSON.parse(localStorage.getItem('orders')) || [];
let totalmoney = 0;
for (let i = 0; i < orderss.length; i++) {
  totalmoney += Number(orderss[i].totalPrice) || 0;
}
const authData = JSON.parse(localStorage.getItem('authData')) || {};
const users = authData.users || [];

window.onload = updateStatistics(totalmoney, orderss.length, users.length);

function setupOrdersPagination(totalOrders, currentPage) {
  try {
    const pagination = document.getElementById('orders-pagination');
    if (!pagination) {
      console.error('Pagination element not found');
      return;
    }

    pagination.innerHTML = '';
    const pageCount = Math.ceil(totalOrders / ordersPerPage);

    if (pageCount <= 1) return; // No need for pagination if only one page

    // prev
    const prevLi = createPageItem('‹ Prev', currentPage === 1, () => {
      if (currentPage > 1) loadOrders(currentPage - 1);
    });
    pagination.appendChild(prevLi);

    // Page numbers
    const visiblePages = Math.min(pageCount, 5); // Show up to 5 pages
    const pageRangeStart = Math.max(1, currentPage - 2);
    const pageRangeEnd = Math.min(pageCount, currentPage + 2);

    for (let i = pageRangeStart; i <= pageRangeEnd; i++) {
      const pageLi = createPageItem(i, false, () => {
        if (i !== currentPage) loadOrders(i);
      }, i === currentPage);
      pagination.appendChild(pageLi);
    }

    // next
    const nextLi = createPageItem('Next ›', currentPage === pageCount, () => {
      if (currentPage < pageCount) loadOrders(currentPage + 1);
    });
    pagination.appendChild(nextLi);
  } catch (error) {
    console.error('Error in setupOrdersPagination:', error);
  }
}

function createPageItem(text, isDisabled, onClick, isActive = false) {
  const li = document.createElement('li');
  li.className = `page-item ${isDisabled ? 'disabled' : ''} ${isActive ? 'active' : ''}`;
  
  const link = document.createElement('a');
  link.className = 'page-link';
  link.href = '#';
  link.textContent = text;
  if (isDisabled) link.tabIndex = -1;
  
  link.addEventListener('click', (e) => {
    e.preventDefault();
    if (!isDisabled) onClick();
  });
  
  li.appendChild(link);
  return li;
}

document.addEventListener('DOMContentLoaded', function() {
  loadOrders();
  updateCustomersCount();
}); 

// Clear session storage after log out
document.querySelector('.nav-link.text-danger').addEventListener('click', function(e) {
  e.preventDefault();
  sessionStorage.clear(); 
  window.location.href = 'login.html'; 
});
