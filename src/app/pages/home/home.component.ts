import { Component, OnInit } from '@angular/core';
import { Car } from 'src/app/cars/car';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  model: NgbDateStruct;

  public title = "Fuhrpark Management";

  // public cars!: Car [] = [
  public cars: Car [] = [
    {carId: 0, carName: "Lamborgini Diablo", licensePlate: "L0001", used: false,  imageName: "lamborgini"},
    {carId: 1, carName: "Ferrary", licensePlate: "F0001", used: false,  imageName: "ferrari"},
    {carId: 2, carName: "Rolls-Royce", licensePlate: "R0001", used: true,  imageName: "rolls-royce"},
    {carId: 3, carName: "Audi", licensePlate: "A0001", used: false,  imageName: "audi"},
    {carId: 4, carName: "Papamobil", licensePlate: "P0001", used: false,  imageName: "papamobil"}
  ];
  
  constructor(private router:Router) { }

  ngOnInit() {
  }

  public bookcar($event, car){
    if(!car.used){
      this.router.navigate(['/bookcar/' + car.carId]);
      // console.log(car);
    }
  }

}
