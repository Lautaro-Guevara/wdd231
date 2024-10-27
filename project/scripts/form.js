document.getElementById("subscription-form").addEventListener("submit", function (event) {
    event.preventDefault(); // Evita el envío predeterminado del formulario

    // Recolecta los datos del formulario
    const firstName = document.getElementById("first-name").value;
    const lastName = document.getElementById("last-name").value;
    const email = document.getElementById("email").value;

    // Idioma seleccionado
    const language = document.querySelector("input[name='language']:checked").value;

    // Tipos de recetas seleccionados
    const recipeTypes = Array.from(document.querySelectorAll("input[name='recipe-type']:checked"))
        .map(checkbox => checkbox.value)
        .join(", ");
    
    // Guardar los datos en localStorage
    localStorage.setItem("firstName", firstName);
    localStorage.setItem("lastName", lastName);
    localStorage.setItem("email", email);
    localStorage.setItem("language", language);
    localStorage.setItem("recipeTypes", recipeTypes);
    localStorage.setItem("timestamp", new Date().toLocaleString());

    // Limpiar los campos del formulario
    document.getElementById("subscription-form").reset();

    // Redirige a la página de acción
    window.location.href = "form-action.html";
});