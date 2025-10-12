import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NavItem } from './children/nav-item/nav-item';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, NavItem],
  templateUrl: './navbar.html',
})
export class Navbar {}
