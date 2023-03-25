import { Injectable } from '@angular/core';
import { Level, LEVELS } from '../collections';
import { LevelInterface, LocationInterface } from '../interfaces';
import { Chunk, Player } from '../models';

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
}
