import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Foods } from './components/foods/foods';
import { FoodDetails } from './components/food-details/food-details';
import { Cart } from './components/cart/cart';
import { UserProfile } from './components/user-profile/user-profile';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: 'foods', component: Foods },
  { path: 'cart', component: Cart },
  { path: 'foods/:id', component: FoodDetails },
  { path: 'profile', component: UserProfile },
];
