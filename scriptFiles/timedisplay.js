// todo: Global Variables
var timeDispEl = $("#time-display");


// *! COMPLETED time display function
function displayTime() {
  var rightNow = moment().format("MMM DD, YYYY [at] hh:mm:ss a");
  timeDispEl.text(rightNow);
  var present = rightNow.substring(0, 6);
  console.log(present);
};

setInterval(displayTime, 1000);
