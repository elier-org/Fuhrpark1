import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient} from '@angular/common/http';
import { environment } from "src/environments/environment";
import { Car } from "./car";

@Injectable({
    providedIn: 'root'
})
export class CarService {
    private apiServerUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient) { 

    }

    public getAllCars(): Observable<Car[]> {
        return this.http.get<Car[]>(`${this.apiServerUrl}/cars`);
    }

    public getSingleCar(): Observable<Car []> {
        return this.http.get<Car []>(`${this.apiServerUrl}/{car}`);
    }
}