import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule  } from '@angular/common/http';
import { AppComponent } from './app.component';

import { ChartsModule } from 'ng2-charts';
import { CityService } from './city.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ChartsModule
  ],
  providers: [CityService],
  bootstrap: [AppComponent]
})
export class AppModule { }
