import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DungionCrawlerComponent } from './dungion-crawler.component';
import { Component, Output, Input, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDialogModule } from '@angular/material';

@Component({
  selector: 'app-enemy-ui',
  template: ''
})
class EnemyUIComponent{
  @Output() enemyDiceRolls = new EventEmitter<string[]>();
  @Output() attackType = new EventEmitter<string>();
  @Input() enemyDiceRollEvent: Observable<void>;
  @Input() enemyAttackTypeEvent: Observable<void>;
  @Input() nextMob: Observable<void>;
}

@Component({
  selector: 'app-attack-buttons',
  template: ''
})
class AttackButtonsComponent{
}

describe('DungionCrawlerComponent shallow', () => {
  let component: DungionCrawlerComponent;
  let fixture: ComponentFixture<DungionCrawlerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DungionCrawlerComponent, EnemyUIComponent, AttackButtonsComponent ],
      imports: [RouterTestingModule, MatDialogModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DungionCrawlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
