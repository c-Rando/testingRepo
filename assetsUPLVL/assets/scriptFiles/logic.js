var phonenumber,
  email,
  activity,
  fees,
  lat,
  lon = "";
console.log("ready");
// todo: Global Variables

var flexibleUnixNumeric ;
var MAPQ_API_KEY = "yQcB9Koy5KFxIcWM6GPCjCJ132aiYGhh";
var getParkBtnEl = $("#get-park-names");
var timeDispEl = $("#time-display");
var apiKey = "653094733b20fc02dc6f1e6e6b8bf37e";
// *! COMPLETED time display function
function displayTime() {
  var rightNow = moment().format("MMM DD, YYYY [at] hh:mm:ss a");
  timeDispEl.text(rightNow);
  var present = rightNow.substring(0, 6);
  console.log(present);
};

//*! LAT & LONGITUDE - Future enhancement
function mapQuestApiCall(x, y) {
  console.log(x, y);
  var mapUrl =
    "https://www.mapquestapi.com/staticmap/v5/map?key=" +
    MAPQ_API_KEY +
    "&center=" +
    x +
    "," +
    y +
    "&zoom=10&type=hyb&size=600,400@2x";
  console.log(mapUrl);
};

function relocateToLander() {
  window.location.replace("../../../apiLandingPage.html");
};

//*! Weather Information
function getFiveDayWeatherApi(lat, lon) {
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
      var moonrise = response.daily[i].moonrise;
      var moonset = response.daily[i].moonset;
      var sunrise = response.daily[i].sunrise;
      var sunset = response.daily[i].sunset;
      // moonrise: moonset: sunrise: sunset: 
      var iconImage = $("<img>").attr(
        "src",
        `http://openweathermap.org/img/wn/${icon}@2x.png`
      );
      console.log(`the converted time for the sunset is ${unixConversion(sunset)}`);
      console.log(`the sunset is ${sunset}`);
      console.log(`the sunrise is ${sunrise}`);
      console.log(`the moonset is ${moonset}`);
      console.log(`the moonrise is ${moonrise}`);
      console.log(`the temp is ${temp}`);
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
      localStorage.setItem(   + " day-" + i, JSON.stringify(storeObj));
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
}
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
}
$("#hide-weather").click(function () {
  $("#current-weather-container").empty();
});
// Getting Answers from NPS Park API
function getAnswer(e, pIndex) {
  e.preventDefault();
  var data = JSON.parse(sessionStorage.getItem(pIndex.toString()));
  var contactP = data.contacts;
  if (contactP != null && contactP.phoneNumbers.length > 0) {
    phonenumber = contactP.phoneNumbers[0].phoneNumber;
  }
  // Check if we want keep email info
  if (contactP != null && contactP.emailAddresses.length > 0) {
    email = contactP.emailAddresses[0].emailAddresses;
  }
  activity = data.activities[0].name;
  fees = data.entranceFees[0].cost;
  lat = data.latitude;
  lon = data.longitude;
  $("#spanphoneNumber").text("");
  $("#spanEmail").text("");
  $("#spanActivity").text("");
  $("#spanFees").text("");
  $("#divInformation").hide();
}
// Fetching Data from NPS API
function npsApiCall(parkNJ) {
  var npsKey = "aKdQbl5YRDOdOcAzaiDfbacSBby5NQWEU8s5Mi5D";
  var npsUrl = `https://developer.nps.gov/api/v1/parks?stateCode=${parkNJ}&api_key=${npsKey}`;
  console.log("my park list: ", npsUrl);
  $.ajax({
    url: npsUrl,
    success: function (response) {
      console.log(response.data);
      $("#myList").empty();
      for (let i = 0; i < response.data.length; i++) {
        var nameP = response.data[i].fullName;
        var latP = response.data[i].latitude;
        var longP = response.data[i].longitude;
        sessionStorage.removeItem(i.toString());
        sessionStorage.setItem(i.toString(), JSON.stringify(response.data[i]));
        //list now appends to page after dynamic generation
        $("#myList").append(
          `<a class='dropdown-item' href= 'https:../../../apiLandingPage.html' onclick='getAnswer(event, ${i.toString()} ${nameP} </a> `

// *TODO INITIAL CODE
          // "<a class='dropdown-item' href='https://www.google.com' onclick='getAnswer(event," + 
          //   i.toString() + 
          //   ")'>" + 
          //   nameP + 
          //   "</a>"
        );
        
        // // will append to div on new page but must relocate first
        // $("#appending-div").append(
        //   "<a class='dropdown-item' href='#' onclick='relocateToLander() , getAnswer(event," + 
        //     i.toString() + 
        //     ")'>" + 
        //     nameP + 
        //     "</a>"
        // );
      }
    },
    error: function (xhr, status, error) {
      console.log("status: ", status);
      console.log("error: ", error);
    },
    complete: function (xhr, status) {
      console.log("completed Phase 1: pulled from NPS:", status);
    },
  });
}
$(document).ready(function () {
  $("#container1").show();
  $("#container2").show();
  $("#container3").hide();
  $("#container4").hide();
  $("#divInformation").hide();
  $("#myList").click(function () {
    $("#container1").hide("slow");
    $("#container2").hide("slow");
    $("#container3").show();
  });
  $("#hide-weather").click(function () {
    $("#container1").hide("slow");
    $("#container2").hide("slow");
    $("#container3").hide("slow");
    $("#container4").show();

  });
  $("#home").click(function () {
    $("#container1").show();
    $("#container2").show();
    $("#container3").hide("slow");
    $("#container4").hide("slow");
    $("#container5").hide("slow");
     
  });

  $("#getNewPark").click(function () {
    $("#container1").hide("slow");
    $("#container2").hide("slow");
    $("#container3").fadeIn();
    $("#container4").hide("slow");
    $("#container5").hide("slow");
  });
});


//must be called to the api call to convert the timestamp you receive
function unixConversion(unixTime) {
  
  var date = new Date(unixTime * 1000);
  // Hours part from the timestamp
  var hours = date.getHours();
  // Minutes part from the timestamp
  var minutes = "0" + date.getMinutes();
  // Seconds part from the timestamp
  var seconds = "0" + date.getSeconds();
  
  // Will display time in 10:30:23 format
  var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
  
  console.log(formattedTime);
  return formattedTime;
};

setInterval(displayTime, 1000);
