import { Asset } from './asset.enum';
import { Direction } from './direction.enum';
import { Game } from './game';
import { GameMode } from './game-mode';
import { ImageService } from './image.service';
import { Settings } from './settings';

export class Renderer {
  private canvas!: HTMLCanvasElement;
  private context!: CanvasRenderingContext2D;
  private imageService!: ImageService;
  private game!: Game;

  constructor(canvas: HTMLCanvasElement, game: Game) {
    this.canvas = canvas;
    this.game = game;
    this.context = <CanvasRenderingContext2D>canvas.getContext('2d');
    this.imageService = new ImageService();
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
    const image = this.imageService.getImage(Asset.ScreenStart);

    // Background
    this.context.drawImage(image, 0, 0);

    // Textbox
    this.context.globalAlpha = .4;
    this.context.fillStyle = 'white';
    this.context.fillRect(44, 74, 166, 32);
    this.context.globalAlpha = 1;

    // Text
    this.context.textAlign = 'center';
    this.context.font = '8px "Press Start 2P"';
    this.context.fillStyle = 'navy';
    if (frame > Settings.FPS / 4) {
      this.context.fillText('PRESS \'A\'', 128, 88);
    }
    this.context.fillText('to start the game...', 128, 100);
  }

  private renderGame(frame: number): void {
    this.drawMap(frame);
    this.drawPlayer(frame);
  }

  private clearCanvas(): void {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  private drawMap(frame: number): void {
    const grassTile = this.imageService.getImage(Asset.TileGrass);

    for (let x = 0; x < Settings.MapWidth; x += Settings.TileSize) {
      for (let y = 0; y < Settings.MapHeight; y += Settings.TileSize) {
        this.context.drawImage(grassTile, x, y);
      }
    }
  }

  // TODO : Make code generic for all 'Characters'
  private drawPlayer(frame: number): void {
    const player = this.game.getPlayer();
    const direction = player.getDirection();

    // TODO : Make this more easier with combined sprite sheets per character (4x4)
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
    const currentPlayerFrame = player.isMoving() ? Math.floor((frame - 1) / numberOfEqualFrames) : 0;

    const middleTileX = (Settings.MapWidth / 2) - (Settings.TileSize / 2);
    const middleTileY = (Settings.MapHeight / 2) - (Settings.TileSize / 2);

    this.context.drawImage(
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
