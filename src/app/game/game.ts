import { Injectable } from '@angular/core';
import { Character } from './character';
import { Direction } from './direction.enum';
import { GameMode } from './game-mode';

@Injectable({providedIn: 'root'})
export class Game {

  private mode: GameMode = GameMode.Start;
  private player = new Character();

  public getMode(): GameMode {
    return this.mode;
  }

  public getPlayer(): Character {
    return this.player;
  }

  public handleKey(key: string): void {
    switch (this.mode) {
      case GameMode.Start:
        this.handleTitleScreen(key);
        break;
      case GameMode.Level:
        this.handleLevel(key);
        break;
    }
  }

  private handleTitleScreen(key: string): void {
    if (key.toLowerCase() === 'a') {
      this.mode = GameMode.Level;
    }
  }

  private handleLevel(key: string): void {
    console.log('Key pressed: ', key);
    switch (key) {
      case 'a':
        this.player.startMoving(Direction.Left);
        break;
      case 'w':
        this.player.startMoving(Direction.Up);
        break;
      case 's':
        this.player.startMoving(Direction.Down);
        break;
      case 'd':
        this.player.startMoving(Direction.Right);
        break;
    }
  }
}
