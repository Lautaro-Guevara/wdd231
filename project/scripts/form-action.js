
// Obtener y mostrar los datos almacenados en localStorage

document.addEventListener("DOMContentLoaded", function (){

    document.getElementById('first-name').textContent = localStorage.getItem('firstName');
    document.getElementById('last-name').textContent = localStorage.getItem('lastName');
    document.getElementById('email').textContent = localStorage.getItem('email');
    document.getElementById('language').textContent = localStorage.getItem('language');
    document.getElementById('recipes').textContent = localStorage.getItem('recipeTypes');
    document.getElementById('timestamp').textContent = localStorage.getItem('timestamp');
});

window.addEventListener('beforeunload', () => {
    localStorage.clear(); // Limpia todos los datos de localStorage
});
