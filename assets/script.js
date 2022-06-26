//user is presented combo result page
const movieTitle = document.getElementById('movie');
const moviePic = document.getElementById('moviePic');
const review = document.getElementById('review');
const comboTitle = document.getElementById('snackTitle');
const comboPic = document.getElementById('snackPic');
const ingredients = document.getElementById('ingredients');

const generate = document.getElementById('generate');

 generate.addEventListener('click', generates());
 
 function generates(){

   const requestIngredientUrl = 'https://www.themealdb.com/api/json/v1/1/random.php';


//fetch the food.
  fetch(requestIngredientUrl)
  .then(function(response){
      return response.json();
  })
  // display information using ID's
  .then(function(ingredientData){
console.log(ingredientData.meals[0]);
//Title 
const recipetitle = ingredientData.meals[0].strMeal;

comboTitle.textContent = recipetitle;
//Image
const recipeImage = ingredientData.meals[0].strMealThumb;

const imgTag = document.createElement("img");
imgTag.src = recipeImage;
comboPic.appendChild(imgTag);
 
//Ingredients 
    for (let i = 1; i < 21; i++) {
        const ingredientList = ingredientData.meals[0]["strIngredient" + i];

        if (ingredientList != "") {
            // complete for loop ( remove extra 'dot points' )
            const list = document.createElement("li");
            list.textContent = ingredientList
            ingredients.appendChild(list);
        }
    }
 })

 }