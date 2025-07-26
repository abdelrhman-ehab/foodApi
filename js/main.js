let searchInput = document.getElementById('SearchInput');
let searchButton = document.getElementById('SearchButton');
let categoriesDDList = document.getElementById('category');
let recipesContainer = document.getElementsByClassName('row')[0];
let recipeDetails= document.querySelector('.recipe-details');
let recipeDetailsContainer= document.querySelector('.recipe-details-container');
let closeButton = document.querySelector('.recipe-details i');




// ge categories
async function getCategoriesFn(){
    let response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
    let finalRespone = await response.json();
    let categories = await finalRespone.categories;
    return categories;
}


// show categories
async function showCategoriesFn(){
    let categories = await getCategoriesFn();
    let categoriesCartona = ``;
    for (let i = 0; i < categories.length; i++) {
        categoriesCartona += `
            <option value="${categories[i].strCategory}">${categories[i].strCategory}</option>
        `  
    }
    categoriesDDList.innerHTML += categoriesCartona;
}
showCategoriesFn();





// get recipes
async function getRecipesFn(){
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoriesDDList.value}`);
    let finalRespone = await response.json();
    return finalRespone.meals;
}


// show recipes
$(categoriesDDList).change(async function (e) { 
    e.preventDefault();
    let recipes = await getRecipesFn();
    if(categoriesDDList.value === 'chooseCat'){
        recipesContainer.innerHTML = '<p class="text-center mt-4">please choose category to show your favourite recipes..❤</p>'
    }
    else{
        let recipesCartona = ``;
        for (let i = 0; i < recipes.length; i++) {
            recipesCartona += `
                    <div class="col-12 col-sm-6 col-md-4 col-lg-3 recipe">
                        <div class="col-content">
                            <div class="col-poster">
                                <img src="${recipes[i].strMealThumb}" alt="">
                            </div>
                            <div class="col-caption">
                                <p>${recipes[i].strMeal.split(' ').slice(0, 3).join(' ')}</p>
                                <p class = "recipeId">Recipe Id: ${recipes[i].idMeal}</p>
                            </div>
                        </div>
                    </div>
            `
            recipesContainer.innerHTML = recipesCartona;
        }
    }
    getRecipeDetailsFn();
});





// get searched recipes
async function getSearchFn() {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput.value}`);
    let finalRespone = await response.json();
    return finalRespone.meals;
}


// show searched recipes
$(searchButton).click(async function (e) { 
    e.preventDefault();
    let searchedRecipes = await getSearchFn();
    let cartona = ``;
    for (let i = 0; i < searchedRecipes.length; i++) {
        cartona += `
                    <div class="col-3">
                        <div class="col-content">
                            <div class="col-poster">
                                <img src="${searchedRecipes[i].strMealThumb}" alt="">
                            </div>
                            <div class="col-caption">
                                <p>${searchedRecipes[i].strMeal.split(' ').slice(0, 3).join(' ')}</p>
                            </div>
                        </div>
                    </div>
            `
        recipesContainer.innerHTML = cartona;
    }
});




// get recipe details
async function getRecipeDetailsFn() {
    let recipe = document.querySelectorAll('.recipe');
    for (let i = 0; i < recipe.length; i++) {
        recipe[i].addEventListener('click', async function(){
            let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${this.querySelector('.recipeId').innerHTML.split(':').slice()[1]}`)
            let finalResponse = await response.json();

            document.querySelector('.layer').style.display = 'block';
            recipeDetails.style.display = 'flex';

            let cartona = ``;
            cartona = `
                <div class="col-12 col-md-5 recipe-details-poster">
                    <img src="${finalResponse.meals[0].strMealThumb}" alt="">
                    <div class="recipe-details-title">
                        <p>Category: ${finalResponse.meals[0].strCategory}</p>
                        <p>Meal Name: ${finalResponse.meals[0].strMeal.split(' ').slice(0, 3).join(' ')}</p>
                        <p>Origin: ${finalResponse.meals[0].strArea}</p>
                    </div>
                    <hr></hr>
                </div>
                <div class="col-12 col-md-7 recipe-details-ingred">
                    <h3 class="text-center">Meal Ingredients</h3>
                    <div class="recipe-Ingredient">
                        <p>${finalResponse.meals[0].strIngredient1},</p>
                        <p>${finalResponse.meals[0].strIngredient2},</p>
                        <p>${finalResponse.meals[0].strIngredient3},</p>
                        <p>${finalResponse.meals[0].strIngredient4},</p>
                        <p>${finalResponse.meals[0].strIngredient5},</p>
                        <p>${finalResponse.meals[0].strIngredient6},</p>
                        <p>${finalResponse.meals[0].strIngredient7},</p>
                        <p>${finalResponse.meals[0].strIngredient8},</p>
                        <p>${finalResponse.meals[0].strIngredient9},</p>
                        <p>${finalResponse.meals[0].strIngredient10},</p>
                        <p>${finalResponse.meals[0].strIngredient11},</p>
                        <p>${finalResponse.meals[0].strIngredient12},</p>
                        <p>${finalResponse.meals[0].strIngredient13},</p>
                        <p>${finalResponse.meals[0].strIngredient14},</p>
                        <p>${finalResponse.meals[0].strIngredient15},</p>
                        <p>${finalResponse.meals[0].strIngredient16},</p>
                        <p>${finalResponse.meals[0].strIngredient17},</p>
                        <p>${finalResponse.meals[0].strIngredient18},</p>
                        <p>${finalResponse.meals[0].strIngredient19},</p>
                        <p>${finalResponse.meals[0].strIngredient20}</p>
                    </div>
                    <h3 class="text-center">Steps</h3>
                    <p>${finalResponse.meals[0].strInstructions}</p>
                </div>
            `;

            recipeDetailsContainer.innerHTML=cartona;
        })
        
    }
}


// hide recipe details
$(closeButton).click(function (e) { 
    e.preventDefault();
    recipeDetails.style.display = 'none';
    document.querySelector('.layer').style.display = 'none';
});