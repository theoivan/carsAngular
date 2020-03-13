import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SelectItem } from 'primeng/api';

@Injectable({
    providedIn: 'root'
})

export class InfrastructureService {
    readonly rootURL = 'https://localhost:5001/';
    countries: SelectItem[];
    transmissionTypes: SelectItem[];
    fuelTypes: SelectItem[];
    emissionStandards: SelectItem[];

    constructor(private http: HttpClient) { }

    getAllCountries() {
        return this.http.get(this.rootURL + 'infrastructure/allCountries').toPromise()
            .then(res => this.countries = res as SelectItem[]).then(data => data);
    }

    getAllFuelTypes() {
        return this.http.get(this.rootURL + 'infrastructure/allFuelTypes').toPromise()
            .then(res => this.countries = res as SelectItem[]).then(data => data);
    }

    getAllTransmissionTypes() {
        return this.http.get(this.rootURL + 'infrastructure/allTransmissionTypes').toPromise()
            .then(res => this.countries = res as SelectItem[]).then(data => data);
    }

    getAllEmissionStandards() {
        return this.http.get(this.rootURL + 'infrastructure/allEmissionStandards').toPromise()
            .then(res => this.countries = res as SelectItem[]).then(data => data);
    }
}
