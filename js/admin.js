

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

// let Total_sales = 0;
// let Total_orders=0;
// function loadOrders() {
//   const orders = JSON.parse(localStorage.getItem('orders')) || [];
//   const tableBody = document.getElementById('orders-table-body');
  
//   tableBody.innerHTML = '';
//   Total_sales = 0;
// Total_orders=0;

//   orders.forEach(order => {

//     Total_sales += Number(order.totalPrice) || 0;
//     Total_orders += Number(order.quantity) || 0;

//     const row = document.createElement('tr');
//     row.innerHTML = `
//       <td>${order.id || 'N/A'}</td>
//       <td>${order.userName || 'N/A'}</td>
//       <td><a href=receipt.html?ids=${+order.id}>${order.productName || 'N/A'}</a></td>
//       <td>${order.quantity || '0'}</td>
//       <td>${order.orderDate || 'N/A'}</td>
//       <td>${order.sellerName || 'N/A'}</td>
//       <td>$${(Number(order.totalPrice) || 0).toFixed(2)}</td>
//     `;
//     tableBody.appendChild(row);
//   });

//   document.getElementById('Totalsaless').textContent = `$${Total_sales.toFixed(2)}`;
//   document.getElementById('numorders').textContent = `${Total_orders}`;
// }

// function updateCustomersCount() {
//   const orders = JSON.parse(localStorage.getItem('orders')) || [];
//   //  calculate numberCustomer an unique
//   const uniqueCustomerIds = new Set();

//   orders.forEach(order => {
//     if (order.userId) {
//       uniqueCustomerIds.add(order.userId);
//     }
//   });
//    document.getElementById('customers-number').textContent = uniqueCustomerIds.size;
// }
// function logout() {
//   // sessionStorage.removeItem('currentUser');
//   // window.location.href = 'login.html';
//   sessionStorage.clear();
// }
// document.addEventListener('DOMContentLoaded', function() {
//   loadOrders();
//   updateCustomersCount();
//   logout();
// });

//------------------------

// متغيرات الترقيم الصفحي
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
          
  <td><a href="receipt.html?ids=${+order.id}" style="color:rgb(25, 48, 124);  text-decoration: none;" >${order.productName || 'N/A'}</a></td>
          <td>${order.quantity || '0'}</td>
          <td>${order.orderDate || 'N/A'}</td>
          <td>${order.sellerName || 'N/A'}</td>
          <td>$${(Number(order.totalPrice) || 0).toFixed(2)}</td>
        `;
        tableBody.appendChild(row);
      });
    }

    // تحديث الإحصائيات
    updateStatistics(Total_sales, Total_orders, uniqueCustomerIds.size);
    
    // إعداد الترقيم الصفحي
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

function setupOrdersPagination(totalOrders, currentPage) {
  try {
    const pagination = document.getElementById('orders-pagination');
    if (!pagination) {
      console.error('Pagination element not found');
      return;
    }
    
    pagination.innerHTML = '';
    const pageCount = Math.ceil(totalOrders / ordersPerPage);

    if (pageCount <= 1) return; // لا داعي للترقيم إذا كانت صفحة واحدة

    // زر السابق
    const prevLi = createPageItem('‹ Prev', currentPage === 1, () => {
      if (currentPage > 1) loadOrders(currentPage - 1);
    });
    pagination.appendChild(prevLi);

    // أرقام الصفحات
for (let i = 1; i <= Math.min(2, pageCount); i++) {
  const pageLi = createPageItem(i, false, () => {
    if (i !== currentPage) loadOrders(i);
  }, i === currentPage);
  pagination.appendChild(pageLi);
}

    // زر التالي
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
});