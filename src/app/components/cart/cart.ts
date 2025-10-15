import { CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FoodModel } from '../../models/FoodModel';
import { Spinner } from '../spinner/spinner';

@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe, RouterLink, Spinner],
  templateUrl: './cart.html',
})
export class Cart {
  authService = inject(AuthService);

  get foods(): FoodModel[] | undefined {
    return this.authService.user?.cart;
  }
}
