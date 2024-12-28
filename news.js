// variables
const generalBtn = document.getElementById("general");
const businessBtn = document.getElementById("business");
const sportsBtn = document.getElementById("sports");
const entertainmentBtn = document.getElementById("entertainment");
const technologyBtn = document.getElementById("technology");
const searchBtn = document.getElementById("searchBtn");

const newsQuery = document.getElementById("newsQuery");
const newsType = document.getElementById("newsType");
const newsdetails =document.getElementById("newsdetails");

// Array
var newsDataArr = [];

// APIs
const API_KEY = "c8590d652ae04466a5b9e8798852a820";
const BUSINESS_NEWS = "https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=";
const SPORTS_NEWS = "https://newsapi.org/v2/top-headlines?country=us&category=sports&apiKey=";
const TECHNOLOGY_NEWS = "https://newsapi.org/v2/top-headlines?country=us&category=technology&apiKey=";
const GENERAL_NEWS = "https://newsapi.org/v2/top-headlines?country=us&category=general&apiKey=";
const ENTERTAINMENT_NEWS = "https://newsapi.org/v2/top-headlines?country=us&category=entertainment&apiKey=";
const HEADLINES_NEWS = "https://newsapi.org/v2/top-headlines?country=us&apiKey=";
const SEARCH_NEWS = "https://newsapi.org/v2/everything?q=";
 
function updateLayout() {
    const newsDetails = document.getElementById("newsdetails");

    // Check if the viewport width is greater than or equal to 768px (desktop)
    if (window.matchMedia("(min-width: 768px)").matches) {
        newsDetails.style.display = "flex";
        newsDetails.style.flexWrap = "wrap"; // Ensures content wraps if necessary
        newsDetails.style.justifyContent = "space-between"; // Adds some spacing
    } else {
        // For smaller screens (mobile)
        newsDetails.style.display = "block";
    }
}

// Update layout on page load
window.onload = function () {
    updateLayout();
    newsType.innerHTML = "<h4>Headlines</h4>";
    fetchHeadlines();
};

// Update layout on window resize
window.addEventListener("resize", updateLayout);

generalBtn.addEventListener("click",function(){
    newsType.innerHTML="<h4>Headlines</h4>";
   fetchGeneralNews();
});

businessBtn.addEventListener("click",function(){
    newsType.innerHTML="<h4>Business</h4>";
    fetchBusinessNews();
});

sportsBtn.addEventListener("click",function(){
    newsType.innerHTML="<h4>Sports</h4>";
    fetchSportsNews();
});

entertainmentBtn.addEventListener("click",function(){
    newsType.innerHTML="<h4>Entertainment</h4>";
    fetchEntertainmentNews();
});

technologyBtn.addEventListener("click",function(){
    newsType.innerHTML="<h4>Technology</h4>";
    fetchTechnologyNews();
});

searchBtn.addEventListener("click",function(){
    newsType.innerHTML="<h4>Search : "+newsQuery.value+"</h4>";
    fetchQueryNews();
});

const fetchHeadlines = async () => {
    const response = await fetch(HEADLINES_NEWS+API_KEY);
    newsDataArr = [];
    if(response.status >=200 && response.status < 300){
       const myJson = await response.json();
       newsDataArr = myJson.articles;
    }else{
        // handle errors
        console.log(response.status, response.statusText);
    }

    displayNews();
}


const fetchGeneralNews = async () => {
    const response = await fetch(GENERAL_NEWS+API_KEY);
    newsDataArr = [];
    if(response.status >=200 && response.status < 300){
       const myJson = await response.json();
       newsDataArr = myJson.articles;
    }else{
        // handle errors
        console.log(response.status, response.statusText);
    }

    displayNews();
}


const fetchBusinessNews = async () => {
    const response = await fetch(BUSINESS_NEWS+API_KEY);
    newsDataArr = [];
    if(response.status >=200 && response.status < 300){
       const myJson = await response.json();
       newsDataArr = myJson.articles;
    }else{
        // handle errors
        console.log(response.status, response.statusText);
    }

    displayNews();
}

const fetchSportsNews = async () => {
    const response = await fetch(SPORTS_NEWS+API_KEY);
    newsDataArr = [];
    if(response.status >=200 && response.status < 300){
       const myJson = await response.json();
       newsDataArr = myJson.articles;
    }else{
        // handle errors
        console.log(response.status, response.statusText);
    }

    displayNews();
}

const fetchEntertainmentNews = async () => {
    const response = await fetch(ENTERTAINMENT_NEWS+API_KEY);
    newsDataArr = [];
    if(response.status >=200 && response.status < 300){
       const myJson = await response.json();
       console.log(myJson);
       newsDataArr = myJson.articles;
    }else{
        // handle errors
        console.log(response.status, response.statusText);
    }

    displayNews();
}

const fetchTechnologyNews = async () => {
    const response = await fetch(TECHNOLOGY_NEWS+API_KEY);
    newsDataArr = [];
    if(response.status >=200 && response.status < 300){
       const myJson = await response.json();
       newsDataArr = myJson.articles;
    }else{
        // handle errors
        console.log(response.status, response.statusText);
    }

    displayNews();
}

const fetchQueryNews = async () => {

    if(newsQuery.value == null)
        return;

    const response = await fetch(SEARCH_NEWS+encodeURIComponent(newsQuery.value)+"&apiKey="+API_KEY);
     newsDataArr = [];
    if(response.status >= 200 && response.status < 300){
        const myJson = await response.json();
        newsDataArray = myJson.articles;
    }else{
        // error handler
        console.log(response.status, response.statusText);
    }

    displayNews();
}

function displayNews () {

    newsdetails.innerHTML = "";

    if(newsDataArr.length == 0){
        newsdetails.innerHTML = "<h5>No data found.</h5>"
        return;
    }

    newsDataArr.forEach(news => {

        var date = news.publishedAt.split("T");

        var col = document.createElement('div');
        col.className="col-sm-12 col-md-4 col-lg-3 p-2 card";

        var card = document.createElement('div');
        card.className = "p-2";

        var image = document.createElement('img');
        image.setAttribute("height","matchparnt");
        image.setAttribute("width","100%");
        image.src=news.urlToImage;

        var cardBody = document.createElement('div');

        var newsHeading = document.createElement('h5');
        newsHeading.className = "card-title";
        newsHeading.innerHTML = news.title;

        var dateHeading = document.createElement('h6');
        dateHeading.className = "text-primary";
        dateHeading.innerHTML = date[0];

        var discription = document.createElement('p');
        discription.className="text-muted";
        discription.innerHTML = news.description;

        var link = document.createElement('a');
        link.className="btn btn-dark";
        link.setAttribute("target", "_blank");
        link.href = news.url;
        link.innerHTML="Read more";

        cardBody.appendChild(newsHeading);
        cardBody.appendChild(dateHeading);
        cardBody.appendChild(discription);
        cardBody.appendChild(link);


        card.appendChild(image);
        card.appendChild(cardBody);

        col.appendChild(card);

        newsdetails.appendChild(col);
    });

}

