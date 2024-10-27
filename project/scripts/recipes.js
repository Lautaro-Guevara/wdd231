async function fetchRecipes() {
    try {
        const response = await fetch('./data/recipes.json');
        const recipes = await response.json();
        console.log(recipes);
        
        
        createrRecipeCard(recipes);
        
        // Configura el evento del botón de búsqueda dentro de esta función para usar 'recipes'
        const searchButton = document.getElementById("search-button");
        searchButton.addEventListener("click", () => filterRecipe(recipes));
        
    } catch (error) {
        console.error('Error fetching recipes:', error);
    }
}

// Llamada a la función para cargar recetas
fetchRecipes();

// Contenedor de tarjetas de recetas
const recipeContainer = document.querySelector(".recipe-container");

// Función para crear las tarjetas de receta
function createrRecipeCard(filteredRecipe) {
    recipeContainer.innerHTML = "";
    filteredRecipe.forEach((recipe) => {
        const recipeCard = document.createElement("div");
        recipeCard.classList.add("recipe-card");

        // Figura e imagen de la receta
        const figureElement = document.createElement("figure");
        recipeCard.appendChild(figureElement);

        const imageElement = document.createElement("img");
        imageElement.src = recipe.image;
        imageElement.alt = recipe.recipeName;
        imageElement.loading = "lazy";
        figureElement.appendChild(imageElement);

        // Enlace y nombre de la receta
        const linkElement = document.createElement("a");
        linkElement.href = "recipe-instruction.html";
        linkElement.addEventListener("click", () => {
            localStorage.setItem("selectedRecipe", recipe.recipeName);
        });

        const nameElement = document.createElement("h3");
        nameElement.textContent = recipe.recipeName;
        linkElement.appendChild(nameElement);
        recipeCard.appendChild(linkElement);

        recipeContainer.appendChild(recipeCard);
    });
}

// Función de búsqueda para filtrar recetas
function filterRecipe(recipes) {
    const searchBar = document.getElementById("search-bar");
    const searchText = searchBar.value.toLowerCase();
    const filteredRecipe = recipes.filter(recipe =>
        recipe.recipeName.toLowerCase().includes(searchText) ||
        recipe.tags.some(tag => tag.toLowerCase().includes(searchText))
    );
    createrRecipeCard(filteredRecipe);
}
