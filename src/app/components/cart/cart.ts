import { CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FoodModel } from '../../models/FoodModel';
import { Spinner } from '../spinner/spinner';
import { Error } from '../error/error';

@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe, RouterLink, Spinner, Error],
  templateUrl: './cart.html',
})
export class Cart {
  authService = inject(AuthService);

  get foods(): FoodModel[] | undefined {
    return this.authService.user?.cart;
  }

  get errorGettingFoods(): string | null {
    return this.authService.errorGettingUserData;
  }
}
