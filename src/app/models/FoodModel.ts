import { RestaurantModel } from './RestaurantModel';

export class FoodModel {
  constructor(
    public _id: string,
    public name: string,
    public image: string,
    public price: number,
    public restaurant: RestaurantModel,
  ) {}
}
