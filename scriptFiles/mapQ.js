//*! LAT & LONGITUDE - Future enhancement
console.log("Loaded mapQ.js");


var MAPQ_API_KEY = "yQcB9Koy5KFxIcWM6GPCjCJ132aiYGhh";


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