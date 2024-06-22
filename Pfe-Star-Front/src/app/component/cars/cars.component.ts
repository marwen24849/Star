import { Component, OnInit } from '@angular/core';
import { CarsService } from '../../service/cars.service'
import { LocationService } from '../../service/location.service';
@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrl: './cars.component.css'
})
export class CarsComponent implements OnInit{
  constructor(public shar : CarsService, private reservationService : LocationService) {
  }
  cars :any =[]
  avis:any = {
    client:{
      username:''
    }
  }

  carId: any;
  startDate: any;
  endDate: any;
  isAvailable: any;


  idCar:any;
  ngOnInit(): void {
    this.shar.getAllVehicules().subscribe(
      res => {
        this.cars = res;
        console.log(this.cars)
      },
      err=>{
        console.log(err)
      }
    );

  }

  delete(id:any){
    this.shar.deleteVehicule(id).subscribe(
      res=>{
        window.location.reload();
      },
      err=>{
        console.log(err)
      }
    );
  }

  saveId(id:any){
    this.idCar=id;
  }

  addAvis(){
    this.avis.client.username=sessionStorage.getItem('username')
    this.shar.addAvis(this.avis).subscribe(
      res=>{
        this.shar.addAvisVoiture(this.idCar,res).subscribe(
          res1=>{
           window.location.reload();
          },
          err=>{
            console.log(err);
          }
        );
      },
      err=>{
        console.log(err)
      }
    );
  }



  checkAvailability() {
    this.reservationService.checkAvailability(this.idCar, this.startDate, this.endDate).subscribe(available => {
      this.isAvailable = available;
      console.log(available)
    });
  }

  createReservation() {
    const reservation = {
      userId: '52e73823-9012-4434-9698-9e33bd8d06a7',
      carId: this.idCar,
      startDate: this.startDate,
      endDate: this.endDate
    };
    this.reservationService.createReservation(reservation).subscribe();
  }

}
