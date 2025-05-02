document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.querySelector('form');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Clear previous validation states
        clearValidation();
        
        const email = emailInput.value.trim();
        const password = passwordInput.value;
        const rememberMe = document.getElementById('remember').checked;
        
        // Validate email format first
        if (!validateEmail(email)) {
            showInputError(emailInput, 'Please enter a valid email address');
            return;
        }
        
        // Get all users from localStorage
        const users = getAllUsers();

        function getAllUsers() {
            const users = localStorage.getItem('users');
            return users ? JSON.parse(users) : [];
          }
          
        // Find user with matching email
        const user = users.find(u => u.email === email);
        
        if (!user) {
            showInputError(emailInput, 'Email not found. Please try again or sign up.');
            return;
        }
        
        // Check password
        if (user.password !== password) {
            showInputError(passwordInput, 'Incorrect password. Please try again.');
            return;
        }
        
        // If remember me is checked store user email in localStorage
        if (rememberMe) {
            localStorage.setItem('rememberedEmail', email);
        } else {
            localStorage.removeItem('rememberedEmail');
        }
        
        // Store current user in sessionStorage
        sessionStorage.setItem('currentUser', JSON.stringify(user));
        


        switch(user.role) {
            case 'admin':
                window.location.href = 'admin.html';
                break;
            case 'seller':
                window.location.href = 'seller.html';
                break;
            case 'user':
                window.location.href = 'index.html';
                break;
            default:
                window.location.href = 'index.html';
        }
    });
    
    // Check if remembered email 
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    if (rememberedEmail) {
        emailInput.value = rememberedEmail;
        document.getElementById('remember').checked = true;
    }
    
    // validate email 
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // show error message 
    function showInputError(inputElement, message) {
        const formGroup = inputElement.closest('.mb-3');
        if (!formGroup) return;
        
        inputElement.classList.add('is-invalid');
        
        // Create error message 
        let errorElement = formGroup.querySelector('.invalid-feedback');
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'invalid-feedback';
            formGroup.appendChild(errorElement);
        }
        
        errorElement.textContent = message;
    }
    
    //  clear all validation 
    function clearValidation() {
        // Remove all error 
        document.querySelectorAll('.is-invalid').forEach(el => {
            el.classList.remove('is-invalid');
        });
        
        // Remove all error messages
        document.querySelectorAll('.invalid-feedback').forEach(el => {
            el.remove();
        });
    }
    
    //  clear validation when user types
    emailInput.addEventListener('input', function() {
        if (this.classList.contains('is-invalid')) {
            clearValidation();
        }
    });
    
    passwordInput.addEventListener('input', function() {
        if (this.classList.contains('is-invalid')) {
            clearValidation();
        }
    });
});