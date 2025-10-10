import { Component, inject, OnInit } from '@angular/core';
import { FoodModel } from '../../models/FoodModel';
import { FoodsService } from './service/foods-service';

@Component({
  selector: 'app-foods',
  imports: [],
  templateUrl: './foods.html',
  styleUrl: './foods.css',
})
export class Foods implements OnInit {
  foods: FoodModel[] | null = null;
  error: string | null = null;

  foodsService = inject(FoodsService);

  ngOnInit() {
    this.getAllFoods();
  }

  getAllFoods() {
    this.foodsService.getAllFoodsUrl().subscribe({
      next: (res) => {
        this.foods = res['data'];
      },
      error: (err) => {
        this.error = err.message;
      },
    });
  }
}
