import { Component, Input } from '@angular/core';
import { RestaurantModel } from '../../models/RestaurantModel';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-restaurant-item',
  imports: [RouterLink],
  templateUrl: './restaurant-item.html',
  styles: ``,
})
export class RestaurantItem {
  @Input() restaurant!: RestaurantModel;
}
