import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatTableModule, MatPaginatorModule, MatCardModule, MatDialogModule} from '@angular/material'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { DungionCrawlerComponent } from './components/dungion-crawler/dungion-crawler.component';
import { AttackButtonsComponent } from './components/dungion-crawler/attack-buttons/attack-buttons.component';
import { EnemyUIComponent } from './components/dungion-crawler/enemy-ui/enemy-ui.component';
import { HttpClientModule } from '@angular/common/http';
import { ScoreBoardComponent } from './components/dungion-crawler/game-over/score-board/score-board.component';
import { FormsModule } from '@angular/forms';
import { EndingDialogComponent } from './components/dungion-crawler/game-over/ending-dialog/ending-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DungionCrawlerComponent,
    AttackButtonsComponent,
    EnemyUIComponent,
    ScoreBoardComponent,
    EndingDialogComponent
  ],
  entryComponents: [EndingDialogComponent],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    MatTableModule,
    MatCardModule,
    MatDialogModule,
    MatPaginatorModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
