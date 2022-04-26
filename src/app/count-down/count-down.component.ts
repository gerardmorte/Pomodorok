import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormComponent } from '../form/form.component';

@Component({
  selector: 'app-count-down',
  templateUrl: './count-down.component.html',
  styleUrls: ['./count-down.component.css'],
})
export class CountDownComponent implements OnInit {
  @ViewChild('reloj') date: ElementRef;
  @ViewChild('start') buttonStart: ElementRef;
  @ViewChild('pause') buttonPause: ElementRef;
  @ViewChild('next') buttonNext: ElementRef;
  @ViewChild('stop') buttonStop: ElementRef;

  //ELEMENTS FROM FORM COMPONENT//
  @ViewChild(FormComponent) form: { statisticsArray: object };
  pruebaEnviarArray: object;
  @ViewChild(FormComponent) inputElement: { inputTask: ElementRef };
  @ViewChild(FormComponent) saveElement: { saveTask: ElementRef };
  @ViewChild(FormComponent) editElement: { editTask: ElementRef };

  //VARIABLES ADMINISTRAR COUNTDOWN()
  contador: any;
  setMinutes: number = 25;
  setSeconds: number = 0;
  initialMinutes: number;
  initialSeconds: number;
  minutes: number;
  seconds: number;
  textMinutes: string;
  textSeconds: string;

  //VARIABLES MODIFICABLES DES DE SETTINGS?
  focusMin: number;
  focusSec: number;
  shortBreakMin: number;
  shortBreakSec: number;
  longBreakMin: number;
  longBreakSec: number;
  //
  break: boolean = false;
  contadorBreaks: number = 0;
  firstStart: boolean;
  //
  //Variables para contar el tiempo de bloque
  totalMin: number = 0;
  totalSec: number = 0;
  auxTotalMin: number = this.totalMin;
  auxTotalSec: number = this.totalSec;

  //ARRAY A ENVIAR A STATISTICS
  tiempoBloque: string = "";
  tareaBloque: string = "";
  estadisticasArray: any = [];

  constructor() { }

  ngOnInit(): void { }

  ngAfterViewInit() {
    this.buttonPause.nativeElement.disabled = true;
    this.buttonNext.nativeElement.disabled = true;
    this.buttonStop.nativeElement.disabled = true;
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
    this.editElement.editTask.nativeElement.disabled = false;

    this.totalMin, this.totalSec = 0;
    this.totalMin = this.initialMinutes - Number(this.textMinutes) - 1;
    this.totalSec = this.totalSec + 60 - parseInt(this.textSeconds);
    this.totalMin = this.totalMin + this.auxTotalMin;
    this.totalSec = this.totalSec + this.auxTotalSec;

    console.log(this.totalMin + ":" + this.totalSec);
  }

  restartCountDown() {
    this.countDown(this.minutes, this.seconds);
  }

  btnStart(min: number, sec: number) {
    this.editElement.editTask.nativeElement.disabled = true;

    if (!this.firstStart) {
      this.buttonPause.nativeElement.disabled = false;
      this.buttonNext.nativeElement.disabled = false;
      this.buttonStop.nativeElement.disabled = false;
      this.firstStart = true;
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
    this.auxTotalMin = this.totalMin;
    this.auxTotalSec = this.totalSec;

    clearInterval(this.contador);
    this.buttonStart.nativeElement.disabled = true;
    if (this.contadorBreaks == 3 && !this.break) {
      this.longBreak(50, 0);
    } else if (!this.break) {
      this.shortBreak(5, 0);
    } else {
      this.focusTime(25, 0);
    }
  }

  focusTime(min: number, sec: number) {
    this.setMinutes = min;
    this.setSeconds = sec;
    this.countDown(this.setMinutes, this.setSeconds);
    this.date.nativeElement.innerHTML = this.setMinutes + ':' + this.setSeconds + "0";
    this.break = false;
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
    this.buttonPause.nativeElement.disabled = true;
    this.buttonNext.nativeElement.disabled = true;
    this.buttonStop.nativeElement.disabled = true;
    this.inputElement.inputTask.nativeElement.disabled = false;
    this.saveElement.saveTask.nativeElement.disabled = false;
    this.firstStart = false;

    //GUARDAR TEMPS TOTAL DEL BLOC
    this.tiempoBloque = String(this.totalMin) + ":" + String(this.totalSec);
    this.tareaBloque = this.inputElement.inputTask.nativeElement.value;

    //NETEJAR TEMPS TOTAL DEL BLOC I TEXT FORMULARI.
    this.totalMin, this.totalSec, this.auxTotalMin, this.auxTotalSec = 0;
    this.inputElement.inputTask.nativeElement.value = "";

    //GUARDAR DADES AL ARRAY
    let elem = [{ tiempoBloque: this.tiempoBloque, tareaBloque: this.tareaBloque }];
    this.estadisticasArray.push(elem);
    console.log(this.estadisticasArray)

    //PLAYSOUND
    this.playSound();
  }

}
