import { Component, inject } from '@angular/core';
import { NgFor, NgIf, UpperCasePipe } from '@angular/common';
import { Hero } from '../../interfaces/hero';
import { FormsModule } from '@angular/forms';
import { HeroDetailComponent } from '../hero-detail/hero-detail.component';
import { HeroService } from '../../services/hero.service';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-heroes',
  standalone: true,
  imports: [NgFor, NgIf, UpperCasePipe, FormsModule, HeroDetailComponent],
  templateUrl: './heroes.component.html',
  styleUrl: './heroes.component.css'
})

export class HeroesComponent {
  heroes: Hero[] = []
  selectedHero: Hero | undefined

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
    this.selectedHero = hero
    this.messageService.add(`Heroes Component: Selected hero id=${hero.id}`)
  }
}
