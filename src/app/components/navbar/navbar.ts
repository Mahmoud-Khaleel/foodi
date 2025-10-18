import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { NavItem } from './children/nav-item/nav-item';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, NavItem, RouterModule, CommonModule],
  templateUrl: './navbar.html',
})
export class Navbar implements OnInit {
  isLoggedIn = false; // Change to true after login
  isAuthPage = false;
  isMenuOpen = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Detect route change
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        const currentUrl = event.urlAfterRedirects || event.url;
        this.isAuthPage = currentUrl.includes('/login') || currentUrl.includes('/signup');
      });

    // Detect login status (example: check localStorage)
    this.isLoggedIn = !!localStorage.getItem('token'); // Adjust key as per your auth logic
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
