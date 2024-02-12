import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { Hero } from '../../interfaces/hero';
import { HeroService } from '../../services/hero.service';
import { RouterModule } from '@angular/router';
import { HeroSearchComponent } from '../hero-search/hero-search.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgFor, RouterModule, HeroSearchComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})

export class DashboardComponent {
  heroes: Hero[] = []

  constructor(private heroService: HeroService) {}

  ngOnInit() {
    this.getHeroes()
  }
  
  getHeroes() {
    this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes.slice(0, 4))
  }
}
