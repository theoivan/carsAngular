import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { NavMenuService } from '../services/nav-menu.service';


@Component({
    templateUrl: './home.component.html'
})

@NgModule({

})

export class HomeComponent implements OnInit {
    constructor(private navMenuService: NavMenuService) { }

    ngOnInit() {
        this.getLogoPath();
    }

    getLogoPath() {
        return this.navMenuService.getLogoPath();
      }
}
