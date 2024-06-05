import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Hero } from './data/heroes';
import { HEROES } from './data/mock-heros';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  private heroesUrl = 'api/heroes'; // URL to web api
  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  //fetching from array
  // getHeroes(): Observable<Hero[]> {
  //   const heroes = of(HEROES);
  //   this.msgService.add('HeroService : Fetched Heroes');
  //   return heroes;
  // }

  /** GET heroes from the server */
  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl);
  }
  getHero(id: Number): Observable<Hero> {
    const hero = HEROES.find((h) => h.id === id)!;
    this.messageService.add(`HeroService : fetched hero id=${id}`);
    return of(hero);
  }
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
}
