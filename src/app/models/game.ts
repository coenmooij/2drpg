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

  public handleFrame(frame: number): void {
    // TODO : Update all resources in the current game
    this.player.handleFrame(frame);
  }

  private handleTitleScreen(key: string): void {
    if (key.toLowerCase() === 'a') {
      this.mode = GameMode.Level;
    }
  }

  private handleLevel(key: string): void {
    switch (key) {
      case 'a':
        this.player.interact();
        break;
      case 'ArrowLeft':
        this.player.move(Direction.Left);
        break;
      case 'ArrowUp':
        this.player.move(Direction.Up);
        break;
      case 'ArrowDown':
        this.player.move(Direction.Down);
        break;
      case 'ArrowRight':
        this.player.move(Direction.Right);
        break;
    }
  }
}
