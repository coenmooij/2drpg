import { Injectable } from '@angular/core';
import { Level, LEVELS } from '../collections';
import { Direction } from '../enums';
import { LevelInterface, LocationInterface } from '../interfaces';
import { Chunk, Player } from '../models';
import { Settings } from '../settings';

@Injectable({providedIn: 'root'})
export class LevelService {
  private level: Level = Level.Overworld;

  constructor(private player: Player) {
  }

  /** @returns 3x3 chunks */
  public getChunks(): Chunk[][] {
    const playerChunk: LocationInterface = this.player.chunkLocation;

    const chunks: Chunk[][] = [];

    const level: LevelInterface = LEVELS[this.level];

    for (let x = playerChunk.x - 1; x <= playerChunk.x + 1; x++) {
      const row: Chunk[] = [];
      for (let y = playerChunk.y - 1; y <= playerChunk.y + 1; y++) {
        if (x < 0 || y < 0 || x >= level.chunks.length || y >= level.chunks[x].length) {
          row.push(level.defaultChunk ?? new Chunk([[]]));
        } else {
          row.push(level.chunks[x][y]);
        }
      }
      chunks.push(row);
    }

    return chunks;
  }

  public canMoveTo(chunkLocation: LocationInterface, tileLocation: LocationInterface, direction: Direction): boolean {
    switch (direction) {
      case Direction.Left:
        return this.canMoveLeft(chunkLocation, tileLocation);
      case Direction.Right:
        return this.canMoveRight(chunkLocation, tileLocation);
      case Direction.Up:
        return this.canMoveUp(chunkLocation, tileLocation);
      case Direction.Down:
        return this.canMoveDown(chunkLocation, tileLocation);
    }
  }

  private canMoveLeft(chunkLocation: LocationInterface, tileLocation: LocationInterface): boolean {
    const newChunkLocation = {...chunkLocation};
    const newTileLocation = {...tileLocation};
    if (tileLocation.x > 0) {
      newTileLocation.x = tileLocation.x - 1;
    } else if (chunkLocation.x > 0) {
      newChunkLocation.x = chunkLocation.x - 1;
      newTileLocation.x = Settings.TileSize - 1;
    } else {
      return false;
    }
    return this.checkAndUpdateLocation(chunkLocation, tileLocation, newChunkLocation, newTileLocation);
  }

  private canMoveRight(chunkLocation: LocationInterface, tileLocation: LocationInterface): boolean {
    const newChunkLocation = this.copyLocation(chunkLocation);
    const newTileLocation = this.copyLocation(tileLocation);
    if (tileLocation.x < Settings.TileSize - 1) {
      newTileLocation.x = tileLocation.x + 1;
    } else if (chunkLocation.x < LEVELS[this.level].chunks[chunkLocation.x].length - 1) {
      newChunkLocation.x = chunkLocation.x + 1;
      newTileLocation.x = 0;
    } else {
      return false;
    }
    return this.checkAndUpdateLocation(chunkLocation, tileLocation, newChunkLocation, newTileLocation);
  }

  private canMoveDown(chunkLocation: LocationInterface, tileLocation: LocationInterface): boolean {
    const newChunkLocation = this.copyLocation(chunkLocation);
    const newTileLocation = this.copyLocation(tileLocation);
    if (tileLocation.y < Settings.TileSize - 1) {
      newTileLocation.y = tileLocation.y + 1;
    } else if (chunkLocation.y < LEVELS[this.level].chunks.length - 1) {
      newChunkLocation.y = chunkLocation.y + 1;
      newTileLocation.y = 0;
    } else {
      return false;
    }
    return this.checkAndUpdateLocation(chunkLocation, tileLocation, newChunkLocation, newTileLocation);
  }

  private canMoveUp(chunkLocation: LocationInterface, tileLocation: LocationInterface): boolean {
    const newChunkLocation = {...chunkLocation};
    const newTileLocation = {...tileLocation};
    if (tileLocation.y > 0) {
      newTileLocation.y = tileLocation.y - 1;
    } else if (chunkLocation.y > 0) {
      newChunkLocation.y = chunkLocation.y - 1;
      newTileLocation.y = Settings.TileSize - 1;
    } else {
      return false;
    }
    return this.checkAndUpdateLocation(chunkLocation, tileLocation, newChunkLocation, newTileLocation);
  }


  private checkLocation(chunkLocation: LocationInterface, tileLocation: LocationInterface): boolean {
    // TODO : Collision detection
    return true;
  }

  private checkAndUpdateLocation(
    chunkLocation: LocationInterface,
    tileLocation: LocationInterface,
    newChunkLocation: LocationInterface,
    newTileLocation: LocationInterface
  ): boolean {
    const canMove: boolean = this.checkLocation(chunkLocation, newTileLocation);
    if (canMove) {
      tileLocation.x = newTileLocation.x;
      tileLocation.y = newTileLocation.y;
      chunkLocation.x = newChunkLocation.x;
      chunkLocation.y = newChunkLocation.y;
    }
    return canMove;
  }

  private copyLocation(location: LocationInterface): LocationInterface {
    return JSON.parse(JSON.stringify(location));
  }
}
