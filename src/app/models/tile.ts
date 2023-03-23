import { Asset } from '../collections';

export class Tile {

  constructor(private asset: Asset) {
  }

  public getAsset(): Asset {
    return this.asset;
  }

  // TODO : Animate the tiles, so keep like a frame reference or something
}
