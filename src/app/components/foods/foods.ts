import { Component, inject, OnInit } from '@angular/core';
import { FoodModel } from '../../models/FoodModel';
import { Router, RouterLink } from '@angular/router';
import { FoodsService } from '../../services/foods.service';
import { Error } from '../error/error';
import { FoodCardShimmer } from './children/food-card-shimmer/food-card-shimmer';
import { FoodItem } from '../food-item/food-item';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-foods',
  imports: [Error, FoodCardShimmer, FoodItem, FormsModule],
  templateUrl: './foods.html',
})
export class Foods implements OnInit {
  foods: FoodModel[] | null = null;
  error: string | null = null;
  skeletons = Array.from({ length: 10 });
  searchTerm: string = '';
  foodsService = inject(FoodsService);
  router = inject(Router);

  ngOnInit() {
    this.getAllFoods();
  }

  getAllFoods() {
    this.foodsService.getAllFoodsUrl().subscribe({
      next: (res) => {
        this.foods = res['data'];
        this.error = null;
      },
      error: (err) => {
        this.error = err.message;
        this.foods = null;
      },
    });
  }

  get filteredFoods(): FoodModel[] {
    if (!this.foods) return [];
    if (!this.searchTerm.trim()) return this.foods;
    const term = this.searchTerm.toLowerCase();
    return this.foods.filter((f) => f.name.toLowerCase().includes(term));
  }
}
