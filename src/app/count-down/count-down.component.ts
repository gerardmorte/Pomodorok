import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-count-down',
  templateUrl: './count-down.component.html',
  styleUrls: ['./count-down.component.css'],
})
export class CountDownComponent implements OnInit {
  @ViewChild('reloj') date: ElementRef;
  @ViewChild('start') buttonStart: ElementRef;
  @ViewChild('stop') buttonStop: ElementRef;
  @ViewChild('longBreak15') longBreak15: ElementRef;
  @ViewChild('longBreak30') longBreak30: ElementRef;

  contador: any;
  setMinutes: number = 25;
  setSeconds: number = 0;
  initialMinutes: number;
  initialSeconds: number;
  minutes: number;
  seconds: number;
  textMinutes: string;
  textSeconds: string;
  sendMinutes: number;
  sendSeconds: number;
  break: boolean = false;
  contadorBreaks: number = 0;
  finPomodoro: Date = new Date();

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

  countDown(min: number, sec: number) {
    this.initialMinutes = min;
    this.initialSeconds = sec;
    this.minutes = this.initialMinutes;
    this.seconds = this.initialSeconds;

    this.contador = setInterval(() => {
      let fecha = new Date();
      fecha.setMinutes(this.minutes);
      fecha.setSeconds(this.seconds);

      this.textMinutes = String(fecha.getMinutes());
      this.textSeconds = String(fecha.getSeconds());

      this.textMinutes = this.updateTime(this.textMinutes);
      this.textSeconds = this.updateTime(this.textSeconds);
      this.date.nativeElement.innerHTML = this.textMinutes + ':' + this.textSeconds;

      if (this.minutes == 0 && this.seconds == 0) {
        this.playSound();
        this.pauseCountDown(this.contador);
        this.nextCountDown();
      }
      this.seconds--;

    }, 1000);

  }

  pauseCountDown(timer: any) {
    clearInterval(timer);
    this.buttonStart.nativeElement.disabled = false;
    let totalMinutes = this.initialMinutes - Number(this.textMinutes) - 1;
    let totalSeconds = 60 - Number(this.textSeconds);
    this.sendMinutes = totalMinutes;
    this.sendSeconds = totalSeconds;
  }

  restartCountDown() {
    this.countDown(this.minutes, this.seconds);
  }

  btnStart(min: number, sec: number) {
    this.longBreak15.nativeElement.id = "";
    this.longBreak30.nativeElement.id = "";

    if (this.buttonStop.nativeElement.disabled = true) {
      this.buttonStop.nativeElement.disabled = false;
    }

    if (this.minutes == this.initialMinutes && this.seconds == this.initialSeconds) {
      this.countDown(min, sec);
      this.buttonStart.nativeElement.disabled = true;

    } else {
      this.restartCountDown();
      this.buttonStart.nativeElement.disabled = true;
    }
  }

  nextCountDown() {
    console.log(this.contadorBreaks);
    this.pauseCountDown(this.contador);
    if (this.contadorBreaks == 3 && !this.break) {
      this.longBreak15.nativeElement.disabled = false;
      this.longBreak30.nativeElement.disabled = false;
      this.longBreak15.nativeElement.id = "flashingText";
      this.longBreak30.nativeElement.id = "flashingText";
      this.date.nativeElement.innerHTML = "00:00";
      this.buttonStart.nativeElement.disabled = true;
      this.buttonStop.nativeElement.disabled = true;
    } else if (!this.break) {
      this.shortBreak(5, 0);
      this.pauseCountDown(this.contador);
    } else {
      this.focusTime(25, 0);
      this.pauseCountDown(this.contador);
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
    this.pauseCountDown(this.contador);
    this.longBreak15.nativeElement.disabled = true;
    this.longBreak30.nativeElement.disabled = true;
  }

  playSound() {
    let audio = new Audio();
    audio.src = ".//src/assets/audio/notification.wav";
    audio.load();
    audio.play();
  }

  stopPomodoro() {
    this.pauseCountDown(this.contador);
    this.contadorBreaks = 0;
    this.focusTime(25, 0);
    this.pauseCountDown(this.contador);
    this.buttonStop.nativeElement.disabled = false;
    console.log(this.finPomodoro);
  }

}
