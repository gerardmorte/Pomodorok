import { Component, OnInit, ViewChild } from '@angular/core';
import { CountDownComponent } from '../count-down/count-down.component';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  //@ViewChild(CountDownComponent) array: { estadisticasArray: object};
  auxArray: any = [];

  constructor() { }

  ngOnInit(): void {
    this.getEstadisticas();
    console.log(this.auxArray);
  }

  //OBTENER DATOS LOCAL STORAGE
  getEstadisticas() {
    var storedList = localStorage.getItem("localEstadisticas");
    if (storedList == null) {
      let storedList = [];
    } else {
      this.auxArray = JSON.parse(storedList);
    }
    return this.auxArray;
  }

}


