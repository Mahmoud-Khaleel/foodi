import { inject, Injectable } from '@angular/core';
import { AppConstants } from '../core/constants/constants';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class RestaurantsService {
  private allRestaurantsUrl = `${AppConstants.baseUrl}/restaurants`;
  private nearbyRestaurantsUrl = `${AppConstants.baseUrl}/restaurants/nearby`;
  http = inject(HttpClient);

  getAllRestaurants(): Observable<any> {
    return this.http.get(this.allRestaurantsUrl);
  }

  getNearbyRestaurants(): Observable<any> {
    const [lat, lng] = ['31.2362', '30.04235'];
    return this.http.get(`${this.nearbyRestaurantsUrl}?distance=100&unit=km`);
  }

  getRestaurant(id: string): Observable<any> {
    return this.http.get(`${this.allRestaurantsUrl}/${id}`);
  }
}
