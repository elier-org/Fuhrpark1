import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Reservation } from "./reservation";
import { HttpClient} from '@angular/common/http';
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class ReservationService {
    private apiServerUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient) { 

    }

    public getReservations(): Observable<Reservation[]> {
        return this.http.get<Reservation[]>(`${this.apiServerUrl}/reservations`);
    }

    public addReservations(reservation: Reservation): Observable<Reservation[]> {
        return this.http.post<Reservation[]>(`${this.apiServerUrl}/reservations/add`, reservation);
    }
}