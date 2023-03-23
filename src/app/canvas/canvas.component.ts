import { AfterViewInit, Component, ElementRef, HostListener, Inject, ViewChild } from '@angular/core';
import { Renderer, Settings } from '../game';
import { Game } from '../game';

const GAME_RATIO = .5625; // 9 / 16 for 16:9 ratio

@Component({
  selector: 'app-canvas',
  templateUrl: 'canvas.component.html',
  styleUrls: ['canvas.component.scss']
})
export class CanvasComponent implements AfterViewInit {
  @HostListener('window:resize')
  public windowResize(): void {
    this.onResize();
  }

  @ViewChild('canvas') public canvasReference!: ElementRef<HTMLCanvasElement>;

  public hasSideBorders = false;

  private renderer!: Renderer;
  private currentFrame: number = 0; // 0 initial, when running between 1 - FPS

  constructor(@Inject('Window') private window: Window, private game: Game) {
  }

  public ngAfterViewInit(): void {
    setTimeout(() => this.onResize());
    this.renderer = new Renderer(this.canvasReference.nativeElement, this.game);

    this.requestAnimationFrame();
  }

  private onResize(): void {
    const ratio = this.window.innerHeight / this.window.innerWidth;
    this.hasSideBorders = ratio < GAME_RATIO;
  }

  private requestAnimationFrame(): void {
    requestAnimationFrame((timestamp: DOMHighResTimeStamp) => this.animate(timestamp));
  }

  private animate(timestamp: DOMHighResTimeStamp): void {
    const milliseconds: number = timestamp % 1000;
    const millisecondsPerFrame: number = 1000 / Settings.FPS;
    const currentFrame = Math.floor(milliseconds / millisecondsPerFrame) + 1;

    if (this.currentFrame !== currentFrame) {
      this.renderer.render(currentFrame);
      this.currentFrame = currentFrame;
    }

    this.requestAnimationFrame();
  }
}
