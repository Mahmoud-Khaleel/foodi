import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
import { Login } from './components/login/login';
import { SignUp } from './components/sign-up/sign-up';
import { NavItem } from './components/navbar/children/nav-item/nav-item';
import { UserProfile } from './components/user-profile/user-profile';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Login, SignUp, NavItem, UserProfile],
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('foodi');
}
