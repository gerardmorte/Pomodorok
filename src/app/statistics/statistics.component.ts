import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
// import { CountDownComponent } from '../count-down/count-down.component';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  @ViewChild('container1') container1: ElementRef;

  auxArray: any = [];

  constructor() { }

  ngOnInit(): void {
    this.getEstadisticas();
    console.log(this.auxArray);
      
  }

  ngAfterViewInit() {
    if(this.container1.nativeElement.offsetHeight == 550)
    this.container1.nativeElement.style.overflowY = "scroll";
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


