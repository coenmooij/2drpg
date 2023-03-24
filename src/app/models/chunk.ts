import { Asset } from '../collections';
import { Settings } from '../settings';
import { Tile } from './tile';

export class Chunk {
  private readonly tiles: Tile[][] = [];

  constructor(tiles: Tile[][], defaultAsset: Asset = Asset.TileWater) {
    this.tiles = tiles;
    for (let x = 0; x < Settings.ChunkHeight; x++) {
      for (let y = 0; y < Settings.ChunkWidth; y++) {
        if (!this.tiles[x]) {
          this.tiles[x] = [];
        }
        if (!this.tiles[x][y]) {
          this.tiles[x].push(new Tile(defaultAsset));
        }
      }
    }
  }

  public getTiles(): Tile[][] {
    return this.tiles;
  }
}
