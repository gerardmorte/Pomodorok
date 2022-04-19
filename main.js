countDown(25);

function countDown(time) {
  let minutes = time;
  let seconds = -1;
  const element = document.getElementById("countDown");
  element.style.color = "red";
  element.innerHTML = time + ":00";

  const counter = setInterval(function () {
    if (seconds == -1) {
      seconds = 59;
      minutes--;
    }
    if (seconds < 10) {
      element.innerHTML = minutes + ":0" + seconds--;
    } else {
      element.innerHTML = minutes + ":" + seconds--;
    }

    if (minutes == 23) {
      clearInterval(counter); //CAPTAR LOS MINUTOS PARA LUEGO REINICIAR EL CONTADOR CON ESOS MINUTOS Y SEGUNDOS. IMPLEMENTAR EN LOS CONTROLES
    }
  }, 1000);
}
