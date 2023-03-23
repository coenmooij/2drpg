import { Injectable } from '@angular/core';
import { GameMode } from './game-mode';

@Injectable({providedIn: 'root'})
export class Game {

  private mode: GameMode = GameMode.Start;

  public getMode(): GameMode {
    return this.mode;
  }
}
