import { Configuration } from '../configuration';

export class Renderer {
  private canvas!: HTMLCanvasElement;
  private context!: CanvasRenderingContext2D;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.context = <CanvasRenderingContext2D>canvas.getContext('2d');
  }

  public renderFrame(frame: number): void {
    this.clearCanvas();
    this.drawMap(frame);
    this.drawPlayer(frame);
  }

  private clearCanvas(): void {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  private drawMap(frame: number): void {
    const grassTile = new Image();
    grassTile.src = 'assets/tiles/grass.png';

      for(let x = 0; x < Configuration.MapWidth ;x += Configuration.TileSize) {
        for(let y = 0; y < Configuration.MapHeight; y += Configuration.TileSize) {
          this.context.drawImage(grassTile, x, y);
        }
      }
  }

  private drawPlayer(frame: number): void {
    // TODO : Don't create new images everytime, preload in html and create array of them in memory
    //  e.g. sprites['player']['up'] = 'player_up.png';
    const image = new Image();
    image.src = 'assets/sprites/player_down_4.png';

    const numberOfEqualFrames = Configuration.FPS / Configuration.SpriteFPS;
    const currentPlayerFrame = Math.floor((frame - 1) / numberOfEqualFrames);

    const middleTileX = (Configuration.MapWidth / 2) - (Configuration.TileSize / 2);
    const middleTileY = (Configuration.MapHeight / 2) - (Configuration.TileSize / 2);

    this.context.drawImage(image, currentPlayerFrame * 32, 0, 32, 32, middleTileX, middleTileY, 16, 16);
  }
}
