import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, RouterLink, RouterLinkActive } from '@angular/router';
import { NavItem } from './children/nav-item/nav-item';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NavItem, CommonModule],
  templateUrl: './navbar.html',
})
export class Navbar implements OnInit {
  isAuthPage: boolean = false;
  isLoggedIn: boolean = false;

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

  public setLoginStatus(status: boolean): void {
    const previouslyLoggedIn = this.isLoggedIn;
    this.isLoggedIn = status;

    // Redirect to /home after a successful login (only on state change)
    if (status === true && !previouslyLoggedIn) {
      if (this.router.url !== '/home') {
        console.log('User signed in. Redirecting to /home.');
        this.router.navigate(['/home']);
      }
    }
  }
}
