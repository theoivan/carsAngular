import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { DataViewModule } from 'primeng/dataview';
import { CalendarModule } from 'primeng/calendar';
import { FileUploadModule } from 'primeng/fileupload';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { RegisterComponent } from './authentication/register.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { SpinnerModule } from 'primeng/spinner';
import { ButtonModule } from 'primeng/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './authentication/login.component';
import { AllCarsComponent } from './car/allCars.component';
import { HomeComponent } from './home/home.component';
import { CarComponent } from './car/car.component';
import { NewCarComponent } from './car/newCar.component';
import { AuthGuard } from './guards/auth-guard.service';

export function tokenGetter() {
  return localStorage.getItem('jwt');
}

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    RegisterComponent,
    LoginComponent,
    AllCarsComponent,
    HomeComponent,
    CarComponent,
    NewCarComponent
  ],
  imports: [
    BrowserModule,
    DataViewModule,
    HttpClientModule,
    FormsModule,
    CalendarModule,
    ConfirmDialogModule,
    SpinnerModule,
    ButtonModule,
    FileUploadModule,
    BrowserAnimationsModule,
    ToastModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'login', component: LoginComponent },
      { path: 'cars', component: AllCarsComponent, canActivate: [AuthGuard] },
      { path: 'car/:id', component: CarComponent, canActivate: [AuthGuard] },
      { path: 'newCar', component: NewCarComponent, canActivate: [AuthGuard] }
    ]),
    JwtModule.forRoot({
      config: {
        // tslint:disable-next-line: object-literal-shorthand
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:4200'],
        blacklistedRoutes: []
      }
    })
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
