import { Injectable } from '@angular/core';
import { GameMode } from '../enums';

@Injectable({providedIn: 'root'})
export class Game {
  public mode: GameMode = GameMode.Level; // TODO : Set back to start eventually

  public handleFrame(): void {
    // TODO : Handle NPC and other events
  }
}
