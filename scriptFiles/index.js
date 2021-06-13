
var getParkBtnEl = $("#get-park-names");
console.log("Loaded index.js");



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

