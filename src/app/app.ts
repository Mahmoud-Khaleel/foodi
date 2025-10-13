import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
import { Login } from './components/login/login';
import { SignUp } from './components/sign-up/sign-up';
import { NavItem } from './components/navbar/children/nav-item/nav-item';
import { UserProfile } from './components/user-profile/user-profile';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ReactiveFormsModule, Login, SignUp],
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('foodi');
}
