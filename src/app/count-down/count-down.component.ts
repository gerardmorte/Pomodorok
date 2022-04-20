import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-count-down',
  templateUrl: './count-down.component.html',
  styleUrls: ['./count-down.component.css'],
})
export class CountDownComponent implements OnInit {
  @ViewChild('reloj') date: ElementRef;

  constructor() {}

  ngOnInit(): void {}

  updateTime(i: string) {
    if (Number(i) < 10) {
      i = '0' + i;
    }
    return i;
  }

  countDown(min: number, sec: number) {
    let minutes: number = min;
    let seconds: number = sec;

    const contador = setInterval(() => {
      let fecha = new Date();
      fecha.setMinutes(minutes);
      fecha.setSeconds(seconds);
      seconds--;

      let minutos: string = String(fecha.getMinutes());
      let segundos: string = String(fecha.getSeconds());

      minutos = this.updateTime(minutos);
      segundos = this.updateTime(segundos);
      this.date.nativeElement.innerHTML = minutos + ':' + segundos;

      if (minutes == 0 && seconds == 0) {
        clearInterval(contador);
      }
    }, 1000);
  }

  startCountDown() {}

  stopCountDown() {}
}
