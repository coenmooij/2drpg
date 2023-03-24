import { Chunk } from '../models';

export interface LevelInterface {
  chunks: Chunk[][];
  defaultChunk?: Chunk;
}
