import { Component } from '@angular/core';
import { observable } from './count-down/count-down.component';

// observable.subscribe((res) => {
//   let buttonStartStatus = res;
//   console.log(buttonStartStatus);  
// });

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Pomodoro-Web-App';  
  buttonMenuDisabled: any;

  ngAfterViewInit() {
    observable.subscribe((res) => {
      this.buttonMenuDisabled = res;
      console.log(this.buttonMenuDisabled);  
    });
  }

  
}
