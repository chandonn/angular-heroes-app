import { Component } from '@angular/core';
import { HEROES } from '../../assets/mock-hearoes';
import { NgFor, NgIf, UpperCasePipe } from '@angular/common';
import { Hero } from '../hero';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-heroes',
  standalone: true,
  imports: [NgFor, NgIf, UpperCasePipe, FormsModule],
  templateUrl: './heroes.component.html',
  styleUrl: './heroes.component.css'
})

export class HeroesComponent {
  heroes = HEROES
  selectedHero: Hero | undefined
  
  onSelect(hero: Hero) {
    this.selectedHero = hero
  }
}
