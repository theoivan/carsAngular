import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterCredentials } from '../models/registerCredentials.model';
import { LoginCredentials } from '../models/loginCredentials.model';

@Injectable({
    providedIn: 'root'
})

export class UserService {
    readonly rootURL = 'https://localhost:5001/user/';

    constructor(private http: HttpClient) { }

    register(registerCredentials: RegisterCredentials) {
        return this.http.post(this.rootURL + 'register', registerCredentials);
    }

    login(loginCredentials: LoginCredentials) {
        return this.http.post(this.rootURL + 'login', loginCredentials);
    }
}
