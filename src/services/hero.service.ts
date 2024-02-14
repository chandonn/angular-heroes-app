import { Injectable } from '@angular/core';
import { Hero } from '../interfaces/hero';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class HeroService {
  private heroesUrl = "api/heroes"
  httpOptions = {
    headers: new HttpHeaders({ 'Content-type': 'application/json' })
  }

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
  ) { }

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl).pipe(
      tap(_ => this.log("fetched heroes")),
      catchError(this.handleError<Hero[]>("getHeroes", []))
    )
  }

  getHero(id: number): Observable<Hero | undefined> {
    const url = `${this.heroesUrl}/${id}`

    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`HeroService: the hero fetched is ${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    )
  }

  updateHero(hero: Hero): Observable<{}> {
    return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
      tap(_ => this.log(`Updated the hero ${hero.name}`)),
      catchError(this.handleError<{}>("updateHero"))
    )
  }

  addHero(name: string): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, { name }, this.httpOptions).pipe(
      tap(newHero => this.log(`Added a new hero called ${newHero.name}`)),
      catchError(this.handleError<Hero>("addHero"))
    )
  }

  deleteHero(hero: Hero) {
    const url = `${this.heroesUrl}/${hero.id}`
    return this.http.delete(url, this.httpOptions).pipe(
      tap(_ => this.log(`Hero ${hero.name} deleted`)),
      catchError(this.handleError<Hero>("deleteHero"))
    )
  }

  searchHeroes(query: string): Observable<Hero[]> {
    if (!query.trim()) return of([])

    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${query}`).pipe(
      tap(x => x.length ? 
        this.log(`Found heroes with query ${query}`)
        : this.log("No heroes found")
      ),
      catchError(this.handleError<Hero[]>("searchHeroes", []))
    )
  }

  private log(message: string) {
    this.messageService.add(message)
  }

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      // Send error to error infrastructure
      // Transform erro to show understandable error message
      
      return of(result as T)
    }
  }
}
