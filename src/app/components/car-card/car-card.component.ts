import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Car } from 'src/app/cars/car';
@Component({
  selector: 'app-car-card',
  templateUrl: './car-card.component.html',
  styleUrls: ['./car-card.component.scss']
})
export class CarCardComponent implements OnInit {
  
  @Input() car:Car;

  constructor(private router:Router) { }

  ngOnInit() {
  }

  public goToBookcar($event, car){
    if(!car.used){
      this.router.navigate(['/bookcar/' + car.carId]);
    }
  }

}
