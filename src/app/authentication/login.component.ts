import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { MessageService } from 'primeng/api';
import { UserService } from '../services/user.service';
import { LoginCredentials } from '../models/loginCredentials.model';
import { Router } from '@angular/router';

@Component({
    templateUrl: './login.component.html',
    providers: [MessageService]
})

@NgModule({

})

export class LoginComponent implements OnInit {
    constructor(private userService: UserService, private messageService: MessageService, private router: Router) { }

    private sub: any;
    loginCredentials: LoginCredentials;

    ngOnInit() {
        this.resetForm();
    }

    resetForm() {
        this.loginCredentials = new LoginCredentials();
    }

    login() {
        this.userService.login(this.loginCredentials).subscribe(
            res => {
                this.resetForm();
                const token = (res as any).token;
                const userId = (res as any).id;
                const role = (res as any).role;
                localStorage.setItem('jwt', token);
                localStorage.setItem('userId', userId);
                localStorage.setItem('role', role);
                console.log(localStorage);
                this.router.navigate(['/cars']);
            },
            err => {
                console.log(err);
                this.messageService.add({
                    severity: 'error', summary: 'Error!',
                    detail: 'An error has occured!'
                });
            }
        );
    }
}
