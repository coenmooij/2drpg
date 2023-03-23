import { Asset } from './asset.enum';
import { ImageService } from './image.service';
import { Settings } from './settings';

export class Renderer {
  private canvas!: HTMLCanvasElement;
  private context!: CanvasRenderingContext2D;
  private imageService!: ImageService;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.context = <CanvasRenderingContext2D>canvas.getContext('2d');
    this.imageService = new ImageService();
    this.imageService.loadImages();
  }

  public render(frame: number): void {
    this.clearCanvas();
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

  private drawPlayer(frame: number): void {
    const image = this.imageService.getImage(Asset.SpritePlayerDown);

    const numberOfEqualFrames = Settings.FPS / Settings.SpriteFPS;
    const currentPlayerFrame = Math.floor((frame - 1) / numberOfEqualFrames);

    const middleTileX = (Settings.MapWidth / 2) - (Settings.TileSize / 2);
    const middleTileY = (Settings.MapHeight / 2) - (Settings.TileSize / 2);

    this.context.drawImage(
      image,
      currentPlayerFrame * Settings.TileSize,
      0, Settings.TileSize,
      Settings.TileSize,
      middleTileX,
      middleTileY,
      Settings.TileSize,
      Settings.TileSize
    );
  }
}
