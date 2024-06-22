import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  private apiUrl = 'http://localhost:8082/api/locations';

  constructor(private http: HttpClient) {}

  checkAvailability(carId: number, startDate: string, endDate: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/check?carId=${carId}&startDate=${startDate}&endDate=${endDate}`);
  }

  createReservation(reservation: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, reservation);
  }
}
