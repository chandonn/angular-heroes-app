import { Component } from '@angular/core';
import { Hero } from '../hero';
import { NgIf, UpperCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [UpperCasePipe, FormsModule, NgIf],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})

export class HeroComponent {
  hero: Hero

  constructor() {
    this.hero = {
      id: 0,
      name: "Windstorm"
    }
  }
}
