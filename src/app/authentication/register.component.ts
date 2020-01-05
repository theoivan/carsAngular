import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { MessageService } from 'primeng/api';
import { RegisterCredentials } from '../models/registerCredentials.model';
import { UserService } from '../services/user.service';
import { LoginCredentials } from '../models/loginCredentials.model';
import { Router } from '@angular/router';

@Component({
    templateUrl: './register.component.html',
    providers: [MessageService]
})

@NgModule({

})

export class RegisterComponent implements OnInit {
    constructor(private userService: UserService, private messageService: MessageService, private router: Router) { }

    private sub: any;
    registerCredentials: RegisterCredentials;
    loginCredentials: LoginCredentials = new LoginCredentials();

    ngOnInit() {
        this.resetForm();
    }

    resetForm() {
        this.registerCredentials = new RegisterCredentials();
    }

    register() {
        this.userService.register(this.registerCredentials).subscribe(
            res => {
                this.loginCredentials.password = this.registerCredentials.password;
                this.loginCredentials.username = this.registerCredentials.username;
                this.resetForm();
                this.userService.login(this.loginCredentials).subscribe(
                    result => {
                        this.resetForm();
                        const token = (result as any).token;
                        const userId = (res as any).id;
                        const role = (res as any).role;
                        localStorage.setItem('jwt', token);
                        localStorage.setItem('userId', userId);
                        localStorage.setItem('role', role);
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
