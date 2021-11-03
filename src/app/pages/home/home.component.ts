import { Component, OnInit } from '@angular/core';
import { Car } from 'src/app/cars/car';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public title = "Fuhrpark Management";

  // public cars!: Car [] = [
  public cars: Car [] = [
    {carId: 0, carName: "Lamborgini Diablo", licensePlate: "L0001", used: false},
    {carId: 1, carName: "Ferrary", licensePlate: "F0001", used: false},
    {carId: 2, carName: "Rollroice", licensePlate: "R0001", used: false},
    {carId: 3, carName: "Audi", licensePlate: "A0001", used: false},
    {carId: 4, carName: "Papamobil", licensePlate: "P0001", used: false}
  ];
  
  constructor() { }

  ngOnInit() {
  }

}
