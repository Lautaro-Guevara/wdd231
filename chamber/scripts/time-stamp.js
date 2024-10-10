document.addEventListener("DOMContentLoaded", function() {
    // Set current timestamp when the form loads
    const timestampField = document.getElementById("timestamp");
    const currentDate = new Date();
    timestampField.value = currentDate.toISOString();
});

// Open the modal
function openModal(modalId) {
    document.getElementById(modalId).style.display = "block";
}

// Close the modal
function closeModal(modalId) {
    document.getElementById(modalId).style.display = "none";
}

// Close modal if user clicks outside of it
window.onclick = function(event) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    });
}

