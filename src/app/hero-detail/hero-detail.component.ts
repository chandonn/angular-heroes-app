import { NgIf, UpperCasePipe, Location } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Hero } from '../../interfaces/hero';
import { ActivatedRoute } from '@angular/router';
import { HeroService } from '../../services/hero.service';

@Component({
  selector: 'app-hero-detail',
  standalone: true,
  imports: [
    NgIf,
    UpperCasePipe,
    FormsModule,
  ],
  templateUrl: './hero-detail.component.html',
  styleUrl: './hero-detail.component.css'
})

export class HeroDetailComponent {
  hero?: Hero

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) {}

  ngOnInit() {
    this.getHero()
  }

  getHero() {
    const id = Number(this.route.snapshot.paramMap.get("id"))
    this.heroService.getHero(id).subscribe(hero => this.hero = hero)
  }

  goBack() {
    this.location.back()
  }

  save() {
    if (this.hero) {
      this.heroService.updateHero(this.hero).subscribe(() => this.goBack())
    }
  }
}
