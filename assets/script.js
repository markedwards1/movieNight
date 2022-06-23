//user is presented combo result page
const movieTitle = document.getElementById('movieTitle');
const moviePicContainer = document.getElementById('moviePic');
const review = document.getElementById('review')
const comboTitle = document.getElementById('snackTitle')
const comboPic = document.getElementById('snackPic');
const ingredients = document.getElementById('ingredients');


//create random number
const number = 777281;
const movieNumber = Math.floor(Math.random()* number);
//console.log(movieNumber);
getApiMovie();

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
    
       movieTitle.textContent = data.original_title;

       review.textContent = data.overview;

        



            const imgURL = data.poster_path;
            const movieImg = document.createElement('img')
            movieImg.setAttribute("src", "https://www.themoviedb.org/t/p/w500" + imgURL);
            console.log(movieImg);
            moviePicContainer.appendChild(movieImg);




            
    })

}
//display inforamtion using ID's

//fetch the food.

// display information using ID's

// add event listener / href to re-roll