import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { interval } from 'rxjs';

@Component({
  selector: 'app-count-down',
  templateUrl: './count-down.component.html',
  styleUrls: ['./count-down.component.css'],
})
export class CountDownComponent implements OnInit {
  @ViewChild('reloj') date: ElementRef;

  minutes: number = 10;
  seconds: number = 3;
  fecha = new Date();

  constructor() {
    this.fecha.setMinutes(this.minutes);
  }

  ngOnInit(): void {}

  // Añadir el cero en números menores de 10
  actualizarHora(i: string) {
    if (Number(i) < 10) {
      i = "0" + i;
    }
    return i;
  }

  countDown() {
    const contador = interval(1000);

    contador.subscribe((n) => {

      this.seconds--;

      this.fecha.setSeconds(this.seconds);

      let minutos: string = String(this.fecha.getMinutes());

      let segundos: string = String(this.fecha.getSeconds());

      minutos = this.actualizarHora(minutos);
      segundos = this.actualizarHora(segundos);

      this.date.nativeElement.innerHTML = minutos + ':' + segundos;

    });

  }
}
