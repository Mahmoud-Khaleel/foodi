import { Component, Input } from '@angular/core';
import { FoodModel } from '../../models/FoodModel';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-food-item',
  imports: [RouterLink],
  templateUrl: './food-item.html',
  styles: ``,
})
export class FoodItem {
  @Input() food!: FoodModel;
}
