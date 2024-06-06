import { Injectable } from '@angular/core';
import { Observable, catchError, of, tap } from 'rxjs';
import { Hero } from './data/heroes';
import { HEROES } from './data/mock-heros';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  private heroesUrl = 'api/heroes'; // URL to web api
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

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
    return (
      this.http
        .get<Hero[]>(this.heroesUrl)
        // .pipe(catchError(this.handleError<Hero[]>('getHeroes', [])));
        .pipe(
          tap((_) => this.log('fetched heroes')),
          catchError(this.handleError<Hero[]>('getHeroes', []))
        )
    );
  }
  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap((_) => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  updateHero(hero: Hero) {
    return this.http.put(this.heroesUrl, hero, this.httpOptions);
  }
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  //handle error
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
