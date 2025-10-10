import { RestaurantModel } from './RestaurantModel';

export class FoodModel {
  constructor(
    public id: string,
    public name: string,
    public image: string,
    public price: number,
    public restaurant: RestaurantModel,
  ) {}
}
