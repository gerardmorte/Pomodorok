import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
 @ViewChild('newTask') newTask: ElementRef;

  inputForm: string;
  startPomodoro: Date;
  statisticsArray: any = [];

  constructor() { }

  ngOnInit(): void {
  }

  addTask() {
    this.inputForm = this.newTask.nativeElement.value;
    this.startPomodoro = new Date();
    let element = { inputForm: this.inputForm, startPomodoro: this.startPomodoro };
    this.statisticsArray.push(element);
    console.log(this.statisticsArray[0])
    console.log(this.statisticsArray[0].startPomodoro);
  }

}
