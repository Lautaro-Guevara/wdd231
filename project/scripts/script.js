let recipes = []; // Define recipes a nivel global para que sea accesible en otras funciones
let current = 0;  // Índice inicial del carrusel

async function fetchRecipes() {
    try {
        const response = await fetch('./data/recipes.json');
        recipes = await response.json();
        console.log(recipes);

        // Selecciona la receta del día y configura el carrusel después de obtener los datos
        selectRecipeOfTheDay();
        initializeCarousel();

        // Configura el evento del botón de búsqueda dentro de esta función para usar 'recipes'
        const searchButton = document.getElementById("search-button");
        searchButton.addEventListener("click", () => filterRecipe(recipes));
        
    } catch (error) {
        console.error('Error fetching recipes:', error);
    }
}

// Función para seleccionar la receta del día
function selectRecipeOfTheDay() {
    let recipeOfTheDayIndex = localStorage.getItem("recipeOfTheDayIndex");
    const today = new Date().toISOString().split('T')[0]; // Fecha actual en formato YYYY-MM-DD
    const lastUpdate = localStorage.getItem("lastRecipeUpdate");

    // Si la receta del día no se ha actualizado hoy, selecciona una nueva
    if (lastUpdate !== today) {
        recipeOfTheDayIndex = Math.floor(Math.random() * recipes.length);
        localStorage.setItem("recipeOfTheDayIndex", recipeOfTheDayIndex);
        localStorage.setItem("lastRecipeUpdate", today);
    } else {
        recipeOfTheDayIndex = parseInt(recipeOfTheDayIndex, 10); // Convierte a número
    }

    const recipeOfTheDay = recipes[recipeOfTheDayIndex];
    const recipeElement = document.getElementById("recipe-of-the-day");
    recipeElement.innerHTML = `
        <div class="recipe-of-the-day-img"><img src="${recipeOfTheDay.image}" alt="${recipeOfTheDay.recipeName}"></div>
        <div class="recipe-of-the-day-info">
            <h2>Recipe of the Day</h2>
            <div class="recipe-of-the-day-text">
                <a><h3>${recipeOfTheDay.recipeName}</h3></a>
                <p>${recipeOfTheDay.description}</p>
            </div>
        </div>
    `;
}

// Función para inicializar el carrusel
function initializeCarousel() {
    const images = document.getElementsByClassName("image")[0];
    const text = document.getElementsByClassName("carousel-text")[0];
    const dots = document.getElementsByClassName("dots")[0];

    // Mostrar imagen y texto inicial del carrusel
    images.innerHTML = `
        <img class="image" src="${recipes[current].image}" alt="page logo" loading="lazy"></img>
    `;
    text.innerHTML = `
        <h3>${recipes[current].recipeName}</h3>
    `;
    carouselPosition();

    // Agrega los eventos de los botones de navegación del carrusel
    document.getElementById("left").addEventListener("click", function(){
        current -= 1;
        if(current === -1) {
            current = recipes.length - 1;
        }
        updateCarousel();
    });

    document.getElementById("right").addEventListener("click", function(){
        current += 1;
        if(current === recipes.length) {
            current = 0;
        }
        updateCarousel();
    });
}

// Actualiza la posición del carrusel
function updateCarousel() {
    const images = document.getElementsByClassName("image")[0];
    const text = document.getElementsByClassName("carousel-text")[0];
    
    images.innerHTML = `
        <img class="image" src="${recipes[current].image}" alt="${recipes[current].recipeName}" loading="lazy"></img>
    `;
    text.innerHTML = `
        <h3>${recipes[current].recipeName}</h3>
    `;
    carouselPosition();
}

// Controla los puntos de posición del carrusel
function carouselPosition() {
    const dots = document.getElementsByClassName("dots")[0];
    dots.innerHTML = "";
    for (let i = 0; i < recipes.length; i++) {
        dots.innerHTML += i === current ? '<p class="bold">.</p>' : "<p>.</p>";
    }
}

// Llama a fetchRecipes para inicializar todo
fetchRecipes();
