import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Foods } from './components/foods/foods';
import { FoodDetails } from './components/food-details/food-details';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: 'foods', component: Foods },
  { path: 'foods/:id', component: FoodDetails },
];
