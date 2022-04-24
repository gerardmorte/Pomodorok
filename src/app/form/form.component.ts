import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  @ViewChild('inputTask') inputTask: ElementRef;
  @ViewChild('newTask') newTask: ElementRef;
  @ViewChild('editTask') editTask: ElementRef;

  inputForm: string = "22:00"
  startPomodoro: Date = new Date();
  statisticsArray: any = [{ inputForm: this.inputForm, startPomodor: this.startPomodoro }];

  constructor() { }

  ngOnInit(): void { }

  addTask() {
    this.inputForm = this.inputTask.nativeElement.value;
    this.startPomodoro = new Date();
    let element = { inputForm: this.inputForm, startPomodoro: this.startPomodoro };
    this.statisticsArray.push(element);
    console.log(this.statisticsArray);
    this.inputTask.nativeElement.disabled = true;
    this.newTask.nativeElement.disabled = true;
    this.editTask.nativeElement.disabled = true;
  }
}
