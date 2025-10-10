import { inject, Injectable } from '@angular/core';
import { AppConstants } from '../../../core/constants/constants';
import { FoodModel } from '../../../models/FoodModel';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FoodsService {
  private allFoodsUrl = `${AppConstants.baseUrl}/foods`;
  http = inject(HttpClient);
  getAllFoodsUrl(): Observable<any> {
    return this.http.get(this.allFoodsUrl);
  }
}
