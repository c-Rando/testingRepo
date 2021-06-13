
var getParkBtnEl = $("#get-park-names");
console.log("Loaded index.js");


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

