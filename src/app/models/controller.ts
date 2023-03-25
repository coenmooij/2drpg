import { Injectable } from '@angular/core';
import { Direction, GameMode } from '../enums';
import { LevelService } from '../services';
import { Game } from './game';
import { Player } from './player';

@Injectable({providedIn: 'root'})
export class Controller {

  private arrowPressed?: Direction;
  private isShiftPressed: boolean = false;

  constructor(private levelService: LevelService, private game: Game, private player: Player) {
  }

  public handleKeyPress(key: string) {
    // TODO : First check key, then switch to mode
    switch (this.game.mode) {
      case GameMode.Start:
        this.handleTitleScreen(key);
        break;
      case GameMode.Level:
        this.handleLevelKeyPress(key);
        break;
    }
  }

  public handleKeyDown(key: string): void {
    switch (this.game.mode) {
      case GameMode.Level:
        this.handleLevelKeyDown(key);
        break;
    }
  }

  public handleKeyUp(key: string): void {
    switch (this.game.mode) {
      case GameMode.Level:
        this.handleLevelKeyUp(key);
        break;
    }
  }

  public move(): void {
    // Start moving if we're not moving
    if (!this.player.isMoving && !!this.arrowPressed) {
      this.player.move(this.arrowPressed);
      if (this.levelService.canMoveTo(this.player.chunkLocation, this.player.tileLocation, this.arrowPressed)) {
        this.player.onLocationUpdated();
      }
    } else {
      this.player.keepMoving();
    }
  }

  private handleTitleScreen(key: string): void {
    if (key.toLowerCase() === 'a') {
      this.game.mode = GameMode.Level;
    }
  }

  private handleLevelKeyPress(key: string): void {
    switch (key) {
      case 'a':
        this.player.interact();
        break;
    }
  }

  private handleLevelKeyDown(key: string): void {
    switch (key) {
      case 'Shift':
        if (!this.isShiftPressed) {
          this.isShiftPressed = true;
          this.player.startRunning();
        }
        break;
      case 'ArrowLeft':
        this.arrowPressed = Direction.Left;
        break;
      case 'ArrowUp':
        this.arrowPressed = Direction.Up;
        break;
      case 'ArrowDown':
        this.arrowPressed = Direction.Down;
        break;
      case 'ArrowRight':
        this.arrowPressed = Direction.Right;
        break;
    }
  }

  private handleLevelKeyUp(key: string): void {
    switch (key) {
      case 'Shift':
        this.isShiftPressed = false;
        this.player.stopRunning();
        break;
      case 'ArrowLeft':
        return this.stopDirection(Direction.Left);
      case 'ArrowUp':
        return this.stopDirection(Direction.Up);
      case 'ArrowDown':
        return this.stopDirection(Direction.Down);
      case 'ArrowRight':
        return this.stopDirection(Direction.Right);
    }
  }

  private stopDirection(direction: Direction): void {
    if (this.arrowPressed === direction) {
      this.arrowPressed = undefined;
    }
  }
}