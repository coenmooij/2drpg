import { Injectable } from '@angular/core';
import { Direction, GameMode } from '../enums';
import { Player } from './player';

@Injectable({providedIn: 'root'})
export class Game {

  private mode: GameMode = GameMode.Start;

  constructor(private player: Player) {}


  public getMode(): GameMode {
    return this.mode;
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
    console.log('Key pressed: ', key); // TODO : Remove at some point
    switch (key) {
      case 'a':
      case 'ArrowLeft':
        this.player.startMoving(Direction.Left);
        break;
      case 'w':
      case 'ArrowUp':
        this.player.startMoving(Direction.Up);
        break;
      case 's':
      case 'ArrowDown':
        this.player.startMoving(Direction.Down);
        break;
      case 'd':
      case 'ArrowRight':
        this.player.startMoving(Direction.Right);
        break;
    }
  }
}
