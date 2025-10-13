import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Foods } from './components/foods/foods';
import { FoodDetails } from './components/food-details/food-details';
import { Cart } from './components/cart/cart';
import { Restaurants } from './components/restaurants/restaurants';
import { UserProfile } from './components/user-profile/user-profile';
import { Login } from './components/login/login';
import { SignUp } from './components/sign-up/sign-up';
import { RestaurantDetails } from './components/restaurant-details/restaurant-details';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: 'foods', component: Foods },
  { path: 'foods/:id', component: FoodDetails },
  { path: 'cart', component: Cart },
  { path: 'restaurants', component: Restaurants },
  { path: 'foods/:id', component: FoodDetails },
  { path: 'profile', component: UserProfile },
  { path: 'login', component: Login },
  { path: 'signup', component: SignUp },
  { path: 'restaurants/:id', component: RestaurantDetails },
];
