import { Component, inject } from '@angular/core';
import { NgFor, NgIf, UpperCasePipe } from '@angular/common';
import { Hero } from '../../interfaces/hero';
import { FormsModule } from '@angular/forms';
import { HeroDetailComponent } from '../hero-detail/hero-detail.component';
import { HeroService } from '../../services/hero.service';
import { MessageService } from '../../services/message.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-heroes',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    UpperCasePipe,
    FormsModule,
    HeroDetailComponent,
    RouterModule
  ],
  templateUrl: './heroes.component.html',
  styleUrl: './heroes.component.css'
})

export class HeroesComponent {
  heroes: Hero[] = []

  constructor(private heroService: HeroService, private messageService: MessageService) {
  }

  // Lifecycle method called uppon initialization
  ngOnInit() {
    this.getHeroes()
  }
  
  getHeroes(): void {
    this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes)
  }

  onSelect(hero: Hero): void {
    this.messageService.add(`Heroes Component: Selected hero id=${hero.id}`)
  }

  add(name: string) {
    name = name.trim()
    if (!name) return

    this.heroService.addHero(name).subscribe(hero => this.heroes.push(hero))
  }

  delete(hero: Hero) {
    this.heroes = this.heroes.filter(it => it.id !== hero.id)
    this.heroService.deleteHero(hero).subscribe()
  }
}
