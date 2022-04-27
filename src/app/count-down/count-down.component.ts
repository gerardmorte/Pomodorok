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

  //ELEMENTS FROM FORM COMPONENT
  @ViewChild(FormComponent) inputElement: { inputTask: ElementRef };
  @ViewChild(FormComponent) saveElement: { saveTask: ElementRef };
  @ViewChild(FormComponent) editElement: { editTask: ElementRef };

  //VARIABLES ADMINISTRAR COUNTDOWN()
  contador: any;
  setMinutes: number;
  setSeconds: number;
  initialMinutes: number;
  initialSeconds: number;
  minutes: number;
  seconds: number;
  textMinutes: string;
  textSeconds: string;
  //
  break: boolean = false;
  contadorBreaks: number = 0;
  firstStart: boolean;

  //Variables para contar el tiempo de bloque
  totalMin: number = 0;
  totalSec: number = 0;
  auxTotalMin: number = this.totalMin;
  auxTotalSec: number = this.totalSec;

  //ARRAY A ENVIAR A STATISTICS
  tiempoBloque: string = "";
  tareaBloque: string = "";
  estadisticasArray: any = [];

  //ARRAY SETTINGS REBRE DADES
  settingsArray: any = [];

  //VISTA RELOJ CONTROLADOR
  firstTimer: boolean = true;

  //PRUEBA EXPORTAR VARIABLE PARA SABER ESTADO DE BOTON START I DESHABILITAR O HABILITAR MENU.
  static startStatus: string = "false";
  //

  constructor() { }

  ngOnInit(): void {
    this.getEstadisticas();
    this.getSettings();
    console.log(this.settingsArray);
     //EXPORTAR BOOLEAN BOTON START
  }

  ngAfterViewInit() {
    this.buttonPause.nativeElement.disabled = true;
    this.buttonNext.nativeElement.disabled = true;
    this.buttonStop.nativeElement.disabled = true;

    //DESACTIVAR TOTS ELS BUTTONS QUAN S'ESTA EDITANT EL TASK
    // if(this.saveElement.saveTask.nativeElement.disabled == false){
    //   this.buttonStart.nativeElement.disabled = true;
    // }
    //
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

      //PRUEBA MODIFICAR VARIABLE PARA SABER ESTADO DE BOTON START I DESHABILITAR O HABILITAR MENU.
      CountDownComponent.startStatus = "Pepe";
      console.log(CountDownComponent.startStatus);
      //
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

    this.pauseCountDown(this.contador);

    this.buttonStart.nativeElement.disabled = true;
    if (this.contadorBreaks == 3 && !this.break) {
      this.longBreak(this.settingsArray[2], 0);
    } else if (!this.break) {
      this.shortBreak(this.settingsArray[1], 0);
    } else {
      this.focusTime(this.settingsArray[0], 0);
    }
  }

  focusTime(min: number, sec: number) {
    this.setMinutes = min;
    this.setSeconds = sec;
    this.countDown(this.setMinutes, this.setSeconds);
    this.textMinutes = this.updateTime(String(this.setMinutes));
    this.textSeconds = this.updateTime(String(this.setSeconds));
    this.date.nativeElement.innerHTML = this.textMinutes + ':' + this.textSeconds;
    this.break = false;
  }

  shortBreak(min: number, sec: number) {
    this.setMinutes = min;
    this.setSeconds = sec;
    this.countDown(this.setMinutes, this.setSeconds);
    this.textMinutes = this.updateTime(String(this.setMinutes));
    this.textSeconds = this.updateTime(String(this.setSeconds));
    this.date.nativeElement.innerHTML = this.textMinutes + ':' + this.textSeconds;
    this.break = true;
    this.contadorBreaks++;
  }

  longBreak(min: number, sec: number) {
    this.setMinutes = min;
    this.setSeconds = sec;
    this.countDown(this.setMinutes, this.setSeconds);
    this.textMinutes = this.updateTime(String(this.setMinutes));
    this.textSeconds = this.updateTime(String(this.setSeconds));
    this.date.nativeElement.innerHTML = this.textMinutes + ':' + this.textSeconds;
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
    
    //GUARDAR TEMPS TOTAL DEL BLOC
    this.tiempoBloque = String(this.totalMin) + ":" + String(this.totalSec);
    this.tareaBloque = this.inputElement.inputTask.nativeElement.value;

    //NETEJAR TEMPS TOTAL DEL BLOC I TEXT FORMULARI.
    this.totalMin, this.totalSec, this.auxTotalMin, this.auxTotalSec = 0;
    this.inputElement.inputTask.nativeElement.value = "";

    //GUARDAR DADES AL ARRAY (AFEGIR ID??? PER BORRAR REGISTRES...? O FER-HO PER TRIATGE OBTENIT EL VALUE)
    let elem = { tiempoBloque: this.tiempoBloque, tareaBloque: this.tareaBloque };
    this.estadisticasArray.push(elem);
    this.localStorageEstadisticas(this.estadisticasArray);


    this.focusTime(this.settingsArray[0], 0);
    this.pauseCountDown(this.contador);
    this.buttonPause.nativeElement.disabled = true;
    this.buttonNext.nativeElement.disabled = true;
    this.buttonStop.nativeElement.disabled = true;
    this.inputElement.inputTask.nativeElement.disabled = false;
    this.saveElement.saveTask.nativeElement.disabled = false;
    this.firstStart = false;

    // //GUARDAR TEMPS TOTAL DEL BLOC
    // this.tiempoBloque = String(this.totalMin) + ":" + String(this.totalSec);
    // this.tareaBloque = this.inputElement.inputTask.nativeElement.value;

    // //NETEJAR TEMPS TOTAL DEL BLOC I TEXT FORMULARI.
    // this.totalMin, this.totalSec, this.auxTotalMin, this.auxTotalSec = 0;
    // this.inputElement.inputTask.nativeElement.value = "";

    // //GUARDAR DADES AL ARRAY (AFEGIR ID??? PER BORRAR REGISTRES...? O FER-HO PER TRIATGE OBTENIT EL VALUE)
    // let elem = { tiempoBloque: this.tiempoBloque, tareaBloque: this.tareaBloque };
    // this.estadisticasArray.push(elem);
    // this.localStorageEstadisticas(this.estadisticasArray);

    //PLAYSOUND
    this.playSound();
  }

  //METODO GUARDAR DATOS EN LOCAL STORAGE
  localStorageEstadisticas(array: any) {
    localStorage.setItem("localEstadisticas", JSON.stringify(array));
  }

  getEstadisticas() {
    var storedList = localStorage.getItem("localEstadisticas");
    if (storedList == null) {
      let storedList = [];
    } else {
      this.estadisticasArray = JSON.parse(storedList);
    }
    return this.estadisticasArray;
  }

  getSettings() {
    var storedList = localStorage.getItem("localSettings");
    if (storedList == null) {
      let storedList = [];
    } else {
      this.settingsArray = JSON.parse(storedList);
    }
    return this.settingsArray;
  }
}
