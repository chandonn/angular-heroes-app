import { AsyncPipe, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Observable, Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { HeroService } from '../../services/hero.service';
import { Hero } from '../../interfaces/hero';

@Component({
  selector: 'app-hero-search',
  standalone: true,
  imports: [NgFor, RouterModule, AsyncPipe],
  templateUrl: './hero-search.component.html',
  styleUrl: './hero-search.component.css'
})
export class HeroSearchComponent {
  // $ symbol anotate an observable inside a component
  heroes$!: Observable<Hero[]>
  // subjects are observables and values at the same time
  private searchTerms = new Subject<string>()

  constructor(private heroService: HeroService) {}

  search(query: string): void {
    // push values into an observable subject
    this.searchTerms.next(query)
  }

  ngOnInit(): void {
    this.heroes$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((query: string) => this.heroService.searchHeroes(query))
    )
  }
}
