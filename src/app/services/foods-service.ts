import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConstants } from '../core/constants/constants';

@Injectable({
  providedIn: 'root',
})
export class FoodsService {
  private allFoodsUrl = `${AppConstants.baseUrl}/foods`;
  http = inject(HttpClient);
  getAllFoodsUrl(): Observable<any> {
    return this.http.get(this.allFoodsUrl);
  }

  getFood(id: string): Observable<any> {
    return this.http.get(`${this.allFoodsUrl}/${id}`);
  }
}
