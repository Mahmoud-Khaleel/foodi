import { Component, inject, OnInit } from '@angular/core';
import { FoodModel } from '../../models/FoodModel';
import { ActivatedRoute, Router } from '@angular/router';
import { FoodsService } from '../../services/foods.service';
import { Spinner } from '../spinner/spinner';
import { Error } from '../error/error';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-food-details',
  imports: [Spinner, Error],
  templateUrl: './food-details.html',
})
export class FoodDetails implements OnInit {
  food: FoodModel | null = null;
  error: string | null = null;
  isAddingFoodToCart = false;

  foodsService = inject(FoodsService);
  route = inject(ActivatedRoute);
  toastr = inject(ToastrService);

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

  addFoodToCart() {
    this.isAddingFoodToCart = true;
    this.foodsService
      .addFoodToCart(this.food!._id)
      .pipe(finalize(() => (this.isAddingFoodToCart = false)))
      .subscribe({
        next: (res) => {
          this.toastr.success('Food added to cart successfully!');
        },
        error: (err) => {
          this.toastr.error('Failed to add food to cart: ' + err.message);
        },
      });
  }
}
