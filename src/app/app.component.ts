import { Component } from '@angular/core';
import { CountDownComponent } from './count-down/count-down.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Pomodoro-Web-App';

  //PRUEBA IMPORTAR VARIABLE PARA SABER ESTADO DE BOTON START I DESHABILITAR O HABILITAR MENU.
  constructor() { 
    console.log(CountDownComponent.startStatus);
  }
}
