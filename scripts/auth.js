/**
 * AUTH.JS - Authentication handling for Bible Study application
 * Handles login functionality, session management, and redirection
 */

// Check if user is already logged in on page load
document.addEventListener('DOMContentLoaded', function() {
    // If on login page (index.html or root) and already logged in, redirect to dashboard
    if ((window.location.pathname.includes('index.html') || window.location.pathname === '/') && isLoggedIn()) {
        window.location.href = 'dashboard.html';
        return;
    }
    
    // If on dashboard and not logged in, redirect to login
    if (window.location.pathname.includes('dashboard.html') && !isLoggedIn()) {
        window.location.href = 'index.html';
        return;
    }
});

// Login form handling
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', handleLogin);
}

// Clear fields function
function clearFields() {
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
    document.getElementById('username').focus();
    
    // Clear any existing error messages
    const existingError = document.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
}

// Toggle password visibility
function togglePassword() {
    const passwordInput = document.getElementById('password');
    const eyeIcon = document.getElementById('eyeIcon');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        eyeIcon.textContent = '🙈'; // Hide/closed eye
    } else {
        passwordInput.type = 'password';
        eyeIcon.textContent = '👁️‍🗨️'; // Eye with speech bubble
    }
}

// Handle login submission
async function handleLogin(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const loginBtn = document.getElementById('loginBtn');
    const btnText = document.querySelector('.btn-text');
    const loadingSpinner = document.getElementById('loadingSpinner');
    
    // Clear any existing error messages
    const existingError = document.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Validate inputs with custom messages
    if (!username && !password) {
        showError('Enter Username and Password');
        return;
    } else if (!username) {
        showError('Enter Username');
        return;
    } else if (!password) {
        showError('Enter Password');
        return;
    }
    
    // Show loading state
    loginBtn.disabled = true;
    btnText.style.display = 'none';
    loadingSpinner.style.display = 'flex';
    
    // Simulate API call delay (replace with actual authentication)
    try {
        await simulateLogin(username, password);
        
        // Store session
        sessionStorage.setItem('isLoggedIn', 'true');
        sessionStorage.setItem('username', username);
        sessionStorage.setItem('loginTime', new Date().toISOString());
        
        // Redirect to dashboard
        window.location.href = 'dashboard.html';
        
    } catch (error) {
        showError(error.message);
        
        // Reset button state
        loginBtn.disabled = false;
        btnText.style.display = 'inline';
        loadingSpinner.style.display = 'none';
    }
}

// Simulate login process with hardcoded credentials
function simulateLogin(username, password) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Hardcoded credentials
            const validUsername = 'Test';
            const validPassword = '1234';
            
            if (username === validUsername && password === validPassword) {
                resolve();
            } else {
                reject(new Error('Invalid username or password'));
            }
        }, 1500); // Simulate network delay
    });
}

// Check if user is logged in
function isLoggedIn() {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    const loginTime = sessionStorage.getItem('loginTime');
    
    if (!isLoggedIn || !loginTime) {
        return false;
    }
    
    // Optional: Check if session is expired (e.g., 24 hours)
    const loginDate = new Date(loginTime);
    const now = new Date();
    const hoursSinceLogin = (now - loginDate) / (1000 * 60 * 60);
    
    if (hoursSinceLogin > 24) {
        logout();
        return false;
    }
    
    return true;
}

// Logout function
function logout() {
    // Show fancy loader
    const loader = document.getElementById('logout-fancy-loader');
    if (loader) loader.style.display = 'flex';
    // Simulate network delay for logout
    setTimeout(() => {
        // Clear session storage
        sessionStorage.removeItem('isLoggedIn');
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('loginTime');
        // Hide loader and redirect
        if (loader) loader.style.display = 'none';
        window.location.href = 'index.html';
    }, 1500); // 1.5 seconds delay
}

// Show error message
function showError(message) {
    // Remove existing error if any
    const existingError = document.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Create error element
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorDiv.style.cssText = `
        background: #fee2e2;
        color: #dc2626;
        padding: 12px 16px;
        border-radius: 8px;
        margin-bottom: 20px;
        font-size: 14px;
        border: 1px solid #fecaca;
        text-align: center;
    `;
    
    // Insert before the form
    const form = document.getElementById('loginForm');
    form.parentNode.insertBefore(errorDiv, form);
    
    // Remove error after 5 seconds
    setTimeout(() => {
        if (errorDiv && errorDiv.parentNode) {
            errorDiv.remove();
        }
    }, 5000);
}

// Show/hide clear button based on input content
document.addEventListener('DOMContentLoaded', function() {
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const clearBtn = document.getElementById('clearBtn');
    const togglePasswordBtn = document.getElementById('togglePasswordBtn');
    
    if (usernameInput && passwordInput && clearBtn) {
        function toggleClearButton() {
            // Clear button only shows for username field and when username has content
            const hasUsernameContent = usernameInput.value.length > 0;
            clearBtn.style.display = hasUsernameContent ? 'flex' : 'none';
        }
        
        function togglePasswordButton() {
            const hasPasswordContent = passwordInput.value.length > 0;
            if (togglePasswordBtn) {
                togglePasswordBtn.style.display = hasPasswordContent ? 'flex' : 'none';
            }
        }
        
        usernameInput.addEventListener('input', () => {
            toggleClearButton();
        });
        
        passwordInput.addEventListener('input', () => {
            togglePasswordButton();
        });
        
        // Initial state
        toggleClearButton();
        togglePasswordButton();
    }
});