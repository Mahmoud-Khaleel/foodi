import { CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FoodModel } from '../../models/FoodModel';
import { Spinner } from '../spinner/spinner';
import { Error } from '../error/error';

interface CartItem {
  food: FoodModel;
  count: number;
}

@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe, RouterLink, Spinner, Error],
  templateUrl: './cart.html',
})
export class Cart {
  authService = inject(AuthService);

  get foods(): CartItem[] | undefined {
    const foods = this.authService.user?.cart as FoodModel[] | undefined;
    if (!foods) return undefined;

    const grouped: Record<string, CartItem> = {};

    for (const food of foods) {
      if (grouped[food._id]) {
        grouped[food._id].count++;
      } else {
        grouped[food._id] = { food, count: 1 };
      }
    }

    return Object.values(grouped);
  }

  get errorGettingFoods(): string | null {
    return this.authService.errorGettingUserData;
  }
}
