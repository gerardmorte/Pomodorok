import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-count-down',
  templateUrl: './count-down.component.html',
  styleUrls: ['./count-down.component.css'],
})
export class CountDownComponent implements OnInit {
  @ViewChild('reloj') date: ElementRef;
  @ViewChild('start') buttonStart: ElementRef;
  @ViewChild('longBreak15') longBreak15: ElementRef;
  @ViewChild('longBreak30') longBreak30: ElementRef;

  contador: any;
  setMinutes: number = 25;
  setSeconds: number = 0;
  initialMinutes: number;
  initialSeconds: number;
  minutes: number;
  seconds: number;
  break: boolean = false;
  contadorBreaks: number = 0;

  constructor() { }

  ngOnInit(): void { }

  ngAfterViewInit() {
    this.longBreak15.nativeElement.disabled = true;
    this.longBreak30.nativeElement.disabled = true;
  }


  updateTime(i: string) {
    if (Number(i) < 10) {
      i = '0' + i;
    }
    return i;
  }

  countDown(setMinutes: number, setSeconds: number) {
    this.initialMinutes = setMinutes;
    this.initialSeconds = setSeconds;
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
        this.playSound();
        this.stopCountDown(this.contador);
        this.nextCountDown();
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
    this.longBreak15.nativeElement.id = "";
    this.longBreak30.nativeElement.id = "";

    if (this.minutes == this.initialMinutes && this.seconds == this.initialSeconds) {
      this.countDown(min, sec);
      this.buttonStart.nativeElement.disabled = true;

    } else {
      this.restartCountDown();
      this.buttonStart.nativeElement.disabled = true;
    }
  }

  nextCountDown() {
    this.stopCountDown(this.contador);
    if (this.contadorBreaks == 3 && !this.break) {
      this.longBreak15.nativeElement.disabled = false;
      this.longBreak30.nativeElement.disabled = false;
      this.longBreak15.nativeElement.id = "flashingText";
      this.longBreak30.nativeElement.id = "flashingText";
      this.date.nativeElement.innerHTML = "00:00";
      this.buttonStart.nativeElement.disabled = true;
    } else if (!this.break) {
      this.shortBreak(5, 0);
      this.stopCountDown(this.contador);
    } else {
      this.focusTime(25, 0);
      this.stopCountDown(this.contador);
    }
  }

  focusTime(min: number, sec: number) {
    this.setMinutes = min;
    this.setSeconds = sec;
    this.countDown(this.setMinutes, this.setSeconds);
    this.date.nativeElement.innerHTML = this.setMinutes + ':' + this.setSeconds + "0";
    this.break = false;
    this.longBreak15.nativeElement.disabled = true;
    this.longBreak30.nativeElement.disabled = true;
  }

  shortBreak(min: number, sec: number) {
    this.setMinutes = min;
    this.setSeconds = sec;
    this.countDown(this.setMinutes, this.setSeconds);
    this.date.nativeElement.innerHTML = "0" + this.setMinutes + ':' + this.setSeconds + "0";
    this.break = true;
    this.contadorBreaks++;
  }

  longBreak(min: number, sec: number) {
    this.setMinutes = min;
    this.setSeconds = sec;
    this.countDown(this.setMinutes, this.setSeconds);
    this.date.nativeElement.innerHTML = this.setMinutes + ':' + this.setSeconds + "0";
    this.break = true;
    this.contadorBreaks = 0;
    this.stopCountDown(this.contador);
    this.longBreak15.nativeElement.disabled = true;
    this.longBreak30.nativeElement.disabled = true;
  }

  playSound() {
    let audio = new Audio();
    audio.src = ".//src/assets/audio/notification.wav";
    audio.load();
    audio.play();
  }

}
