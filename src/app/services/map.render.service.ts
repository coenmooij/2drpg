import { Injectable } from '@angular/core';
import { Asset } from '../collections';
import { Direction } from '../enums';
import { LocationInterface } from '../interfaces';
import { Chunk, Player, Tile } from '../models';
import { Settings } from '../settings';
import { CharacterRenderService } from './character.render.service';
import { ContextService } from './context.service';
import { ImageService } from './image.service';
import { LevelService } from './level.service';

@Injectable({providedIn: 'root'})
export class MapRenderService {

  constructor(
    private characterRenderService: CharacterRenderService,
    private contextService: ContextService,
    private imageService: ImageService,
    private levelService: LevelService,
    private player: Player
  ) {
  }

  public render(frame: number): void {
    this.drawMap(frame);
    this.characterRenderService.render(this.player, frame, true);
  }

  private drawMap(frame: number): void {
    // Base offset (player stands in the middle, so we move all blocks one half left and one half up)
    let xOffset = -(Settings.TileSize / 2);
    let yOffset = -(Settings.TileSize / 2);

    switch (this.player.getDirection()) {
      case Direction.Up:
        yOffset -= this.player.getMovingOffset();
        break;
      case Direction.Left:
        xOffset -= this.player.getMovingOffset();
        break;
      case Direction.Right:
        xOffset += this.player.getMovingOffset();
        break;
      case Direction.Down:
        yOffset += this.player.getMovingOffset();
        break;
    }

    // TODO : Player Movement offset

    // Take into account player always stands in the middle chunk
    xOffset -= Settings.ChunkWidth * Settings.TileSize;
    yOffset -= Settings.ChunkHeight * Settings.TileSize;

    // Calculate player tile offset
    const tileLocation: LocationInterface = this.player.getTileLocation();
    xOffset += ((Settings.TileSize / 2) - tileLocation.x) * Settings.TileSize;
    yOffset += ((Settings.TileSize / 2) - tileLocation.y) * Settings.TileSize;


    const chunks = this.levelService.getChunks();
    for (let x = 0; x < chunks.length; x++) {
      for (let y = 0; y < chunks[x].length; y++) {
        this.drawChunk(chunks[x][y], x, y, xOffset, yOffset);

      }
    }
    // TODO : Paint roof tiles after player
  }

  private drawChunk(chunk: Chunk, chunkX: number, chunkY: number, xOffset: number, yOffset: number): void {
    xOffset += chunkX * Settings.ChunkWidth * Settings.TileSize;
    yOffset += chunkY * Settings.ChunkHeight * Settings.TileSize;


    const tiles: Tile[][] = chunk.getTiles();
    // Draw floor tiles
    for (let x = 0; x < Settings.ChunkWidth; x++) {
      for (let y = 0; y < Settings.ChunkHeight; y++) {
        this.drawTile(tiles[x][y], x, y, xOffset, yOffset);
      }
    }
  }

  private drawTile(tile: Tile, tileX: number, tileY: number, xOffset: number, yOffset: number): void {
    xOffset += tileX * Settings.TileSize;
    yOffset += tileY * Settings.TileSize;


    if (xOffset < -Settings.TileSize || yOffset < -Settings.TileSize || xOffset > Settings.MapWidth || yOffset > Settings.MapHeight) {
      return;
    }
    const asset = tile.getAsset();
    const image = this.imageService.getImage(asset);
    const context = this.contextService.getContext();
    context.drawImage(image, xOffset, yOffset, Settings.TileSize, Settings.TileSize);
  }
}
