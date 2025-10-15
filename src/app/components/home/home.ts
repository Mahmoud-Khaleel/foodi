import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Spinner } from '../spinner/spinner';
import { UserModel } from '../../models/UserModel';

@Component({
  selector: 'app-home',
  imports: [RouterLink, Spinner],
  templateUrl: './home.html',
})
export class Home {
  authService = inject(AuthService);

  get user(): UserModel | null {
    return this.authService.user;
  }
}
