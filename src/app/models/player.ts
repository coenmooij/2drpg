import { Injectable } from '@angular/core';
import { Character } from './character';

// Player is just a singleton character
@Injectable({providedIn: 'root'})
export class Player extends Character {
  public interact(): void {
    // TODO : Implement
  }
}
