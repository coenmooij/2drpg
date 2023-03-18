import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Configuration } from '../configuration';
import { Renderer } from '../render/renderer';

@Component({
  selector: 'app-canvas',
  templateUrl: 'canvas.component.html'
})
export class CanvasComponent implements AfterViewInit {
  @ViewChild('canvas') public canvasReference!: ElementRef<HTMLCanvasElement>;

  private renderer!: Renderer;
  private currentFrame: number = 0; // 0 initial, when running between 1 - FPS

  public ngAfterViewInit(): void {
    this.renderer = new Renderer(this.canvasReference.nativeElement);

    this.requestAnimationFrame();
  }

  private requestAnimationFrame(): void {
    requestAnimationFrame((timestamp: DOMHighResTimeStamp) => this.animate(timestamp));
  }

  private animate(timestamp: DOMHighResTimeStamp): void {
    const milliseconds: number = timestamp % 1000;
    const millisecondsPerFrame: number = 1000 / Configuration.FPS;
    const currentFrame = Math.floor(milliseconds / millisecondsPerFrame) + 1;

    if (this.currentFrame !== currentFrame) {
      this.renderer.renderFrame(currentFrame);
      this.currentFrame = currentFrame;
    }

    this.requestAnimationFrame();
  }
}
