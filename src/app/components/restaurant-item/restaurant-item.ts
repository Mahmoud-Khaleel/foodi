import { Component, Input } from '@angular/core';
import { RestaurantModel } from '../../models/RestaurantModel';

@Component({
  selector: 'app-restaurant-item',
  imports: [],
  templateUrl: './restaurant-item.html',
  styles: ``,
})
export class RestaurantItem {
  @Input() restaurant!: RestaurantModel;
}
