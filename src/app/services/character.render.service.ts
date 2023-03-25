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

  public render(character: Character, frame: number, isPlayer: boolean = false) {
    const direction = character.getDirection();

    // TODO : Make this more easier with combined sprite sheets per character (4x4)
    // TODO : Make based on the character, not always the player
    let asset = Asset.SpritePlayerDown;
    let xOffset = 0;
    let yOffset = 0;
    switch (direction) {
      case Direction.Up:
        asset = Asset.SpritePlayerUp;
        yOffset = -character.movingOffset;
        break;
      case Direction.Left:
        asset = Asset.SpritePlayerLeft;
        xOffset = -character.movingOffset;
        break;
      case Direction.Right:
        asset = Asset.SpritePlayerRight;
        xOffset = character.movingOffset;
        break;
      case Direction.Down:
        yOffset = character.movingOffset;
        break;
    }
    if(isPlayer) {
      xOffset = 0;
      yOffset = 0;
    }
    const image = this.imageService.getImage(asset);

    const numberOfEqualFrames = Settings.FPS / Settings.FramesPerSprite;
    const currentPlayerFrame = character.animationFrame;

    const middleTileX = (Settings.MapWidth / 2) - (Settings.TileSize / 2);
    const middleTileY = (Settings.MapHeight / 2) - (Settings.TileSize / 2);

    this.contextService.getContext().drawImage(
      image,
      currentPlayerFrame * Settings.SpriteWidth,
      0,
      Settings.SpriteWidth,
      Settings.SpriteHeight,
      middleTileX - xOffset,
      middleTileY - (Settings.SpriteHeight - Settings.TileSize) - yOffset,
      Settings.SpriteWidth,
      Settings.SpriteHeight
    );
  }
}
