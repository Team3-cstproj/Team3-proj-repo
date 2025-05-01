
// document.addEventListener('DOMContentLoaded', function () {
//     const resetForm = document.getElementById('resetForm');
//     const successAlert = document.getElementById('successAlert');
//     const errorAlert = document.getElementById('errorAlert');
//     const successMessage = document.getElementById('successMessage');
//     const errorMessage = document.getElementById('errorMessage');
//     const lastUpdatedSpan = document.getElementById('lastUpdated');

//     // Load current user data from session storage
//     const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));

//     // Fill the form with current user data
//     document.getElementById('username').value = currentUser.username;
//     document.getElementById('email').value = currentUser.email;

//     // Show last updated date
//     if (currentUser.lastUpdated) {
//         lastUpdatedSpan.textContent = new Date(currentUser.lastUpdated).toLocaleString();
//     } else {
//         lastUpdatedSpan.textContent = "Never";
//     }

//     // Bootstrap Alert handling
//     const alerts = document.querySelectorAll('.alert');
//     alerts.forEach(alert => {
//         const closeButton = alert.querySelector('.btn-close');
//         if (closeButton) {
//             closeButton.addEventListener('click', function () {
//                 alert.classList.add('d-none');
//             });
//         }
//     });

//     // Form submission
//     resetForm.addEventListener('submit', function (e) {
//         e.preventDefault();

//         // Hide any existing alerts
//         successAlert.classList.add('d-none');
//         errorAlert.classList.add('d-none');

//         const username = document.getElementById('username').value;
//         const email = document.getElementById('email').value;
//         const newPassword = document.getElementById('newPassword').value;
//         const confirmPassword = document.getElementById('confirmPassword').value;

//         // Validate new password if provided
//         if (newPassword) {
//             if (newPassword.length < 4) {
//                 showError('New password must be at least 4 characters long.');
//                 return;
//             }

//             if (newPassword !== confirmPassword) {
//                 showError('New passwords do not match.');
//                 return;
//             }
//         }

//         // Get all users from local storage
//         const users = JSON.parse(localStorage.getItem('users'));

//         // Check if username or email already exists (excluding current user)
//         const isUsernameTaken = users.some(user =>
//             user.username === username && user.id !== currentUser.id
//         );

//         const isEmailTaken = users.some(user =>
//             user.email === email && user.id !== currentUser.id
//         );

//         if (isUsernameTaken) {
//             showError('Username is already taken by another user.');
//             return;
//         }

//         if (isEmailTaken) {
//             showError('Email is already registered to another account.');
//             return;
//         }

//         // Update current user data
//         const updatedUser = {
//             ...currentUser,
//             username: username,
//             email: email,
//             password: newPassword ? newPassword : currentUser.password,
//             lastUpdated: new Date().toISOString()
//         };

//         // Update the user in the users array
//         const updatedUsers = users.map(user =>
//             user.id === currentUser.id ? updatedUser : user
//         );

//         // Save updated data to local and session storage
//         localStorage.setItem('users', JSON.stringify(updatedUsers));
//         sessionStorage.setItem('currentUser', JSON.stringify(updatedUser));

//         // Update last updated display
//         lastUpdatedSpan.textContent = new Date().toLocaleString();

//         // Show success message
//         showSuccess('Account information updated successfully!');

//         // Clear password fields
//         document.getElementById('newPassword').value = '';
//         document.getElementById('confirmPassword').value = '';
//     });

//     // Show success message
//     function showSuccess(message) {
//         successMessage.textContent = message;
//         successAlert.classList.remove('d-none');

//         // Auto-dismiss after 5 seconds
//         setTimeout(() => {
//             successAlert.classList.add('d-none');
//         }, 5000);
//         window.href = "index.html"; // Redirect to profile page after 5 seconds
//     }

//     // Show error message
//     function showError(message) {
//         errorMessage.textContent = message;
//         errorAlert.classList.remove('d-none');

//         // Auto-dismiss after 5 seconds
//         setTimeout(() => {
//             errorAlert.classList.add('d-none');
//         }, 5000);
//     }
// });
// Initialize local storage with sample data if not exists
    // if (!localStorage.getItem('users')) {
    //     const sampleUsers = [
    //         {
    //             id: 501,
    //             name: "John Doe",
    //             username: "user1",
    //             email: "user1@example.com",
    //             password: "user123",
    //             role: "user",
    //             joinDate: "2023-01-15",
    //             orders: 12
    //         },
    //         {
    //             id: 502,
    //             name: "Jane Smith",
    //             username: "user2",
    //             email: "user2@example.com",
    //             password: "user123",
    //             role: "user",
    //             joinDate: "2023-03-21",
    //             orders: 5
    //         },
    //         {
    //             id: 503,
    //             name: "Robert Johnson",
    //             username: "user3",
    //             email: "user3@example.com",
    //             password: "user123",
    //             role: "user",
    //             joinDate: "2023-07-02",
    //             orders: 7
    //         }
    //     ];
    //     localStorage.setItem('users', JSON.stringify(sampleUsers));
    // }

    // // Initialize session storage with sample current user if not exists
    // if (!sessionStorage.getItem('currentUser')) {
    //     const currentUser = {
    //         id: 508,
    //         name: "ali ali",
    //         username: "ali ali",
    //         email: "aaaa@aa.com",
    //         password: "aaaa",
    //         role: "user",
    //         joinDate: "2025-04-28",
    //         orders: 0
    //     };
    //     sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
    // }
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
        document.getElementById('username').value = currentUser.username || '';
        document.getElementById('email').value = currentUser.email || '';
        const lastUpdatedSpan = document.getElementById('lastUpdated');
        if (lastUpdatedSpan && currentUser.lastUpdated) {
            lastUpdatedSpan.textContent = new Date(currentUser.lastUpdated).toLocaleString();
        }
    }
    // Fill form
    document.getElementById('username').value = currentUser.username;
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

        const username = document.getElementById('username').value.trim();
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
            (u.username === username || u.email === email)
        );

        if (isTaken) {
            return showError('Username or email already taken.');
        }

        // Prepare updated user object
        const updatedUser = {
            ...currentUser,
            username,
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
                return { ...order, userName: updatedUser.username };
            }
            if (currentUser.role === 'seller' && order.sellerId === currentUser.id) {
                return { ...order, sellerName: updatedUser.username };
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
