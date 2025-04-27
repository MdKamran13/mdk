const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    if (email && password.length >= 6) {
        alert('Login successful!');
        window.location.href = "dashboard.html"; // redirect to dashboard
    } else {
        alert('Authentication failed. Please check your credentials.');
    }
});
