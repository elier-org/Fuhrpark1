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
  @Input() dateRange;

  constructor(private router:Router) { }

  ngOnInit() {
  }

  public goToBookcar($event, car){
    if(!car.used){
      this.router.navigateByUrl('/bookcar/' + car.carId,
      { state: { dateRange: this.dateRange } } );//{ fromDate: this.dateRange["fromDate"], toDate: this.dateRange["toDate"] }
    }
  }

}
