import { Injectable } from '@angular/core';
import { Asset } from '../collections';

@Injectable({providedIn: 'root'})
export class ImageService {

  public images: { [key: string]: HTMLImageElement } = {};

  public loadImages(): void {
    Object.values(Asset).forEach((asset: Asset) => {
      this.images[asset] = new Image();
      this.images[asset].src = `assets/${asset}.png`;
    });
  }

  public getImage(asset: Asset): HTMLImageElement {
    return this.images[asset];
  }
}
