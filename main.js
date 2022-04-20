let firstMin = 1;
let firstSec = 0;

function countDown(min, sec) {
  let minutes = min;
  let seconds = sec;
  const element = document.getElementById("countDown");
  
  const counter = setInterval(function () {
    if (seconds == -1) {
      seconds = 59;
      minutes--;
    }

    if (element.textContent == "00:00" || bool == false) {
      clearInterval(counter);

    } else if (minutes < 10 && seconds < 10) {
      element.innerHTML = "0" + minutes + ":0" + seconds--;

    } else if (minutes < 10) {
      element.innerHTML = "0" + minutes + ":" + seconds--;

    } else if (seconds < 10) {
      element.innerHTML = minutes + ":0" + seconds--;

    } else {
      element.innerHTML = minutes + ":" + seconds--;
    }
  }, 1000);

  console.log();
}

/////////////////////
let bool = false;

function prueba() {
  const element = document.getElementById("prueba");
  const element2 = document.getElementById("countDown");

  if (bool == false) {
    element.innerHTML = "c";
    bool = true;
    countDown(firstMin, firstSec);
  } else {
    element.innerHTML = "b";
    bool = false;
    saveTime = element2.textContent;
    let time = saveTime.split(":");
    
    firstMin = parseInt(time[0]);
    firstSec = time[1] - 1;

    console.log(time[0]);
    console.log(time[1]);
  }
}
