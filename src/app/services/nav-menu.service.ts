import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class NavMenuService {
    readonly rootURL = 'https://localhost:44341/';

    constructor(private http: HttpClient) { }

    getLogoPath() {
        console.log(localStorage);
        const path = 'Resources/Images/logo.jpg';
        return this.rootURL + path;
      }

}
