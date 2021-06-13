//*! Weather Information
function getFiveDayWeatherApi(lat, lon) {
    var city = $("#city-name").val();
    console.log("current searched was: ", city);
    var fiveDayUrlApi = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely,current,alerts&units=imperial&appid=${apiKey}`;
    console.log("fivedayURL: ", fiveDayUrlApi);
    $.ajax({
        url: fiveDayUrlApi,
        success: function (response) {
            console.log("object extracted: ", response);
            console.log(response.daily[0].dt);
            //for (var i = 0; i < 6; i++) {
            var i = 0;
            var weather = response.daily[i].weather[0].description;
            var icon = response.daily[i].weather[0].icon;
            var temp = response.daily[i].temp.day;
            var uvi = response.daily[i].uvi;
            var iconImage = $("<img>").attr(
                "src",
                `http://openweathermap.org/img/wn/${icon}@2x.png`
            );
            console.log(iconImage);
            console.log(response.daily[i].temp.day);
            console.log("div" + '[data-index="' + i + '"]');
            $("div" + '[data-index="' + i + '"]').append(
                " weather: " + weather,
                iconImage,
                "<br>",
                " temp: " + temp,
                "<br>",
                " uv index: " + uvi
            );
            console.log(uvi);
            storeObj = {
                weather: weather,
                icon: icon,
                temp: temp,
                uvi: uvi,
            };
            //*! Must store value entered by userinput to user storage
            localStorage.setItem(city + " day-" + i, JSON.stringify(storeObj));
            //};
        },
        error: function (xhr, status, error) {
            console.log("status: ", status);
            console.log("error: ", error);
        },
        complete: function (xhr, status) {
            console.log("complete: ", status);
        },
    });
};

$("#hide-weather").click(function () {
    $("#current-weather-container").empty();
});

// Calls all information needed for the User
function clickSubmit() {
    $("#divInformation").show();
    if ($("#admission").is(":checked")) {
        $("#spancontact").show();
        $("#spanphoneNumber").text(phonenumber);
        $("#spanEmail").text(email);
    } else {
        $("#spancontact").hide();
    }
    if ($("#activities").is(":checked")) {
        $("#spanActivity").text(activity);
    }
    if ($("#fees").is(":checked")) {
        $("#spanFees").text(fees);
    }
    if ($("#weather").is(":checked")) {
        getFiveDayWeatherApi(lat, lon);
    }
};
