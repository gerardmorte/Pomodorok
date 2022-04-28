import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {}

   ngAfterViewInit() {
    this.editTask.nativeElement.disabled = true;
   }

  save() {
    this.inputForm = this.inputTask.nativeElement.value;
    this.inputTask.nativeElement.disabled = true;
    this.saveTask.nativeElement.disabled = true;
    this.editTask.nativeElement.disabled = false;
  }

  edit(){ //Només es pot activar amb el comptador en PAUSA
    this.inputTask.nativeElement.disabled = false;
    this.saveTask.nativeElement.disabled = false;
    this.editTask.nativeElement.disabled = true;
  }
}
