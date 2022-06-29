//user is presented combo result page
const movieTitle = document.getElementById('movieTitle');
const moviePicContainer = document.getElementById('moviePic');
const review = document.getElementById('review');
const comboTitle = document.getElementById('snackTitle');
const comboPic = document.getElementById('snackPic');
const ingredients = document.getElementById('ingredients');

const generate = document.getElementById('generate');
const number = 777281
let movieNumber = Math.floor(Math.random()* number);

generate.addEventListener('click', function(event){
    event.preventDefault();
    getApiMovie();
    getFoodApi();
});

getApiMovie();
getFoodApi();


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
        let movieImg = document.createElement('img');
        movieImg.setAttribute("src", "https://www.themoviedb.org/t/p/w500" + imgURL);
        console.log(movieImg);
        moviePicContainer.appendChild(movieImg);



         //localStorage for movie
        const movieName = data.original_title;
        addItemToStorage('movies', movieName);

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

           
            addItemToStorage('foods', recipetitle);

  
        })
}


