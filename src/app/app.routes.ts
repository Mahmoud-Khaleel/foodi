import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Foods } from './components/foods/foods';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: 'foods', component: Foods },
];
