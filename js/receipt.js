
// === Helper to get URL params ===
function getOrderIdsFromUrl() {
    const params = new URLSearchParams(window.location.search);
    const idsParam = params.get('ids');
    if (!idsParam) return [];
    return idsParam.split(',').map(id => parseInt(id));
}

window.addEventListener('DOMContentLoaded', () => {
    const orderIds = getOrderIdsFromUrl(); // e.g., [1,2,3]
    const allOrders = JSON.parse(localStorage.getItem('orders')) || [];

    const matchedOrders = allOrders.filter(order => orderIds.includes(order.id));

    if (matchedOrders.length === 0) {
        document.querySelector('.card').innerHTML = '<div class="p-4">No orders found.</div>';
        return;
    }

    const tableBody = document.querySelector('tbody');
    const addressContainer = document.querySelector('address');
    const phoneLink = document.querySelector('a[href^="tel:"]');
    const emailLink = document.querySelector('a[href^="mailto:"]');

    // Clear static content
    tableBody.innerHTML = '';
    addressContainer.innerHTML = '';
    phoneLink.innerHTML = '';
    emailLink.innerHTML = '';

    let subtotal = 0;

    matchedOrders.forEach(order => {
        const itemTotal = order.totalPrice;
        subtotal += itemTotal;

        // Product Row
        const row = document.createElement('tr');
        row.innerHTML = `
                <td>
                    <div>${order.productName} × ${order.quantity}</div>
                    <div class="text-muted small">Order ID: ${order.id}</div>
                    <div class="text-muted small">Seller: ${order.sellerName}</div>
                    <div class="text-muted small">Order Date: ${new Date(order.orderDate).toLocaleDateString()}</div>
                </td>
                <td class="text-end">$${itemTotal.toFixed(2)}</td>
            `;
        tableBody.appendChild(row);
    });

    // Subtotal
    const subtotalRow = document.createElement('tr');
    subtotalRow.classList.add('border-top');
    subtotalRow.innerHTML = `
            <td>Subtotal:</td>
            <td class="text-end">$${subtotal.toFixed(2)}</td>
        `;
    tableBody.appendChild(subtotalRow);

    // Payment Method (hardcoded or dynamic if stored)
    const paymentRow = document.createElement('tr');
    paymentRow.innerHTML = `
            <td>Payment method:</td>
            <td class="text-end">Check payments</td>
        `;
    tableBody.appendChild(paymentRow);

    // Total
    const totalRow = document.createElement('tr');
    totalRow.innerHTML = `
            <td>Total:</td>
            <td class="text-end fw-bold">$${subtotal.toFixed(2)}</td>
        `;
    tableBody.appendChild(totalRow);

    // Use the first order for billing details (assuming all orders belong to the same user)
    const firstOrder = matchedOrders[0];
    addressContainer.innerHTML = `
            <div>${firstOrder.userName}</div>
            <div>${firstOrder.streetAddress}</div>
            <div>${firstOrder.city}</div>
            <div>${firstOrder.country}</div>
            <div>${firstOrder.postcode}</div>
            <div>Egypt</div>
        `;

    phoneLink.href = `tel:${firstOrder.phone}`;
    phoneLink.innerHTML = `<i class="bi bi-telephone me-2"></i>${firstOrder.phone}`;

    // You can fetch the user's email from sessionStorage or skip if not saved
    const user = JSON.parse(sessionStorage.getItem('currentUser'));
    if (user && user.email) {
        emailLink.href = `mailto:${user.email}`;
        emailLink.innerHTML = `<i class="bi bi-envelope me-2"></i>${user.email}`;
    } else {
        emailLink.remove();
    }
});

const backHome = document.getElementById("home-button");

backHome.addEventListener("click", function() {
    const user = JSON.parse(sessionStorage.getItem("currentUser"));
    if (user) {
        const userRole = user.role;
        if (userRole === "admin") {
            window.location.href = "admin.html"; // Redirect to admin page
        }
        else if (userRole === "seller") {
            window.location.href = "seller.html"; // Redirect to seller page
        } else if (userRole === "user") {
            window.location.href = "index.html"; // Redirect to user page
        } 
    } else {
        window.location.href = "index.html";
    }
     // Redirect to the home page
});
