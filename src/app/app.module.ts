import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material';

//import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DiceGameComponent } from './components/dice-game/dice-game.component';

@NgModule({
  declarations: [
    AppComponent,
    DiceGameComponent
  ],
  imports: [
    BrowserModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
