import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class NavMenuService {
    readonly rootURL = 'https://localhost:5001/';

    constructor(private http: HttpClient) { }

    getLogoPath() {
        const path = 'Resources/Images/logo.png';
        return this.rootURL + path;
      }

}
