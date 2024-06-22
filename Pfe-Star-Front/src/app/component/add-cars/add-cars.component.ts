import { Component } from '@angular/core';
import { CarsService } from '../../service/cars.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-cars',
  templateUrl: './add-cars.component.html',
  styleUrls: ['./add-cars.component.css']
})
export class AddCarsComponent {

  car: any = {};
  selectedFile: File | null = null;

  constructor(private carsService: CarsService, private router: Router) {}

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

onSubmit1(): void {
    if (!this.car || !this.selectedFile) {
      console.error('Car details or image file is missing');
      return;
    }

    const formData = new FormData();
    formData.append('vehicule', JSON.stringify(this.car));
    formData.append('image', this.selectedFile, this.selectedFile.name);

    console.log('FormData content:', formData.get('vehicule'), formData.get('image'));

    this.carsService.createVehicule(formData).subscribe(
      response => {
        console.log('Car added successfully', response);
        this.car = {}; 
        this.selectedFile = null; 
        this.router.navigate(['/cars']);
      },
      error => {
        console.error('Error adding car', error);
      }
    );
  } 


    onSubmit(): void {
     

      this.car.agenceName = sessionStorage.getItem('username');
      this.carsService.createVehicule(this.car).subscribe(
        response => {
          console.log('Car added successfully', response);
          this.car = {}; 
          this.selectedFile = null; 
          this.router.navigate(['/cars']);
        },
        error => {
          console.error('Error adding car', error);
        }
      );
    } 
}
