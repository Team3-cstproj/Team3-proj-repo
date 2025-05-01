// <!-- Sidebar Toggle Script -->
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

    //  show & hidden icon mobile
    mobileMenuBtn?.addEventListener('click', function () {
      if (window.innerWidth < 768) {
        sidebar.classList.toggle('show');
      }
    });

// ----------------
 
// load localstorage in table
// function loadProducts() {
//   const products = JSON.parse(localStorage.getItem('products')) || [];
//   const tableBody = document.querySelector("tbody");
//   tableBody.innerHTML = ''; 

//   products.forEach((product) => {
//     const row = `
//       <tr>
//         <td>${product.id}</td> 
//         <td>${product.name}</td>
       
//         <td>${product.price}$</td>
//         <td>
//           <div class="remove-icon" onclick="removeProduct('${product.id}')">
//             <i class="fa-solid fa-xmark"></i>
//           </div>
//         </td>
//       </tr>
//     `;
//     tableBody.innerHTML += row;
//   });
// }
// function removeProduct(productId) {
//   const products = JSON.parse(localStorage.getItem('products')) || [];
//   const updatedProducts = products.filter(product => String(product.id) !== productId);
//   localStorage.setItem('products', JSON.stringify(updatedProducts)); 
//   loadProducts(); 
// }
// loadProducts();



//-------------------------
 
// متغيرات الترقيم الصفحي
let currentPage = 1;
const productsPerPage = 8; // عدد المنتجات في كل صفحة

document.addEventListener('DOMContentLoaded', function() {
  loadProducts();
});

function loadProducts(page = 1) {
  const products = JSON.parse(localStorage.getItem('products')) || [];
  const tableBody = document.querySelector("tbody");
  tableBody.innerHTML = ''; 

  // حساب العناصر للصفحة الحالية
  const startIndex = (page - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const paginatedProducts = products.slice(startIndex, endIndex);

  // عرض المنتجات للصفحة الحالية
  if (paginatedProducts.length === 0) {
    tableBody.innerHTML = `
      <tr>
        <td colspan="4" class="text-center py-4">No products found</td>
      </tr>
    `;
  } else {
    paginatedProducts.forEach((product) => {
      const row = `
        <tr>
          <td>${product.id}</td> 
          <td>${product.name}</td>
          <td>${product.price}$</td>
          <td>
            <div class="remove-icon" onclick="removeProduct('${product.id}')">
              <i class="fa-solid fa-xmark"></i>
            </div>
          </td>
        </tr>
      `;
      tableBody.innerHTML += row;
    });
  }

  // إنشاء أزرار الترقيم الصفحي
  setupPaginationButtons(products.length, page);
}

function setupPaginationButtons(totalProducts, currentPage) {
  const paginationContainer = document.getElementById('pagination');
  if (!paginationContainer) return;

  paginationContainer.innerHTML = '';
  const pageCount = Math.ceil(totalProducts / productsPerPage);

  // زر الصفحة السابقة
  const prevLi = document.createElement('li');
  prevLi.className = 'page-item' + (currentPage === 1 ? ' disabled' : '');
  prevLi.innerHTML = `
    <a class="page-link modern-btn" href="#" aria-label="Previous" ${currentPage === 1 ? 'tabindex="-1"' : ''}>
      <span aria-hidden="true">‹ Prev</span>
    </a>
  `;
  prevLi.addEventListener('click', (e) => {
    if (currentPage > 1) {
      e.preventDefault();
      loadProducts(currentPage - 1);
    }
  });
  paginationContainer.appendChild(prevLi);

      // أرقام الصفحات
      for (let i = 1; i <= Math.min(2, pageCount); i++) {
        const pageLi = document.createElement('li');
        pageLi.className = `page-item ${i === currentPage ? 'active' : ''}`;
        pageLi.innerHTML = `<a class="page-link modern-btn" href="#">${i}</a>`;
        pageLi.addEventListener('click', (e) => {
            e.preventDefault();
            if (i !== currentPage) {
                loadProducts(i);
            }
        });
        pagination.appendChild(pageLi);
    }

  // زر الصفحة التالية
  const nextLi = document.createElement('li');
  nextLi.className = 'page-item' + (currentPage === pageCount ? ' disabled' : '');
  nextLi.innerHTML = `
    <a class="page-link modern-btn" href="#" aria-label="Next" ${currentPage === pageCount ? 'tabindex="-1"' : ''}>
      <span aria-hidden="true">Next ›</span>
    </a>
  `;
  nextLi.addEventListener('click', (e) => {
    if (currentPage < pageCount) {
      e.preventDefault();
      loadProducts(currentPage + 1);
    }
  });
  paginationContainer.appendChild(nextLi);
}

function removeProduct(productId) {
  const products = JSON.parse(localStorage.getItem('products')) || [];
  const updatedProducts = products.filter(product => String(product.id) !== productId);
  localStorage.setItem('products', JSON.stringify(updatedProducts));
  
  // إعادة حساب الصفحة الحالية بعد الحذف
  const remainingProducts = updatedProducts.length;
  const pageCount = Math.ceil(remainingProducts / productsPerPage);
  if (currentPage > pageCount) {
    currentPage = Math.max(1, pageCount);
  }
  
  loadProducts(currentPage);
}