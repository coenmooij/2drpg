import { Asset } from './asset.enum';

export class ImageService {

  public images: { [key: string]: HTMLImageElement } = {};

  public loadImages(): void {
    Object.values(Asset).forEach((asset: string) => {
      this.images[asset] = new Image();
      this.images[asset].src = `assets/${asset}.png`;
    });
  }

  public getImage(asset: Asset): HTMLImageElement {
    return this.images[asset];
  }
}
