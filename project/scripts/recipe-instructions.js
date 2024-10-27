let recipes = []; // Define 'recipes' a nivel global

async function fetchRecipes() {
    try {
        const response = await fetch('./data/recipes.json');
        recipes = await response.json();
        console.log(recipes);


        

        // Llama a la función para mostrar las instrucciones de la receta seleccionada
        displaySelectedRecipe();

    } catch (error) {
        console.error('Error fetching recipes:', error);
    }
}

// Llamar a fetchRecipes para inicializar todo
fetchRecipes();

// Mostrar instrucciones de la receta seleccionada
function displaySelectedRecipe() {
    const selectedRecipeName = localStorage.getItem("selectedRecipe");
    const recipe = recipes.find(r => r.recipeName === selectedRecipeName);

    if (recipe) {
        document.getElementById("recipe-title").textContent = recipe.recipeName;

        const recipeDetails = document.getElementById("recipe-details");
        recipeDetails.innerHTML = `
            <p>${recipe.description}</p>
            <h2>Ingredients</h2>
            <ul class="ingredients">${recipe.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}</ul>
            <h2>Instructions</h2>
            <ol>${recipe.instructions.map(instruction => `<li>${instruction}</li>`).join('')}</ol>
            <div>
                <img src="${recipe.image}" alt="${recipe.recipeName}">
            </div>

            <div id="nutrition-info"></div>
        `;

        // Llama a la función para obtener información nutricional de la receta seleccionada
        fetchNutritionData(recipe.recipeName);

    } else {
        document.getElementById("recipe-title").textContent = "Recipe not found";
        document.getElementById("recipe-details").innerHTML = '<p>Sorry, we couldn\'t find the recipe you\'re looking for.</p>';
    }
}

const apiKey = "60e63302aee94cf0a0d180260f732a35"; // Reemplaza con tu clave de API de Spoonacular

// Función para obtener el ID de una receta usando el nombre
async function getRecipeId(recipeName) {
    const url = `https://api.spoonacular.com/recipes/complexSearch?query=${encodeURIComponent(recipeName)}&apiKey=${apiKey}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.results && data.results.length > 0) {
            return data.results[0].id; // Retorna el primer ID de receta encontrado
        } else {
            console.log("No se encontró la receta.");
            return null;
        }
    } catch (error) {
        console.error("Error al buscar la receta:", error);
        return null;
    }
}

// Función para obtener la información nutricional de la receta
async function fetchNutritionData(recipeName) {
    const recipeId = await getRecipeId(recipeName);
    if (!recipeId) return; // Si no se encuentra el ID, termina la función

    const nutritionUrl = `https://api.spoonacular.com/recipes/${recipeId}/nutritionWidget.json?apiKey=${apiKey}`;
    try {
        const response = await fetch(nutritionUrl);
        const nutritionData = await response.json();

        // Mostrar los datos nutricionales en el HTML
        document.getElementById("nutrition-info").innerHTML = `
            <h3>Nutrition Information for ${recipeName}</h3>
            <p>Calories: ${nutritionData.calories}</p>
            <p>Carbohydrates: ${nutritionData.carbs}</p>
            <p>Fat: ${nutritionData.fat}</p>
            <p>Protein: ${nutritionData.protein}</p>
        `;
    } catch (error) {
        console.error("Error al obtener los datos nutricionales:", error);
    }
}

// Inicialización para asegurar que el DOM esté cargado antes de ejecutar
document.addEventListener("DOMContentLoaded", () => {
    fetchRecipes();
});
