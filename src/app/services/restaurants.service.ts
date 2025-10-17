import { inject, Injectable } from '@angular/core';
import { AppConstants } from '../core/constants/constants';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class RestaurantsService {
  private allRestaurantsUrl = `${AppConstants.baseUrl}/restaurants`;
  private nearbyRestaurantsUrl = `${AppConstants.baseUrl}/restaurants/nearby`;
  http = inject(HttpClient);
  authService = inject(AuthService);

  getAllRestaurants(): Observable<any> {
    return this.http.get(this.allRestaurantsUrl);
  }

  getNearbyRestaurants(): Observable<any> {
    return this.http.get(`${this.nearbyRestaurantsUrl}?distance=1&unit=km`);
  }

  getRestaurant(id: string): Observable<any> {
    return this.http.get(`${this.allRestaurantsUrl}/${id}`);
  }
}
