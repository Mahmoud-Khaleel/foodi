import { FoodModel } from './FoodModel';
import { LocationModel } from './LocationModel';

export class RestaurantModel {
  constructor(
    public location: LocationModel,
    public _id: string,
    public name: string,
    public description: string,
    public categories: string[],
    public foods: FoodModel[],
  ) {}
}
