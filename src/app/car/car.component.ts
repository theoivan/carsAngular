import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { NgModule } from '@angular/core';
import { MessageService } from 'primeng/api';
import { CarService } from '../services/car.service';
import { Car } from '../models/car.model';
import { ActivatedRoute } from '@angular/router';
import { HttpEventType } from '@angular/common/http';

@Component({
    templateUrl: './car.component.html',
    styleUrls: ['./car.component.css'],
    providers: [MessageService]
})

@NgModule({

})

export class CarComponent implements OnInit {
    constructor(private carService: CarService, private messageService: MessageService, private route: ActivatedRoute) { }

    private sub: any;
    id: number;
    car: Car;
    firstRegistrationDate: Date = new Date();
    uploadedFiles: any[] = [];
    public progress: number;
    public message: string;
    currentUserId: number;
    // tslint:disable-next-line: no-output-on-prefix
    @Output() public onUploadFinished = new EventEmitter();

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.id = +params.id;
        });
        this.getCar();
        this.getCurrentUserId();
    }

    getCar() {
        this.carService.getCar(this.id).then(car => this.car = car);
    }

    getCurrentUserId() {
        this.currentUserId = Number(localStorage.getItem('userId'));
    }


    updateCar() {
        this.car.firstRegistrationDate = this.firstRegistrationDate.toLocaleString();
        this.carService.updateCar(this.car).subscribe(
          res => {
            this.getCar();
            this.messageService.add({
              severity: 'success', summary: 'Car updated!',
              detail: 'Car has been updated!'
            });
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

    public uploadFile = (files: string | any[]) => {
        if (files.length === 0) {
            return;
        }
        const fileToUpload = files[0] as File;
        const formData = new FormData();
        formData.append('file', fileToUpload, fileToUpload.name);
        this.carService.uploadImage(formData, this.id).subscribe(event => {
            if (event.type === HttpEventType.UploadProgress) {
                this.progress = Math.round(100 * event.loaded / event.total);
            } else if (event.type === HttpEventType.Response) {
                this.message = 'Upload success.';
                this.onUploadFinished.emit(event.body);
                this.getCar();
                this.messageService.add({
                  severity: 'success', summary: 'Image updated!',
                  detail: 'Image has been updated!'
                });
            }
        });
    }

    public createImgPath = (serverPath: string) => {
        return this.carService.createImgPath(serverPath);
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
