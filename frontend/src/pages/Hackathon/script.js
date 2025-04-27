// Dummy Authentication
const loginForm = document.getElementById('loginForm');
const incidentSection = document.getElementById('incident-form');

loginForm.addEventListener('submit', function(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Very basic auth for demonstration
    if(email && password.length >= 6){
        alert('Login successful!');
        loginForm.style.display = 'none';
        incidentSection.style.display = 'block';
    } else {
        alert('Authentication failed. Please try again.');
    }
});

// Incident Form Submission
const incidentForm = document.getElementById('incidentForm');

incidentForm.addEventListener('submit', function(event) {
    event.preventDefault();
    
    const name = document.getElementById('fullName').value;
    const contact = document.getElementById('contact').value;
    const details = document.getElementById('incidentDetails').value;
    
    if(name && contact && details){
        alert('Incident submitted successfully! Thank you.');
        incidentForm.reset();
    } else {
        alert('Please fill all fields.');
    }
});
