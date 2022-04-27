import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  @ViewChild('range1') range1: ElementRef;
  @ViewChild('range2') range2: ElementRef;
  @ViewChild('range3') range3: ElementRef;

  range1Value: number = 25;
  range2Value: number = 5;
  range3Value: number = 15;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
  }

  getValueFromRange1(){
    this.range1Value = this.range1.nativeElement.value;
  }

  getValueFromRange2(){
    this.range2Value = this.range2.nativeElement.value;
  }

  getValueFromRange3(){
    this.range3Value = this.range3.nativeElement.value;
  }

}
