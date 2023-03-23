import { Asset } from '../collections';
import { Settings } from '../settings';
import { Tile } from './tile';

export class Chunk {
  tiles: Tile[][] = [];

  // TODO : Change default asset to water
  constructor(tiles: Tile[][], defaultAsset: Asset = Asset.TileGrass) {
    this.tiles = tiles;
    for (let y = 0; y < Settings.ChunkHeight; y++) {
      for (let x = 0; x < Settings.ChunkWidth; x++) {
        if (!this.tiles[y][x]) {
          this.tiles[y][x] = new Tile(defaultAsset);
        }
      }
    }
  }

  public getTiles(): Tile[][] {
    return this.tiles;
  }
}
