import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ReactiveFormsModule, Navbar],
  templateUrl: './app.html',
})
export class App implements OnInit {
  authService = inject(AuthService);

  ngOnInit(): void {
    this.authService.getProfile();
  }
}
