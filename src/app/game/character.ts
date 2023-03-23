import { Direction } from './direction.enum';

export class Character {
  private direction: Direction = Direction.Down;
  private _isMoving: boolean = false;

  public isMoving(): boolean {
    return this._isMoving;
  }

  public getDirection(): Direction {
    return this.direction;
  }

  startMoving(direction: Direction): void {
    this.direction = direction;
    this._isMoving = true;
  }
}
