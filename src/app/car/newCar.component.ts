import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { MessageService } from 'primeng/api';
import { CarService } from '../services/car.service';
import { Car } from '../models/car.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    templateUrl: './newCar.component.html',
    providers: [MessageService]
})

@NgModule({

})

export class NewCarComponent implements OnInit {
    constructor(private carService: CarService, private messageService: MessageService, private route: ActivatedRoute,
                private router: Router) { }

    private sub: any;
    car: Car = new Car();
    firstRegistrationDate: Date = new Date();

    ngOnInit() {

    }

    addCar() {
        const jwt = localStorage.getItem('jwt');
        const userId = localStorage.getItem('userId');
        if (jwt !== '' && jwt !== undefined && userId !== undefined && userId !== '') {
            this.car.firstRegistrationDate = this.firstRegistrationDate.toLocaleString();
            this.car.userId = Number(userId);
            this.carService.addCar(this.car).subscribe(
                res => {
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

    parse(value: any): Date | null {
        if ((typeof value === 'string') && (value.indexOf('/') > -1)) {
            const str = value.split('/');
            const year = Number(str[2]);
            const month = Number(str[1]) - 1;
            const date = Number(str[0]);
            return new Date(year, month, date);
        } else if ((typeof value === 'string') && value === '') {
            return new Date();
        }
        const timestamp = typeof value === 'number' ? value : Date.parse(value);
        return isNaN(timestamp) ? null : new Date(timestamp);
    }
}
