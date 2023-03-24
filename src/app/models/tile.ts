import { Asset } from '../collections';

export class Tile {
  // private floorAsset: Asset;
  private roofAsset?: Asset;


  constructor(private asset: Asset) {
  }

  public getAsset(): Asset {
    return this.asset;
  }

  // TODO : Animate the tiles, so keep like a frame reference or something
}
