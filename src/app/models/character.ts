import { Direction } from '../enums';
import { LocationInterface } from '../interfaces';
import { Settings } from '../settings';

export class Character {
  public chunkLocation: LocationInterface = {x: 0, y: 0};
  public tileLocation: LocationInterface = {x: 0, y: 0};
  public animationFrame: number = 0;
  public isMoving: boolean = false;
  public movingOffset: number = 0;

  private subAnimationFrame: number = 0;
  private direction: Direction = Direction.Down;
  private movementPPF: number = Settings.WalkingPPF;
  private nextMovementPPF?: number;

  public getDirection(): Direction {
    return this.direction;
  }

  public keepMoving(): void {
    // Animation frames
    if (this.isMoving) {
      this.subAnimationFrame--;
      if (this.subAnimationFrame === 0) {
        this.subAnimationFrame = 4;
        this.animationFrame--;
        if (this.animationFrame === 0) { // TODO : Take into account other frames per sprite ratios
          this.animationFrame = 0;
          this.isMoving = false;
        }
      }
    }

    // Moving offset
    if (this.movingOffset === 0) {
      return;
    }
    this.movingOffset -= this.movementPPF;

    if (this.movingOffset > 0) {
      return;
    }
    this.isMoving = false;
    if (this.nextMovementPPF) {
      this.movementPPF = this.nextMovementPPF;
      this.nextMovementPPF = undefined;
    }
  }


  public move(direction: Direction): void {
    this.direction = direction;
    this.isMoving = true;
    this.animationFrame = 3;
    this.subAnimationFrame = 3; // TODO : depends speed?
  }

  public onLocationUpdated(): void {
    this.movingOffset = Settings.TileSize;
  }

  public startRunning(): void {
    if (this.isMoving) {
      this.nextMovementPPF = Settings.RunningPPF;
    } else {
      this.movementPPF = Settings.RunningPPF;
    }
  }

  public stopRunning(): void {
    if (!this.isMoving) {
      this.movementPPF = Settings.WalkingPPF;
    } else {
      this.nextMovementPPF = Settings.WalkingPPF;
    }
  }
}
