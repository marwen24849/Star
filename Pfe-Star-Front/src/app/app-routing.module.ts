import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './monotoring/dashboard/dashboard.component';
import { authGuard } from './auth.guard';
import { UnauthorizedComponent } from './component/unauthorized/unauthorized.component';
import {AboutComponent} from "./component/about/about.component";
import {CarsComponent} from "./component/cars/cars.component";
import { AddCarsComponent } from './component/add-cars/add-cars.component';
import { ListeAgenceComponent } from './component/liste-agence/liste-agence.component';


const routes: Routes = [
  {path:'', component:AboutComponent},
  {path :'dash', component:DashboardComponent, canActivate : [authGuard], data : {roles : ['admin']}},
  { path: 'unauthorized', component: UnauthorizedComponent },
  {path : 'cars', component : CarsComponent},
  {path: 'addCars', component: AddCarsComponent},
  {path : 'listAgence', component : ListeAgenceComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
