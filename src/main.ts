import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';

const appConfig = {
  providers: []
};

bootstrapApplication(AppComponent, appConfig) 
  .catch(err => console.error(err));