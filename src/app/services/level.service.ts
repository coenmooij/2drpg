import { Injectable } from '@angular/core';
import { Level } from '../collections';

@Injectable({providedIn: 'root'})
export class LevelService {
  private level: Level = Level.Overworld;

  getCurrentLevel(): Level {
    return this.level;
  }
}
