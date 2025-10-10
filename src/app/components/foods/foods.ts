import { Component, inject, OnInit } from '@angular/core';
import { FoodModel } from '../../models/FoodModel';
import { Router, RouterLink } from '@angular/router';
import { Spinner } from '../spinner/spinner';
import { FoodsService } from '../../services/foods-service';

@Component({
  selector: 'app-foods',
  imports: [RouterLink, Spinner],
  templateUrl: './foods.html',
  styleUrl: './foods.css',
})
export class Foods implements OnInit {
  foods: FoodModel[] | null = null;
  error: string | null = null;

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
}
