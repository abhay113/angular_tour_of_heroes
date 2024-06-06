import { Component, OnInit } from '@angular/core';
// import { HEROES } from './mock-heros';
import { Hero } from '../data/heroes';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';
@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrl: './heroes.component.css',
})
export class HeroesComponent implements OnInit {
  constructor(
    private heroService: HeroService,
    private msgService: MessageService
  ) {}

  ngOnInit(): void {
    this.getHeroes();
  }

  heroes: Hero[] = [];
  // heroes = HEROES;
  selectedHero?: Hero;
  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

  //fetch hero
  getHeroes(): void {
    this.heroService.getHeroes().subscribe((heroes) => (this.heroes = heroes));
  }

  //add hero
  add(name: string): void {
    name = name.trim();
    if (!name) {
      alert('Please enter a name');
      return;
    }
    this.heroService.addHero({ name } as Hero).subscribe((hero) => {
      this.heroes.push(hero);
    });
  }

  //delete
  delete(hero: Hero) {
    this.heroes = this.heroes.filter((h) => h !== hero);
    this.heroService.deleteHero(hero.id).subscribe();
  }
}
