import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { CanvasComponent } from './canvas';

@NgModule({
  declarations: [AppComponent, CanvasComponent],
  imports: [BrowserModule],
  bootstrap: [AppComponent],
  providers: [{provide: 'Window', useValue: window}]
})
export class AppModule {}
