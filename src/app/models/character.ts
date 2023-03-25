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
  private nextMove?: Direction;
  private movementPPF: number = Settings.WalkingPPF;
  private nextMovementPPF?: number;

  public getDirection(): Direction {
    return this.direction;
  }

  public handleFrame(directionPressed?: Direction): void {
    // Start moving if we're not moving
    if (!this.isMoving && !!directionPressed) {
      this.startMoving(directionPressed);
    }

    // Animation frames
    if (this.isMoving) {
      this.subAnimationFrame++;

      if (this.subAnimationFrame === 4) {
        this.animationFrame++;
        this.subAnimationFrame = 0;
        if (this.animationFrame === 4) { // TODO : Take into account other frames per sprite ratios
          this.animationFrame = 0;
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


  private startMoving(direction: Direction): void {
    this.direction = direction;
    this.isMoving = true;
    this.movingOffset = Settings.TileSize;

    // TODO : Check collission
    // TODO : Move chunks
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
