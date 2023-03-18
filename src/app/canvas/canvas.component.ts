import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

const FPS = 24;

@Component({
  selector: 'app-canvas',
  templateUrl: 'canvas.component.html'
})
export class CanvasComponent implements AfterViewInit {
  @ViewChild('canvas') public canvasElementRef!: ElementRef<HTMLCanvasElement>;

  private canvas!: HTMLCanvasElement;
  private context!: CanvasRenderingContext2D;
  private currentFrame: number = 0;

  public ngAfterViewInit(): void {
    this.canvas = this.canvasElementRef.nativeElement;
    this.context = <CanvasRenderingContext2D>this.canvas.getContext('2d');

    this.requestAnimationFrame();
  }

  private requestAnimationFrame(): void {
    requestAnimationFrame((timestamp: DOMHighResTimeStamp) => this.animate(timestamp));
  }

  private animate(timestamp: DOMHighResTimeStamp): void {
    const numberOfMilliseconds = Math.floor(timestamp) % 1000;
    const numberOfMillisecondsPerFrame = 1000 / FPS;
    const currentFrame = Math.floor(numberOfMilliseconds / numberOfMillisecondsPerFrame) + 1;

    if (this.currentFrame === currentFrame) {
      return this.requestAnimationFrame();
    }
    this.currentFrame = currentFrame;

    this.paint();

    this.requestAnimationFrame();
  }

  // TODO : Move to class / service
  private paint(): void {

    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    const image = new Image();
    image.src = 'assets/sprites/player_down_4.png';
    const playerFPS = 4;
    const numberOfEqualFrames = FPS / playerFPS;
    const currentPlayerFrame = Math.floor((this.currentFrame -1) / numberOfEqualFrames);

    this.context.drawImage(image, currentPlayerFrame * 32, 0, 32, 32, 0, 0, 32, 32);
  }
}
