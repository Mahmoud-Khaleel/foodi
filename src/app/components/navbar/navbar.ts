import { Component, inject, OnInit } from '@angular/core';
import { Router, NavigationEnd, RouterLink, RouterLinkActive } from '@angular/router';
import { NavItem } from './children/nav-item/nav-item';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NavItem, CommonModule],
  templateUrl: './navbar.html',
})
export class Navbar implements OnInit {
  isAuthPage: boolean = false;
  authService = inject(AuthService);

  constructor(private router: Router) {}

  ngOnInit() {
    this.checkCurrentRoute(this.router.url);

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.checkCurrentRoute(event.urlAfterRedirects);
      });
  }

  checkCurrentRoute(url: string): void {
    this.isAuthPage = url.includes('/login') || url.includes('/signup');
  }

  get isLoggedIn() {
    return this.authService.user !== null;
  }
}
