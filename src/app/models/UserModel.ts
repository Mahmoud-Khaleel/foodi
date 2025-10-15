import { FoodModel } from './FoodModel';
import { LocationModel } from './LocationModel';

export class UserModel {
  constructor(
    public _id: string,
    public name: string,
    public email: string,
    public phone: string,
    public location: LocationModel,
    public cart: FoodModel[],
  ) {}
}
