import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validator, FormBuilder, Validators } from '@angular/forms';
import { CarServiceService } from 'src/app/shared/services/car-service.service';
import { CarDetails, Car } from 'src/app/shared/models/Car'

@Component({
  selector: 'app-car-selection',
  templateUrl: './car-selection.component.html',
  styleUrls: ['./car-selection.component.scss']
})
export class CarSelectionComponent implements OnInit {

  constructor(private _router: Router, private fb : FormBuilder, private carservice : CarServiceService) { }

  showModal : Boolean = false;
  carDetailsForm : FormGroup
  carList 

   
  ngOnInit(): void {

    console.log(localStorage.getItem('UserEmail'))
    this.getAllCars();
    this.carDetailsForm = this.fb.group({
      Model: ['',Validators.required],
      BrandName : ['', Validators.required],
      RegistrationNo : ['',[Validators.required, Validators.maxLength(10)]]
    });
  }


  carSelected(name: String) {
    console.log(`Selected Item: ${name}`);
    this._router.navigate(['../booking/packageSelection']);
  }

  closeModal(){
    this.showModal = false;
    this.carDetailsForm.reset();
  }


  getAllCars(){ 
    let usercar : CarDetails = {
      RegistrationNo : "",
      BrandName : "",
      Model : "",
      Email : localStorage.getItem('UserEmail')
    }
      console.log(usercar)
      this.carservice.getCars(usercar).subscribe(
        data => {
          this.carList = data;
          console.log(data)
        })
  }

  addCar(){
    let car : CarDetails = this.carDetailsForm.value;
    car.Email = localStorage.getItem('UserEmail');
    console.log(car)
    this.carservice.addCar(car).subscribe(
      data => {
        alert("Added the car!!")
        this.getAllCars();
      }
    )
    this.showModal = false;
    this.carDetailsForm.reset();
  }


}
