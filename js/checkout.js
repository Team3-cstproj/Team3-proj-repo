






function validateOrder(event) {
    const form = event.target;
    if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
        form.classList.add('was-validated');
        return false;
    }
    placeOrder(); // Call the placeOrder function if validation is successful
    
    
}

// function to display the order summary

// ===== Display cart items in checkout page =====

window.addEventListener('DOMContentLoaded', function() {
    // Get cart from sessionStorage
    const cart = JSON.parse(sessionStorage.getItem('cart')) || { items: [], total: 0, count: 0 };

    // Get the tbody element
    const orderItems = document.getElementById('orderItems');

    // Initialize subtotal
    let subtotal = 0;

    // Clear any existing content
    orderItems.innerHTML = '';

    // Loop through the cart items and add them to the table
    cart.items.forEach(item => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name} × ${item.quantity}</td>
            <td class="text-end">$${itemTotal.toFixed(2)}</td>
        `;
        orderItems.appendChild(row);
    });

    // Add Subtotal row
    const subtotalRow = document.createElement('tr');
    subtotalRow.innerHTML = `
        <th>Subtotal</th>
        <td class="text-end">$${subtotal.toFixed(2)}</td>
    `;
    orderItems.appendChild(subtotalRow);

    // Add Total row (you can include taxes if you want separately)
    const totalRow = document.createElement('tr');
    totalRow.innerHTML = `
        <th>Total</th>
        <td class="text-end">$${subtotal.toFixed(2)}</td>
    `;
    orderItems.appendChild(totalRow);
});


function placeOrder() {
    const cart = JSON.parse(sessionStorage.getItem('cart'));
    console.log(cart);

    if (!cart || !cart.items || cart.items.length === 0) {
        alert('Cart is empty!');
        return;
    }

    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    console.log(orders);

    const products = JSON.parse(localStorage.getItem('products')) || [];
    console.log(products);

    const currentDate = new Date().toISOString().slice(0, 10); // Format: YYYY-MM-DD

    const customer = JSON.parse(sessionStorage.getItem('currentUser'));
    let customerId = customer.id;
    console.log(customerId);

    cart.items.forEach(item => {
        console.log(item);

        const product = products.find(p => p.id === item.id);
        console.log(product);

        if (!product) {
            console.error(`Product with ID ${item.id} not found in products`);
            return;
        }

        let sellerId = product.sellerId; // ✅ use product.sellerId
        console.log(sellerId);

        let sellers = localStorage.getItem('users');
        console.log(sellers);

        let seller = JSON.parse(sellers).find(s => s.id === sellerId);
        console.log(seller);

        const newOrder = {
            id: orders.length + 1,
            userId: customerId,
            userName: customer.name,
            sellerId: product.sellerId,
            sellerName: seller.name,
            productId: item.id,
            productName: item.name,
            quantity: item.quantity,
            orderDate: currentDate,
            totalPrice: item.price * item.quantity,
        };
        console.log(newOrder);

        orders.push(newOrder);
        console.log(orders);

        product.sold += item.quantity;
        product.availible -= item.quantity;
    });

    localStorage.setItem('orders', JSON.stringify(orders));
    localStorage.setItem('products', JSON.stringify(products));

    sessionStorage.removeItem('cart');

    alert('Order placed successfully!');
}
