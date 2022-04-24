import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { CountDownComponent } from './count-down/count-down.component';
import { FormComponent } from './form/form.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { SettingsComponent } from './settings/settings.component';

const appRoutes: Routes = [
  { path: '', component: CountDownComponent },
  { path: 'statistics', component: SettingsComponent },
  { path: 'settings', component: StatisticsComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    CountDownComponent,
    FormComponent,
    StatisticsComponent,
    SettingsComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
