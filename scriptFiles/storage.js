// // todo: Global Variables
console.log("Loaded storage.js");

// var phonenumber,
//     email,
//     activity,
//     fees,
//     lat,
//     lon = "";
    
// // Getting Answers from NPS Park API
// function getAnswer(e, pIndex) {
//     e.preventDefault();
//     var data = JSON.parse(sessionStorage.getItem(pIndex.toString()));
//     var contactP = data.contacts;
//     if (contactP != null && contactP.phoneNumbers.length > 0) {
//         phonenumber = contactP.phoneNumbers[0].phoneNumber;
//     }
//     // Check if we want keep email info
//     if (contactP != null && contactP.emailAddresses.length > 0) {
//         email = contactP.emailAddresses[0].emailAddresses;
//     }
//     activity = data.activities[0].name;
//     fees = data.entranceFees[0].cost;
//     lat = data.latitude;
//     lon = data.longitude;
//     $("#spanphoneNumber").text("");
//     $("#spanEmail").text("");
//     $("#spanActivity").text("");
//     $("#spanFees").text("");
//     $("#divInformation").hide();
// };