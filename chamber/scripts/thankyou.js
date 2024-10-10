 // Function to get URL parameters
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Populate the page with form data
document.getElementById('first-name').textContent = getQueryParam('first-name');
document.getElementById('last-name').textContent = getQueryParam('last-name');
document.getElementById('email').textContent = getQueryParam('email');
document.getElementById('phone').textContent = getQueryParam('phone');
document.getElementById('business-name').textContent = getQueryParam('business-name');
document.getElementById('timestamp').textContent = getQueryParam('timestamp');
