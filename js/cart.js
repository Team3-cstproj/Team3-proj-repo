
// Get cart data from sessionStorage
let cartData = JSON.parse(sessionStorage.getItem('cart')) || { count: 0, items: [], total: 0 };

// Elements
const cartTableBody = document.querySelector('.cart_table tbody');
const cartTotals = document.querySelector('.cart-totals');

// Render cart items
function renderCart() {
    cartTableBody.innerHTML = '';

    cartData.items.forEach((item, index) => {
        const row = document.createElement('tr');
        row.setAttribute('data-index', index);

        row.innerHTML = `
      <td>
        <div class="remove-icon">
          <i class="fa-solid fa-xmark"></i>
        </div>
      </td>
      <td>
        <img src="${item.img}" alt="Product Image" width="50">
      </td>
      <td>${item.name}</td>
      <td class="price" data-price="${item.price}">$${item.price}</td>
      <td>
        <input type="number" class="quantity-input" value="${item.quantity}" min="1" data-price="${item.price}">
      </td>
      <td class="subtotal">$${item.price * item.quantity}</td>
    `;

        cartTableBody.appendChild(row);
    });

    updateCartTotal();
}

// Update cart total price and subtotal fields
function updateCartTotal() {
    let subtotal = 0;

    cartData.items.forEach(item => {
        subtotal += item.price * item.quantity;
    });

    cartData.total = subtotal;

    // Update Cart Totals Section
    const cartTotalsBody = cartTotals.querySelector('tbody');
    cartTotalsBody.innerHTML = `
    <tr><td>Subtotal: $${subtotal}</td></tr>
    <tr><td>Total: $${subtotal}</td></tr>
  `;

    saveCart();
}

// Save updated cart data into sessionStorage
function saveCart() {
    // Update the count based on total quantities
    cartData.count = cartData.items.reduce((acc, item) => acc + item.quantity, 0);
    sessionStorage.setItem('cart', JSON.stringify(cartData));
}

// Remove item from cart
function removeItem(index) {
    cartData.items.splice(index, 1);
    saveCart();
    renderCart();
}

// Handle events (remove or update quantity)
cartTableBody.addEventListener('click', function (e) {
    if (e.target.classList.contains('fa-xmark')) {
        const index = +e.target.closest('tr').getAttribute('data-index');
        removeItem(index);
    }
});

cartTableBody.addEventListener('change', function (e) {
    if (e.target.classList.contains('quantity-input')) {
        const quantity = +e.target.value;
        const index = +e.target.closest('tr').getAttribute('data-index');

        if (quantity < 1) return; // Optional: prevent quantity < 1

        cartData.items[index].quantity = quantity;

        updateCartTotal();
        renderCart();
    }
});

// Initial render
renderCart();

// Get the checkout button
const checkoutButton = document.querySelector('.checkout-btn');

// Add click event
checkoutButton.addEventListener('click', function () {
  const currentUser = sessionStorage.getItem('currentUser');

  if (currentUser) {
    // User is logged in → go to checkout page
    window.location.href = 'checkout.html';
  } else {
    // No user → go to login page
    window.location.href = 'login.html';
  }
});
