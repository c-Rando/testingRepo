$(document).ready(function () {
    console.log("ready");
    // prepares dom
    // TODO: GLOBAL VARIABLES
    var dayOneContainer = $("#day-one-container");
    var currentTemperature = $('#current-temperature');
    var currentCity = $('#current-city'); // todo #current-city  make equal to 5 day
    var currentWSpeed = $('#wind-speed'); // todo add wind speed to details
    var futureWSpeed = "";

    var hours = $("#hours").on("click",);
    var amenities = $("#amenities").on("click",);
    var alerts = $("#alerts").on("click",);
    var ContainerEl = document.querySelector('#container');
    var MAPQ_API_KEY = "yQcB9Koy5KFxIcWM6GPCjCJ132aiYGhh";
    //*! CONFIRMED VARIABLES
    var searchParkBtnEl = $('#search-park');
    var timeDispEl = $("#time-display");
    var apiKey = "1e03961191fd6205d5b71042cdc5d758";

    var lat = [

    ];
    var lon = [
        
    ];



    function getCurrentWeather(event) {
        event.preventDefault();
        var city = $("#city-name").val(); // city will be 
        $("#chosen-city").text(city); 
        var holdingDiv = $("<div>");
        var oneCallUrlApi = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely,current,alerts&units=imperial&appid=${apiKey}`
        console.log("the weather api is: ", oneCallUrlApi)
        // console.log("current day communication succeed: ", currentUrlApi);
        $.ajax({
            url: oneCallUrlApi,
            success: function (response) {
                console.log(response);
                var latCoord= response.coord.lat
                var lonCoord = response.coord.lon
                // console.log("attempting to pull the json: ", response.weather[0].icon);
                console.log("this is the lat, then lon: ", latCoord, lonCoord);
                npsApiCall(response.data[i].latitude, response.data[i].longitude);
            },
            error: function (xhr, status, error) {
                console.log("status: ", status)
                console.log("error: ", error)
            },
            complete: function (xhr, status) {
                console.log("complete: ", status)
            }
        })
    };
    // TODO must return null if city is invalid

    // //*! COMPLETED time display function
    // function displayTime() {
    //     var rightNow = moment().format('MMM DD, YYYY [at] hh:mm:ss a');
    //     timeDispEl.text(rightNow);
    //     var present = rightNow.substring(0, 6);
    //     console.log(present)
    // };
    // holdingDiv = $("<div>")
    //     $("#current-weather-container").empty();
    //     $("#day-one-container").empty();
    //     $("#day-two-container").empty();
    //     $("#day-three-container").empty();
    //     $("#day-four-container").empty();
    // //     $("#day-five-container").empty();
    // $(searchParkBtnEl).click(function () {
    // });
    // // setInterval(displayTime, 1000);
    // searchParkBtnEl.on("click", getCurrentWeather);
    // searchCityBtnEl.on("click", renderLastRegistered);
    // Script from the Logic.JS (parkout)
    // todo: global variables

    // TODO declare & troubleshoot

    // TODO must be called on html 
    function npsApiCall(parkNJ) {
        var npsKey = "wuCQVj3eIqguFjOi2HEN7r2l4IDFb4FD90hGt35N";
        var npsUrl = `https://developer.nps.gov/api/v1/parks?stateCode=${parkNJ}&api_key=${npsKey}`
        console.log("my park list: ", npsUrl);
        $.ajax({
            url: npsUrl,
            success: function (response) {
                console.log(response.data);
                $('#myList').empty();
                for (let i = 0; i < response.data.length; i++) {
                    var nameP = response.data[i].fullName;
                    var latP = response.data[i].latitude;
                    console.log(latP);
                    var longP = response.data[i].longitude;
                    console.log(longP);
                    var contactP = response.data[i].contacts;
                    console.log(contactP);
                    var activitiesP = response.data[i].activities[0];
                    console.log(activitiesP);
                    var feesP = response.data[i].entranceFees[0].cost;
                    console.log(feesP);
                    $('#myList').append('<a class="dropdown-item" href="#">' + nameP + '</a>')
                }
                // console.log(latitude, longitude);
                // mapQuestApiCall(latitude, longitude);
            },
            error: function (xhr, status, error) {
                console.log("status: ", status)
                console.log("error: ", error)
            },
            complete: function (xhr, status) {
                console.log("complete: ", status)
            }
        })
        //*! LAT & LONGITUDE
        function mapQuestApiCall(x, y) {
            console.log(x, y)
            var mapUrl = "https://www.mapquestapi.com/staticmap/v5/map?key=" + MAPQ_API_KEY + "&center=" + x + "," + y + "&zoom=10&type=hyb&size=600,400@2x";
            console.log(mapUrl)
        }
    };

    // setInterval(displayTime, 1000);
});
