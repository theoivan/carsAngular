import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { CarService } from '../services/car.service';
import { Car } from '../models/car.model';

@Component({
    templateUrl: './allCars.component.html',
    styleUrls: ['./allCars.component.css'],
    providers: [MessageService, ConfirmationService]
})

@NgModule({

})

export class AllCarsComponent implements OnInit {
    constructor(private carService: CarService, private messageService: MessageService,
                private confirmationService: ConfirmationService) { }

    private sub: any;
    rootUrl: string;
    isAdmin: boolean;
    cars: Car[];
    currentUserId: number;

    ngOnInit() {
        this.getAllCars();
        this.getRootUrl();
        this.checkIfIsAdmin();
    }

    checkIfIsAdmin() {
        this.currentUserId = Number(localStorage.getItem('userId'));
        this.isAdmin = localStorage.getItem('role') === 'Admin';
    }

    getAllCars() {
        this.carService.getAllCars().then(cars => this.cars = cars);
    }

    getRootUrl() {
        this.rootUrl = this.carService.getRootUrl();
    }

    deleteCar(id: number) {
        this.confirmationService.confirm({
            message: 'Are you sure that you want to delete this car?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.carService.deleteCar(id).subscribe(res => {
                    this.getAllCars();
                    this.messageService.add({ severity: 'info', summary: 'Car deleted!', detail: 'A car has been deleted!' });
                },
                    err => {
                        console.log(err);
                        this.messageService.add({
                            severity: 'error', summary: 'Error!',
                            detail: 'An error has occured!'
                        });
                    });
            },
            reject: () => {

            }
        });
    }
}
