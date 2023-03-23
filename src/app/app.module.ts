import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CanvasComponent } from './canvas';
import { RoutingModule } from './routing';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    CanvasComponent
  ],
  imports: [
    BrowserModule,
    RoutingModule
  ],
  bootstrap: [AppComponent],
  providers: [{ provide: 'Window', useValue: window}]
})
export class AppModule {}
