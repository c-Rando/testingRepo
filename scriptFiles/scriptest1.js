// todo: Global Variables
var phonenumber,
    email,
    activity,
    fees,
    lat,
    lon = "";
var MAPQ_API_KEY = "yQcB9Koy5KFxIcWM6GPCjCJ132aiYGhh";
var getParkBtnEl = $("#get-park-names");
var apiKey = "653094733b20fc02dc6f1e6e6b8bf37e";
console.log("ready");

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
};

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
                $("#myList").append(
                    "<a class='dropdown-item' href='#' onclick='getAnswer(event," +
                    i.toString() +
                    ")'>" +
                    nameP +
                    "</a>"
                );
            }
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

