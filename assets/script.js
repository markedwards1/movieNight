//user is presented combo result page
const movieTitle = document.getElementById('movieTitle');
const moviePicContainer = document.getElementById('moviePic');
const review = document.getElementById('review');
const comboTitle = document.getElementById('snackTitle');
const comboPic = document.getElementById('snackPic');
const ingredients = document.getElementById('ingredients');

const generate = document.getElementById('generate');

 generate.addEventListener('click', generates());

//create random number
const number = 777281;
const movieNumber = Math.floor(Math.random()* number);
//console.log(movieNumber);
getApiMovie();

//fetch movie
//insert random number into url to search the movies. 
function getApiMovie(){
    let movieNumber = Math.floor(Math.random()* number);
    let requestUrl = 'https://api.themoviedb.org/3/movie/' + movieNumber + '?api_key=417ba82f420aac26f214a4ce75d520d6';
    console.log(requestUrl);
    fetch(requestUrl)
    .then(function (response){
        
        
        return response.json();
    })
    .then(function (data){
        console.log(data);
        

        if(data.adult === true){
            location.reload();
        }
        
        if(data.success === false){
           
            location.reload();
        }
        if(data.poster_path === null){
            location.reload();
        }

        


        
        movieTitle.textContent = data.original_title;
        review.textContent = data.overview;
        

        


        const imgURL = data.poster_path;
        let movieImg = document.createElement('img')
        moviePicContainer.appendChild(movieImg);
        movieImg.setAttribute("src", "https://www.themoviedb.org/t/p/w500" + imgURL);
        console.log(movieImg);
        
        
        
        
            
    })

}
//display inforamtion using ID's
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