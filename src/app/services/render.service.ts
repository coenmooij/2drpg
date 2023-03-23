import { Injectable } from '@angular/core';
import { Asset } from '../collections';
import { GameMode } from '../enums';
import { Game } from '../models';
import { Settings } from '../settings';
import { ContextService } from './context.service';
import { ImageService } from './image.service';
import { MapRenderService } from './map.render.service';

@Injectable({providedIn: 'root'})
export class RenderService {

  constructor(
    private contextService: ContextService,
    private mapRenderService: MapRenderService,
    private imageService: ImageService,
    private game: Game
  ) {
    this.imageService.loadImages();
  }

  public render(frame: number): void {
    this.clearCanvas();
    switch (this.game.getMode()) {
      case GameMode.Level:
        this.renderGame(frame);
        break;
      case GameMode.Start:
        this.renderTitleScreen(frame);
        break;
    }
  }

  private renderTitleScreen(frame: number): void {
    const context = this.contextService.getContext();
    const image = this.imageService.getImage(Asset.ScreenStart);

    // Background
    context.drawImage(image, 0, 0);

    // Textbox
    context.globalAlpha = .4;
    context.fillStyle = 'white';
    context.fillRect(44, 74, 166, 32);
    context.globalAlpha = 1;

    // Text
    context.textAlign = 'center';
    context.font = '8px "Press Start 2P"';
    context.fillStyle = 'navy';
    if (frame > Settings.FPS / 4) {
      context.fillText('PRESS \'A\'', 128, 88);
    }
    context.fillText('to start the game...', 128, 100);
  }

  private renderGame(frame: number): void {
    this.mapRenderService.render(frame);
  }

  private clearCanvas(): void {
    this.contextService.getContext().clearRect(0, 0, Settings.MapWidth, Settings.MapHeight);
  }
}
