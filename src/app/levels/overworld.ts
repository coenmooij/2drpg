import { Asset } from '../collections';
import { LevelInterface } from '../interfaces';
import { Chunk } from '../models';

export const Overworld: LevelInterface = {
  chunks: [
    [new Chunk([[]], Asset.TileGrass), new Chunk([[]], Asset.TileSand)],
    [new Chunk([[]], Asset.TileSand), new Chunk([[]], Asset.TileGrass)],
  ],
  // defaultChunk: new Chunk([[]], Asset.TileWater),
};
