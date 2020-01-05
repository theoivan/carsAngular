import { Component } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NavMenuService } from '../services/nav-menu.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  constructor(private jwtHelper: JwtHelperService, private navMenuService: NavMenuService, private router: Router) {

  }

  isExpanded = false;

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  getLogoPath() {
    return this.navMenuService.getLogoPath();
  }

  isUserAuthenticated() {
    const token: string = localStorage.getItem('jwt');
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return true;
    } else {
      return false;
    }
  }

  logOut() {
    localStorage.removeItem('jwt');
    localStorage.removeItem('userId');
    this.router.navigate(['/']);
 }
}
