import { Component, inject, OnInit } from '@angular/core';
import { RestaurantItem } from '../restaurant-item/restaurant-item';
import { RestaurantsService } from '../../services/restaurants-service';
import { RestaurantModel } from '../../models/RestaurantModel';
import { Error } from '../error/error';
import { Spinner } from '../spinner/spinner';
import { RestaurantCardShimmer } from './children/restaurant-card-shimmer/restaurant-card-shimmer';

@Component({
  selector: 'app-restaurants',
  imports: [Error, Spinner, RestaurantItem, RestaurantCardShimmer],
  templateUrl: './restaurants.html',
  styles: ``,
})
export class Restaurants implements OnInit {
  restaurantsService = inject(RestaurantsService);
  allRestaurants: RestaurantModel[] | null = null;
  allRestaurantsErrorMessage: string | null = null;
  nearbyRestaurants: RestaurantModel[] | null = null;
  nearbyRestaurantsErrorMessage: string | null = null;

  ngOnInit(): void {
    Promise.all([this.getNearbyRestaurants(), this.getAllRestaurants()]);
  }

  getNearbyRestaurants() {
    this.restaurantsService.getNearbyRestaurants().subscribe({
      next: (res) => {
        this.nearbyRestaurants = res['data'];
        this.nearbyRestaurantsErrorMessage = null;
      },
      error: (err) => {
        this.nearbyRestaurantsErrorMessage = err['message'] || 'Failed to load nearby restaurants';
        this.nearbyRestaurants = null;
      },
    });
  }

  getAllRestaurants() {
    this.restaurantsService.getAllRestaurants().subscribe({
      next: (res) => {
        this.allRestaurants = res['data'];
        this.allRestaurantsErrorMessage = null;
      },
      error: (err) => {
        this.allRestaurantsErrorMessage = err['message'] || 'Failed to load restaurants';
        this.allRestaurants = null;
      },
    });
  }
}
