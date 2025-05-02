
document.addEventListener('DOMContentLoaded', function () {
    const resetForm = document.getElementById('resetForm');
    const successAlert = document.getElementById('successAlert');
    const errorAlert = document.getElementById('errorAlert');
    const successMessage = document.getElementById('successMessage');
    const errorMessage = document.getElementById('errorMessage');
    const lastUpdatedSpan = document.getElementById('lastUpdated');

    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    const authData = JSON.parse(localStorage.getItem('authData')) || {};
    const allUsers = JSON.parse(localStorage.getItem('users')) || [];

    if (currentUser) {
        document.getElementById('username').value = currentUser.name || '';
        document.getElementById('email').value = currentUser.email || '';
        const lastUpdatedSpan = document.getElementById('lastUpdated');
        if (lastUpdatedSpan && currentUser.lastUpdated) {
            lastUpdatedSpan.textContent = new Date(currentUser.lastUpdated).toLocaleString();
        }
    }
    // Fill form
    document.getElementById('username').value = currentUser.name;
    document.getElementById('email').value = currentUser.email;
    if (currentUser.lastUpdated) {
        lastUpdatedSpan.textContent = new Date(currentUser.lastUpdated).toLocaleString();
    } else {
        lastUpdatedSpan.textContent = "Never";
    }
    

    // Close buttons
    document.querySelectorAll('.alert .btn-close').forEach(btn => {
        btn.addEventListener('click', () => btn.parentElement.classList.add('d-none'));
    });

    resetForm.addEventListener('submit', function (e) {
        e.preventDefault();
        successAlert.classList.add('d-none');
        errorAlert.classList.add('d-none');

        const name = document.getElementById('username').value.trim();
        const email = document.getElementById('email').value.trim();
        const newPassword = document.getElementById('newPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        if (newPassword && newPassword.length < 4) {
            return showError('New password must be at least 4 characters long.');
        }

        if (newPassword && newPassword !== confirmPassword) {
            return showError('New passwords do not match.');
        }

        // Check if username/email is already taken by someone else
        const isTaken = allUsers.some(u =>
            u.id !== currentUser.id &&
            (u.name === name || u.email === email)
        );

        if (isTaken) {
            return showError('Username or email already taken.');
        }

        // Prepare updated user object
        const updatedUser = {
            ...currentUser,
            name,
            email,
            password: newPassword || currentUser.password,
            lastUpdated: new Date().toISOString()
        };

        // Update in flat 'users' array
        const updatedUsers = allUsers.map(u =>
            u.id === currentUser.id ? updatedUser : u
        );

        // Update in 'authData'
        if (currentUser.role === 'admin') {
            authData.admin = updatedUser;
        } else if (currentUser.role === 'seller') {
            authData.sellers = (authData.sellers || []).map(s =>
                s.id === currentUser.id ? updatedUser : s
            );
        } else if (currentUser.role === 'user') {
            authData.users = (authData.users || []).map(u =>
                u.id === currentUser.id ? updatedUser : u
            );
        }
        let orders = JSON.parse(localStorage.getItem('orders')) || [];

        orders = orders.map(order => {
            if (currentUser.role === 'user' && order.userId === currentUser.id) {
                return { ...order, userName: updatedUser.name };
            }
            if (currentUser.role === 'seller' && order.sellerId === currentUser.id) {
                return { ...order, sellerName: updatedUser.name };
            }
            return order;
        });
        const contactData = JSON.parse(localStorage.getItem('contactData'));

        if (contactData) {
            // Update in requests
            contactData.requests = contactData.requests.map(req =>
                req.email === currentUser.email ? { ...req, email: updatedUser.email, name: updatedUser.username } : req
            );
        
            // Update in replies
            contactData.replies = contactData.replies.map(reply => {
                if (reply.to === currentUser.email) {
                    reply.to = updatedUser.email;
                }
                if (reply.from === currentUser.email) {
                    reply.from = updatedUser.email;
                }
                return reply;
            });
        
            localStorage.setItem('contactData', JSON.stringify(contactData));
        }

        localStorage.setItem('orders', JSON.stringify(orders));

        // Save everything
        localStorage.setItem('users', JSON.stringify(updatedUsers));
        localStorage.setItem('authData', JSON.stringify(authData));
        sessionStorage.setItem('currentUser', JSON.stringify(updatedUser));

        // Reset password fields
        document.getElementById('newPassword').value = '';
        document.getElementById('confirmPassword').value = '';
        lastUpdatedSpan.textContent = new Date(updatedUser.lastUpdated).toLocaleString();

        showSuccess('Account information updated successfully!');
    });

    function showSuccess(message) {
        successMessage.textContent = message;
        successAlert.classList.remove('d-none');
        setTimeout(() => {
            successAlert.classList.add('d-none');
            window.location.href = "index.html";
        }, 5000);
    }

    function showError(message) {
        errorMessage.textContent = message;
        errorAlert.classList.remove('d-none');
        setTimeout(() => errorAlert.classList.add('d-none'), 5000);
    }
});
