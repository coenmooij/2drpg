import { Injectable } from '@angular/core';
import { Asset } from '../collections';
import { Player } from '../models';
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
    this.characterRenderService.render(this.player, frame);
  }

  private drawMap(frame: number): void {
    const level = this.levelService.getCurrentLevel();
    // get current player location
    // get all needed chunks
    const grassTile = this.imageService.getImage(Asset.TileGrass);

    for (let x = 0; x < Settings.MapWidth; x += Settings.TileSize) {
      for (let y = 0; y < Settings.MapHeight; y += Settings.TileSize) {
        this.contextService.getContext().drawImage(grassTile, x, y);
      }
    }
  }
}
