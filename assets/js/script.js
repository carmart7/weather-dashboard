var apiKey = "35fdec6a65ccb234ade5e87353c67e78";
var cityName = "  HayWard";
var cityCoordsURL = `https://api.openweathermap.org/data/2.5/forecast?units=imperial&q=${cityName}&appid=${apiKey}`;



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
    
var temp = document.querySelectorAll('.weather-card');
console.log(temp);

document.querySelector('#weather-form').addEventListener('submit', async function (event) {
    event.preventDefault();
    await fetch (cityCoordsURL) 
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        if (data.cod == 200) {
            forecast = [data.list[0], data.list[7], data.list[15], data.list[23], data.list[31], data.list[39]];
        } else {
            console.log("That didn't work!");
        }
    });
});