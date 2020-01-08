import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Car } from '../models/car.model';

@Injectable({
    providedIn: 'root'
})

export class CarService {
    readonly rootURL = 'https://localhost:5001/';
    cars: Car[];
    car: Car;

    constructor(private http: HttpClient) { }

    getAllCars() {
        return this.http.get(this.rootURL + 'car/allCars').toPromise()
            .then(res => this.cars = res as Car[]).then(data => data);
    }

    getCar(id: number) {
        return this.http.get(this.rootURL + 'car/car/' + id).toPromise()
            .then(res => this.car = res as Car).then(data => data);
    }

    addCar(car: Car) {
        return this.http.post(this.rootURL + 'car/newCar', car);
    }

    updateCar(car: Car) {
        return this.http.put(this.rootURL + 'car/updateCar', car);
    }

    uploadImage(formData: any, carId: number) {
        return this.http.post(this.rootURL + 'car/upload/' + carId, formData, { reportProgress: true, observe: 'events' });
    }

    createImgPath(serverPath: string) {
        return this.rootURL + serverPath;
    }

    deleteCar(id: number) {
        return this.http.delete(this.rootURL + 'car/' + id);
    }

    getRootUrl() {
        return this.rootURL;
    }
}
