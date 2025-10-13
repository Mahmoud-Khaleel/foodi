import { Component, inject, OnInit } from '@angular/core';
import { RestaurantsService } from '../../services/restaurants-service';
import { RestaurantModel } from '../../models/RestaurantModel';
import { ActivatedRoute } from '@angular/router';
import { Error } from '../error/error';
import { Spinner } from '../spinner/spinner';
import { FoodItem } from '../food-item/food-item';

@Component({
  selector: 'app-restaurant-details',
  imports: [Error, Spinner, FoodItem],
  templateUrl: './restaurant-details.html',
  styles: ``,
})
export class RestaurantDetails implements OnInit {
  restaurantsService = inject(RestaurantsService);
  route = inject(ActivatedRoute);

  restaurant: RestaurantModel | null = null;
  errorMessage: string | null = null;

  ngOnInit() {
    this.getRestaurant();
  }

  getRestaurant() {
    const id = this.route.snapshot.paramMap.get('id')!;
    console.log(id);

    this.restaurantsService.getRestaurant(id).subscribe({
      next: (res) => {
        this.restaurant = res['data'];
        this.errorMessage = null;
      },
      error: (error) => {
        this.errorMessage = error['message'] || 'Error fetching restaurant details';
        this.restaurant = null;
      },
    });
  }
}
