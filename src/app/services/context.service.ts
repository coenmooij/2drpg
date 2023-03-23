import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class ContextService {
  private context?: CanvasRenderingContext2D;

  public loadContext(context: CanvasRenderingContext2D): void {
    this.context = context;
  }

  public getContext(): CanvasRenderingContext2D {
    if (!this.context) {
      throw new Error('Context accessed before loaded');
    }
    return this.context;
  }
}
