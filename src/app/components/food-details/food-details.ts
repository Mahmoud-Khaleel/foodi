import { Component, inject, OnInit } from '@angular/core';
import { FoodModel } from '../../models/FoodModel';
import { ActivatedRoute, Router } from '@angular/router';
import { FoodsService } from '../../services/foods-service';
import { Spinner } from '../spinner/spinner';
import { Error } from '../error/error';

@Component({
  selector: 'app-food-details',
  imports: [Spinner, Error],
  templateUrl: './food-details.html',
  styleUrl: './food-details.css',
})
export class FoodDetails implements OnInit {
  food: FoodModel | null = null;
  error: string | null = null;

  foodsService = inject(FoodsService);
  route = inject(ActivatedRoute);

  ngOnInit() {
    this.getFood();
  }

  getFood() {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.foodsService.getFood(id).subscribe({
      next: (res) => {
        this.food = res['data'];
        this.error = null;
      },
      error: (err) => {
        this.error = err.message;
        this.food = null;
      },
    });
  }
}
