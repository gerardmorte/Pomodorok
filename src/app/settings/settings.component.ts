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

  settings: any = [];

  range1Value: number = this.settings[0];
  range2Value: number = this.settings[1];
  range3Value: number = this.settings[2];

  constructor() { }

  ngOnInit(): void {
    this.getSettings();
    if (this.settings.length == 0 ) {
      this.range1Value = 25;
      this.range2Value = 5;
      this.range3Value = 15;
    } else {
      this.range1Value = this.settings[0];
      this.range2Value = this.settings[1];
      this.range3Value = this.settings[2];
    }
  }

  getValueFromRange1() {
    this.range1Value = this.range1.nativeElement.value;
  }

  getValueFromRange2() {
    this.range2Value = this.range2.nativeElement.value;
  }

  getValueFromRange3() {
    this.range3Value = this.range3.nativeElement.value;
  }

  localStorageSettings(array: any) {
    localStorage.setItem("localSettings", JSON.stringify(array));
  }

  getSettings() {
    var storedList = localStorage.getItem("localSettings");
    if (storedList == null) {
      let storedList = [];
    } else {
      this.settings = JSON.parse(storedList);
    }
    return this.settings;
  }

  saveSettings() {
    this.settings = [this.range1Value, this.range2Value, this.range3Value]
    this.localStorageSettings(this.settings);
  }

  deleteStatistics() {
    this.localStorageEstadisticas([]);
  }

  localStorageEstadisticas(array: any) {
    localStorage.setItem("localEstadisticas", JSON.stringify(array));
  }

}
