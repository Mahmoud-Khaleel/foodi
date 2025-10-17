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
import { About } from './components/about/about';
import { NotFound } from './components/not-found/not-found';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: 'foods', component: Foods },
  { path: 'foods/:id', component: FoodDetails },
  { path: 'cart', component: Cart },
  { path: 'restaurants', component: Restaurants },
  { path: 'restaurants/:id', component: RestaurantDetails },
  { path: 'profile', component: UserProfile },
  { path: 'about', component: About },
  { path: 'login', component: Login },
  { path: 'signup', component: SignUp },
  { path: 'signup', component: SignUp },
  { path: '**', component: NotFound },
];
