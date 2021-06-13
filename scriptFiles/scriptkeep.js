$(document).ready(function () {
    console.log("ready");
    // prepares dom
    // TODO: GLOBAL VARIABLES            

    var hours = $("#hours").on("click",);
    console.log(hours);
    var amenities = $("#amenities").on("click",);
    console.log(amenities);
    var alerts = $("#alerts").on("click",);
    console.log(alerts);
    var MAPQ_API_KEY = "yQcB9Koy5KFxIcWM6GPCjCJ132aiYGhh";
    // hours amenities alerts
    // TODO declare & troubleshoot

    // TODO must be called on html 
    function npsApiCall(parkNJ) {
        var npsKey = "aKdQbl5YRDOdOcAzaiDfbacSBby5NQWEU8s5Mi5D";
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
                //mapQuestApiCall(latitude, longitude);
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
});