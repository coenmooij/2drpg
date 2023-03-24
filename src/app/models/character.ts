import { Direction } from '../enums';
import { LocationInterface } from '../interfaces';
import { Settings } from '../settings';

export class Character {
  private direction: Direction = Direction.Down;
  private chunkLocation: LocationInterface = {x: 0, y: 0};
  private tileLocation: LocationInterface = {x: 0, y: 0};
  private _isMoving: boolean = false;
  private currentFrame: number = 0;
  private movingFrames: number = 0;

  public isMoving(): boolean {
    return this._isMoving;
  }

  public getDirection(): Direction {
    return this.direction;
  }

  public getChunkLocation(): LocationInterface {
    return this.chunkLocation;
  }

  public getTileLocation(): LocationInterface {
    return this.tileLocation;
  }

  public handleFrame(frame: number): void {
    if (frame === this.currentFrame) {
      return;
    }
    if (this.movingFrames > 0) {
      this.movingFrames -= 2;
      if (this.movingFrames <= 0) {
        this._isMoving = false;
      }
    }
    this.currentFrame = frame;
  }

  public move(direction: Direction): void {
    if (this._isMoving) {
      return;
    }
    this.direction = direction;
    this._isMoving = true;
    this.movingFrames = Settings.PlayerFPS;

    switch (direction) {
      case Direction.Left:
        this.tileLocation.x--;
        break;
      case Direction.Right:
        this.tileLocation.x++;
        break;
      case Direction.Up:
        this.tileLocation.y--;
        break;
      case Direction.Down:
        this.tileLocation.y++;
        break;
    }
  }

  public getMovingOffset(): number {
    return this.movingFrames;
  }
}
