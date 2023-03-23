import { Injectable } from '@angular/core';
import { Asset } from '../collections';
import { Direction } from '../enums';
import { Character } from '../models';
import { Settings } from '../settings';
import { ContextService } from './context.service';
import { ImageService } from './image.service';

@Injectable({providedIn: 'root'})
export class CharacterRenderService {

  constructor(private contextService: ContextService, private imageService: ImageService) {
  }

  public render(character: Character, frame: number) {
    const direction = character.getDirection();

    // TODO : Make this more easier with combined sprite sheets per character (4x4)
    // TODO : Make based on the character, not always the player
    let asset = Asset.SpritePlayerDown;
    switch (direction) {
      case Direction.Up:
        asset = Asset.SpritePlayerUp;
        break;
      case Direction.Left:
        asset = Asset.SpritePlayerLeft;
        break;
      case Direction.Right:
        asset = Asset.SpritePlayerRight;
        break;
    }
    const image = this.imageService.getImage(asset);

    const numberOfEqualFrames = Settings.FPS / Settings.SpriteFPS;
    const currentPlayerFrame = character.isMoving() ? Math.floor((frame - 1) / numberOfEqualFrames) : 0;

    const middleTileX = (Settings.MapWidth / 2) - (Settings.TileSize / 2);
    const middleTileY = (Settings.MapHeight / 2) - (Settings.TileSize / 2);

    this.contextService.getContext().drawImage(
      image,
      currentPlayerFrame * Settings.SpriteWidth,
      0,
      Settings.SpriteWidth,
      Settings.SpriteHeight,
      middleTileX,
      middleTileY - (Settings.SpriteHeight - Settings.TileSize),
      Settings.SpriteWidth,
      Settings.SpriteHeight
    );
  }
}
