import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
import { Login } from './components/login/login';
import { SignUp } from './components/sign-up/sign-up';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Login, SignUp],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('foodi');
}
