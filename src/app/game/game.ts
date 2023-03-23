import { Injectable } from '@angular/core';
import { GameMode } from './game-mode';

@Injectable({providedIn: 'root'})
export class Game {

  private mode: GameMode = GameMode.Start;

  public getMode(): GameMode {
    return this.mode;
  }

  handleKey(key: string) {
    // TODO : Configure and make configurable these keys like 'a'
    if(this.mode === GameMode.Start && key.toLowerCase() === 'a') {
      this.mode = GameMode.Level;
    }
  }
}
