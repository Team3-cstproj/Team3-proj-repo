// Load existing auth data from localStorage or initialize if not present
let authData = JSON.parse(localStorage.getItem("authData")) || {
    admin: {
        id: 1,
        username: "admin",
        email: "admin@example.com",
        password: "admin123",
        role: "admin",
        name: "Admin User",
        joinDate: "2023-01-01"
    },
    sellers: [],
    users: []
};

let users = JSON.parse(localStorage.getItem("users")) 

// Function to get the next available ID (largest ID + 1)
function getNextId() {
    
    const allIds = [
        authData.admin.id,
        ...authData.sellers.map(s => s.id),
        ...authData.users.map(u => u.id)
    ];

   
    const maxId = Math.max(...allIds);

    
    return maxId + 1;
}

// Event listener for form submission
document.querySelector("form").addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const username = document.getElementById("user-name").value.trim();
    const password = document.getElementById("password").value.trim();
    const isSeller = document.getElementById("isSeller").checked;

    if (!email || !username || !password) {
        showMessage("⚠️ Please fill in all required fields.");
        return;
    }

    if (password.length < 4) {
        showMessage("🔐 Password must be at least 4 characters long.");
        return;
    }
    

    // Check if username or email already exists in users or sellers
    const emailExists =
        authData.users.some(u => u.email === email) ||
        authData.sellers.some(s => s.email === email) ||
        authData.admin.email === email;

    const usernameExists =
        authData.users.some(u => u.username === username) ||
        authData.sellers.some(s => s.username === username) ||
        authData.admin.username === username;

    if (emailExists) {
        showMessage("🚫 Email already exists. Try another.");
        return;
    }
    if (usernameExists) {
        showMessage("🚫 Username already exists. Try another.");
        return;
    }

    const joinDate = new Date().toISOString().split("T")[0];

    const newId = getNextId();
    if (isSeller) {
        const newSeller = {
            id: newId,
            username,
            email,
            password,
            role: "seller",
            name: username,
            joinDate,
            storeName: username + "'s Store",
            rating: 0,
            productsSold: 0
        };
        authData.sellers.push(newSeller);
        users.push(newSeller); 
    } else {
        const newUser = {
            id: newId,
            username,
            email,
            password,
            role: "user",
            name: username,
            joinDate,
            orders: 0
        };
        authData.users.push(newUser);
        users.push(newUser); 
    }

    // Save updated data to localStorage
    localStorage.setItem("authData", JSON.stringify(authData));
    localStorage.setItem("users", JSON.stringify(users)); 

    showMessage("✅ Account created! Redirecting to login...", "success");

    setTimeout(() => {
        window.location.href = "login.html";
    }, 1500);
});

const messageBox = document.getElementById("form-message");

function showMessage(text, type = "danger") {
    messageBox.className = `alert alert-${type}`;
    messageBox.textContent = text;
    messageBox.classList.remove("d-none");
}
