import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Hero } from './hero';
import { HeroService } from './hero.service';

@Component({
  selector: 'my-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  title = 'Tour of Heroes';
  heroes: Hero[];
  heroName: String = '';
  selectedHero: Hero;

  constructor(
    private router: Router,
    private heroService: HeroService
  ) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  /**
   * 获取列表
   */
  getHeroes(): void {
    this.heroService.getHeroes().then(heroes => this.heroes = heroes);
  }

  /**
   * 添加
   */
  add(): void {
    let name = this.heroName.trim();
    if (!name) { return; }
    this.heroService.create(name)
      .then(hero => {
        this.heroes.push(hero);
        this.heroName = '';
        this.selectedHero = null;
      })
  }

  /**
   * 删除
   */
  delete(hero: Hero): void {
    this.heroService
      .delete(hero.id)
      .then(() => {
        this.heroes = this.heroes.filter(h => h !== hero);
        if (this.selectedHero === hero) { this.selectedHero = null; }
      })
  }

  /**
   * 选中英雄
   * @param hero 
   */
  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

  /**
   * 跳转详情
   */
  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedHero.id])
  }
}
