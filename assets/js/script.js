var apiKey = "35fdec6a65ccb234ade5e87353c67e78";



    // https://openweathermap.org/forecast5#format

    // User inputs name of a city and it is requested
        // api automatically trims
    // Fetch data from open weather api 
        // If city doesn't exist or is misspelled, api returns 404
        // Do not run the rest of the functions to populate weather forecast, and do not add to list
        // instead alert user that a proper city name must be used
    // After fetching data, take all relevant information and apply it to variables that will be passed to a function that populates information on the page
        // Variables include cityName, weather 6 days (current and next 5 days), and 
        // This function will make all elements on the right side visible
        // It will modify the text content in each box with the variables we passed from the fetch
    // Inside the fetch a second function will run that takes the users text input and create a button that is appended underneath the search text
        // Only 5 buttons will be allowed to be made!
            // If there are 5 when trying to append, first delete the oldest child, then append.
            // Check if the current cityName is the same as one of the buttons that already exists, if true, don't append button
    

document.querySelector('#weather-form').addEventListener('submit', function (event) {
    event.preventDefault();
    var cityName = document.getElementById('cityInput').value;
    fetchWeatherAPI(cityName);

});

function displayElementData(data) {
    var dates = document.querySelectorAll('.date');
    var images = document.querySelectorAll('.image');
    var temps = document.querySelectorAll('.temp');
    var winds = document.querySelectorAll('.wind');
    var humids = document.querySelectorAll('.humid');
    for(let i = 0; i < data.length; i++) { // Start moment js from today and increment by one for each day!
        dates[i].textContent = moment(data[0].dt_txt.split(' ')[0], "YYYY-MM-DD").add(i, 'd').format("(MM/DD/YYYY)"); 
        images[i].setAttribute('src', `http://openweathermap.org/img/wn/${data[i].weather[0].icon}@2x.png`)
        temps[i].textContent = "Temp: " + data[i].main.temp;
        winds[i].textContent = "Wind: " + data[i].wind.speed + " MPH";
        humids[i].textContent = "Humidity: " + data[i].main.humidity;
        
    }
    dates[0].textContent = moment(data[0].dt_txt.split(' ')[0], "YYYY-MM-DD").format("dddd (MM/DD/YYYY)");
}

function fetchWeatherAPI (cityName) {
    fetch (`https://api.openweathermap.org/data/2.5/forecast?units=imperial&q=${cityName}&appid=${apiKey}`) 
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        if (data.cod == 200) {
            displayElementData([data.list[0], data.list[7], data.list[15], data.list[23], data.list[31], data.list[39]]);
            appendCityButton(data.city.name);
            document.querySelector('#card-holder').classList.remove('d-none');
            document.querySelector('#card-holder').classList.add('d-flex');
        } else {
            alert('Enter a proper city name');
        }
    });
}

function appendCityButton(cityName) {
    var allCityButtons = document.querySelectorAll('.city-button');
    var repeat = false;
    for (let i = 0; i < allCityButtons.length; i++){
        if (cityName == allCityButtons[i].textContent) {
            repeat = true;
        }
    }

    if (!repeat) {
        if(allCityButtons.length === 5) {
            document.querySelector('#city-button-list').removeChild(document.querySelectorAll('li')[0]);
        }
        var listElement = document.createElement('li');
        var buttonElement = document.createElement('btn');
        buttonElement.classList.add('btn', 'btn-primary', 'city-button' );
        buttonElement.textContent = cityName;
        buttonElement.addEventListener('click', function (){
            fetchWeatherAPI(this.textContent)
        });
        listElement.append(buttonElement);
        document.querySelector('#city-button-list').append(listElement);
    }
    
}
