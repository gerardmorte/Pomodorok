import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-count-down',
  templateUrl: './count-down.component.html',
  styleUrls: ['./count-down.component.css'],
})
export class CountDownComponent implements OnInit {
  @ViewChild('reloj') date: ElementRef;
  @ViewChild('start') buttonStart: ElementRef;

  contador: any;
  initialMinutes: number;
  initialSeconds: number;
  minutes: number;
  seconds: number;

  constructor() { }

  ngOnInit(): void { }

  updateTime(i: string) {
    if (Number(i) < 10) {
      i = '0' + i;
    }
    return i;
  }

  countDown(min: number, sec: number) {
    this.initialMinutes = min;
    this.initialSeconds = sec;
    this.minutes = this.initialMinutes;
    this.seconds = this.initialSeconds;

    this.contador = setInterval(() => {
      let fecha = new Date();
      fecha.setMinutes(this.minutes);
      fecha.setSeconds(this.seconds);

      let minutos: string = String(fecha.getMinutes());
      let segundos: string = String(fecha.getSeconds());

      minutos = this.updateTime(minutos);
      segundos = this.updateTime(segundos);
      this.date.nativeElement.innerHTML = minutos + ':' + segundos;

      if (this.minutes == 0 && this.seconds == 0) {
        this.stopCountDown(this.contador);
      }

      this.seconds--;
    }, 1000);
  }

  stopCountDown(timer: any) {
    clearInterval(timer);
    this.buttonStart.nativeElement.disabled = false;
  }

  restartCountDown() {
    this.countDown(this.minutes, this.seconds);
  }

  btnStart(min: number, sec: number) {
    let clicado: Number = 0;

    if (this.minutes == this.initialMinutes && this.seconds == this.initialSeconds) {
      this.countDown(min, sec);
      this.buttonStart.nativeElement.disabled = true;

    } else {
      this.restartCountDown();
      this.buttonStart.nativeElement.disabled = true;
    }
  }

  resetCountDown() {

  }

  nextCountDown() {

  }

}
