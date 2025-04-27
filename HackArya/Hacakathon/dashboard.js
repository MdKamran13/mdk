// Handle incident form submission
const incidentForm = document.getElementById('incidentForm');

incidentForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const fullName = document.getElementById('fullName').value.trim();
    const contact = document.getElementById('contact').value.trim();
    const incidentDetails = document.getElementById('incidentDetails').value.trim();

    if (fullName && contact && incidentDetails) {
        alert('Incident report submitted successfully!');
        incidentForm.reset();
    } else {
        alert('Please fill in all fields.');
    }
});

function logout() {
    alert('You have been logged out.');
}
