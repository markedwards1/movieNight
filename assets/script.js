//user is presented combo result page
const movieTitle = document.getElementById('movieTitle'); // stores element containing id movieTitle in variable for JS functionality
const moviePicContainer = document.getElementById('moviePic'); // stores element containing id moviePic in variable for JS functionality
const review = document.getElementById('review'); // stores element containing id review in variable for JS functionality
const comboTitle = document.getElementById('snackTitle'); // stores element containing id snackTitle in variable for JS functionality
const comboPic = document.getElementById('snackPic'); // stores element containing id snackPic in variable for JS functionality
const ingredients = document.getElementById('ingredients'); // stores element containing id ingredients in variable for JS functionality
const generate = document.getElementById('generate'); // stores element containing id generate in variable for JS functionality
const previous = document.getElementById('previous'); // stores element containing id previous in variable for JS functionality
const number = 777281;

generate.addEventListener('click', function(event){
    event.preventDefault();
    getApiMovie();
});

previous.addEventListener('click', function(event){
    location.assign("./previousCombos.html");
});

function getItems(key){
    return JSON.parse(localStorage.getItem(key)) || []; //Notes: gets array of items 
}

function addItemToStorage(key, itemName){
    //  goal: no longer than 5 items in localStorage 

    // get existing items from local storage
    const existingItems = getItems(key); //Notes: all items will be in this variable 

    // add 'name' to them
    existingItems.push(itemName); //adds new name to the array we have gotten 

    // if total length is > 5
    if(existingItems.length >5 ){ 
        // remove the first item
        existingItems.splice(0, 1); // deletes first index by 1 
    }

    // resave 
    localStorage.setItem(key, JSON.stringify(existingItems)); 
}

//fetch movie
//insert random number into url to search the movies. 
function getApiMovie(){
    const movieNumber = Math.floor(Math.random()* number); // gets random movie id to search for
    let requestUrl = 'https://api.themoviedb.org/3/movie/' + movieNumber + '?api_key=417ba82f420aac26f214a4ce75d520d6'; // creates url for fetching
    fetch(requestUrl) // fetches url
    .then(function (response){
        
        
        return response.json();
    })
    .then(function (data){
        
        // checks that url has poster image, is not adult content, and is not a 404 before continuing with processes
        if(data.adult === true){
            getApiMovie();
        }
        
        else if(data.success === false){
            getApiMovie();
        }
        else if(data.poster_path === null){
            getApiMovie();
        }
        else {

            movieTitle.textContent = data.original_title; // gets movie title from API
            review.textContent = data.overview; // gets review from API
        
            const imgURL = data.poster_path; // gets movie poster from API

            const movieImg = document.createElement("img"); // creates image element in html
            movieImg.src = "https://www.themoviedb.org/t/p/w500" + imgURL; // sets source of img
            moviePicContainer.innerHTML = ""; // resets values for image
            moviePicContainer.appendChild(movieImg); // appends image and displays to dom
            //localStorage for movie
            const movieName = data.original_title;
            addItemToStorage('movies', movieName);
            getFoodApi(); // calls upon getFoodAPI
        }
    })
}
//display inforamtion using ID's
function getFoodApi() {
    const requestIngredientUrl = 'https://www.themealdb.com/api/json/v1/1/random.php';

    //fetch the food.
    fetch(requestIngredientUrl)
        .then(function (response) {
            return response.json();
        })
        // display information using ID's
        .then(function (ingredientData) {

            comboPic.textContent = "";
            ingredients.textContent ="";

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
                    list.textContent = ingredientList;
                    ingredients.appendChild(list);
                }
            }

           
            addItemToStorage('foods', recipetitle);

  
        })
}


