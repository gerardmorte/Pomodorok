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
        this.stopCountDown(this.contador);
      }

      this.seconds--;
    }, 1000);

  }

  stopCountDown(timer: any) {
    clearInterval(timer);
    this.buttonStart.nativeElement.disabled = false;
    this.date.nativeElement.innerHTML = "STOP"; //PROVISIONAL
  }

  restartCountDown() {
    this.countDown(this.minutes, this.seconds);
  }

  btnStart(min: number, sec: number) {

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
      let finalBreak: boolean = false;

      if (finalBreak) {
        this.setMinutes = 15;
        this.setSeconds = 0;
      } else {
        this.setMinutes = 30;
        this.setSeconds = 0;
      }

      this.countDown(this.setMinutes, this.setSeconds);
      this.date.nativeElement.innerHTML = this.setMinutes + ':' + this.setSeconds + "0";
      this.break = true;
      this.contadorBreaks = 0;
      console.log(this.contadorBreaks);

    } else if (!this.break) {
      this.setMinutes = 5;
      this.setSeconds = 0;
      this.countDown(this.setMinutes, this.setSeconds);
      this.date.nativeElement.innerHTML = "0" + this.setMinutes + ':' + this.setSeconds + "0";
      this.break = true;
      this.contadorBreaks++;
      console.log(this.contadorBreaks);

    } else {
      this.setMinutes = 25;
      this.setSeconds = 0;
      this.countDown(this.setMinutes, this.setSeconds);
      this.date.nativeElement.innerHTML = this.setMinutes + ':' + this.setSeconds + "0";
      this.break = false;
    }

    this.stopCountDown(this.contador);

    if(this.contadorBreaks == 0 && this.break){
      this.date.nativeElement.innerHTML = '<button class="">15´</button><button class="">30´</button>';
    }
    else if (this.break)
      this.date.nativeElement.innerHTML = "BREAK";
    else {
      this.date.nativeElement.innerHTML = "FOCUS";
    }
  }

}
