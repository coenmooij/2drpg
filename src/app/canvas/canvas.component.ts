import { AfterViewInit, Component, ElementRef, HostListener, Inject, ViewChild } from '@angular/core';
import { Game } from '../models';
import { ContextService, RenderService } from '../services';
import { Settings } from '../settings';

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

  @HostListener('document:keydown', ['$event'])
  public documentKeypress(event: KeyboardEvent): void {
    this.handleInput(event.key);
  }

  @ViewChild('canvas') public canvasReference!: ElementRef<HTMLCanvasElement>;

  public hasSideBorders = false;

  private currentFrame: number = 0; // 0 initial, when running between 1 - FPS

  constructor(@Inject('Window')
              private window: Window,
              private renderService: RenderService,
              private contextService: ContextService,
              private game: Game) {
  }

  public ngAfterViewInit(): void {
    setTimeout(() => this.onResize());

    this.contextService.loadContext(<CanvasRenderingContext2D>this.canvasReference.nativeElement.getContext('2d'));

    this.requestAnimationFrame();
  }

  private handleInput(key: string): void {
    this.game.handleKey(key);
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
      this.renderService.render(currentFrame);
      this.currentFrame = currentFrame;
    }

    this.requestAnimationFrame();
  }
}
