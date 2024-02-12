import { Injectable } from '@angular/core';
import { HEROES } from '../assets/mock-heroes';
import { Hero } from '../interfaces/hero';

@Injectable({
  providedIn: 'root'
})

export class InMemoryDataService implements InMemoryDataService {

  createDb() {
    const heroes = HEROES

    return { heroes }
  }

  genId(heroes: Hero[]): number {
    return heroes.length > 0 ? Math.max(...heroes.map(h => h.id)) + 1 : 11
  }
}
