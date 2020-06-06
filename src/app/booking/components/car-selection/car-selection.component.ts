import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validator, FormBuilder, Validators } from '@angular/forms';
import { CarServiceService } from 'src/app/shared/services/car-service.service';
import { CarDetails, Car } from 'src/app/shared/models/Car'
import { UserData } from 'src/app/shared/models/UserData';

@Component({
  selector: 'app-car-selection',
  templateUrl: './car-selection.component.html',
  styleUrls: ['./car-selection.component.scss']
})
export class CarSelectionComponent implements OnInit {

  constructor(private _router: Router, private fb: FormBuilder, private carservice: CarServiceService) { }

  showModal: Boolean = false;
  carDetailsForm: FormGroup
  carList
  userdetails: UserData


  ngOnInit(): void {
    this.userdetails = JSON.parse(localStorage.getItem('UserDetails'));
    console.log(this.userdetails.Email)
    this.getAllCars();
    this.carDetailsForm = this.fb.group({
      Model: ['', Validators.required],
      BrandName: ['', Validators.required],
      RegistrationNo: ['', [Validators.required, Validators.maxLength(10)]]
    });
  }


  carSelected(id: number) {
    console.log(`Selected Item: ${id}`);
    this.userdetails.CarId = id;
    localStorage.setItem('UserDetails', JSON.stringify(this.userdetails));
    this._router.navigate(['../booking/packageSelection']);
  }

  closeModal() {
    this.showModal = false;
    this.carDetailsForm.reset();
  }


  getAllCars() {
    let usercar: CarDetails = {
      RegistrationNo: "",
      BrandName: "",
      Model: "",
      Email: this.userdetails.Email
    }
    console.log(usercar)
    this.carservice.getCars(usercar).subscribe(
      data => {
        this.carList = data;
        console.table(data);
      },
      error => {
        console.log('Error is :' + JSON.stringify(error))
      })
  }

  addCar() {
    let car: CarDetails = this.carDetailsForm.value;
    car.Email = this.userdetails.Email;
    console.log(car)
    this.carservice.addCar(car).subscribe(
      data => {
        alert("Added the car!")
        this.getAllCars();
      },
      error => {
        console.log('Error is : ' + JSON.stringify(error))
      })
    this.showModal = false;
    this.carDetailsForm.reset();
  }
}
