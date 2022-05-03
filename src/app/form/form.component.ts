import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  @ViewChild('inputTask') inputTask: ElementRef;
  @ViewChild('saveTask') saveTask: ElementRef;
  @ViewChild('editTask') editTask: ElementRef;

  inputForm: string = ""
  static enabledBtnStart: string = "disabled"; 

  constructor() { }

  ngOnInit(): void { }

  ngAfterViewInit() {
    this.editTask.nativeElement.disabled = true;
  }

  save() {
    this.inputForm = this.inputTask.nativeElement.value;
    this.inputTask.nativeElement.disabled = true;
    this.saveTask.nativeElement.disabled = true;
    this.editTask.nativeElement.disabled = false;

    FormComponent.enabledBtnStart = "";

  }

  edit() { 
    this.inputTask.nativeElement.disabled = false;
    this.saveTask.nativeElement.disabled = false;
    this.editTask.nativeElement.disabled = true;
  }
}

//Observable para activar boton start cuando empieza Pomodoro.
export const observable2 = new Observable(Subscriber => {
  setInterval(function () {
    Subscriber.next(FormComponent.enabledBtnStart);
  }, 1000);
})
