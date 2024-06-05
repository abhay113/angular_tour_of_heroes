import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Hero } from './data/heroes';
import { HEROES } from './data/mock-heros';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  constructor(private msgService: MessageService) {}

  getHeroes(): Observable<Hero[]> {
    const heroes = of(HEROES);
    this.msgService.add('HeroService : Fetched Heroes');
    return heroes;
  }

  getHero(id: Number): Observable<Hero> {
    const hero = HEROES.find((h) => h.id === id)!;
    this.msgService.add(`HeroService : fetched hero id=${id}`);
    return of(hero);
  }
}
