import { Injectable } from '@angular/core';
import { Direction, GameMode } from '../enums';
import { LevelService } from '../services';
import { Game } from './game';
import { Player } from './player';

@Injectable({providedIn: 'root'})
export class Controller {

  private arrowsPressed: Direction[] = [];
  private isShiftPressed: boolean = false;
  private isControlPressed: boolean = false;

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
    if (!this.player.isMoving && this.arrowsPressed.length > 0) {
      const currentDirection: Direction = this.arrowsPressed[0];
      this.player.move(currentDirection);
      if (this.levelService.canMoveTo(this.player.chunkLocation, this.player.tileLocation, currentDirection)) {
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
        return this.startDirection(Direction.Left);
      case 'ArrowUp':
        return this.startDirection(Direction.Up);
      case 'ArrowDown':
        return this.startDirection(Direction.Down);
      case 'ArrowRight':
        return this.startDirection(Direction.Right);
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

  private startDirection(direction: Direction): void {
    if (this.arrowsPressed.includes(direction)) {
      return;
    }
    this.arrowsPressed.push(direction);
  }

  private stopDirection(direction: Direction): void {
    const index = this.arrowsPressed.indexOf(direction);
    if (index < 0) {
      return;
    }
    this.arrowsPressed.splice(index, 1);
  }
}
