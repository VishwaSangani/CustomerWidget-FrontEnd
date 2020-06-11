import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validator, FormBuilder, Validators } from '@angular/forms';
import { CarServiceService } from 'src/app/shared/services/car-service.service';
import { CarDetails, Car } from 'src/app/shared/models/Car'
import { UserData } from 'src/app/shared/models/UserData';
import { MatSnackBar,MatSnackBarHorizontalPosition,MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

 
@Component({
  selector: 'app-car-selection',
  templateUrl: './car-selection.component.html',
  styleUrls: ['./car-selection.component.scss']
})
export class CarSelectionComponent implements OnInit {

  constructor(private _router: Router, private fb: FormBuilder, private carservice: CarServiceService, private _snackbar : MatSnackBar ) { }

  showModal: Boolean = false;
  showEditModal: Boolean = false;
  carDetailsForm: FormGroup
  carList
  userdetails: UserData


  ngOnInit(): void {
    this.userdetails = JSON.parse(localStorage.getItem('UserDetails'));
    console.log(this.userdetails.Email)
    this.getAllCars();
    this.carDetailsForm = this.fb.group({
      CarId: null ,
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
    this.showEditModal = false;
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
        this.openSnackbar(JSON.stringify(error.error))
      })
  }

  addCar() {
    let car: CarDetails = this.carDetailsForm.value;
    car.Email = this.userdetails.Email;
    console.log(car)
    this.carservice.addCar(car).subscribe(
      data => {
        this.openSnackbar("Added the car!")
        this.getAllCars();
      },
      error => {
        this.openSnackbar(error.error)
      })
    this.showModal = false;
    this.carDetailsForm.reset();
  }

  getCar(id)
  {
    this.showEditModal = true;
console.log(id);
// let car: CarDetails = this.carDetailsForm.value;
// car.Email = this.userdetails.Email;
// console.log(car)
this.carservice.getCar(id).subscribe(
  data => {
    console.log("DATA: "+ data[0].Model)
    this.carDetailsForm.controls.CarId.setValue(data[0].CarId);
    this.carDetailsForm.controls.Model.setValue(data[0].Model);
    this.carDetailsForm.controls.BrandName.setValue(data[0].BrandName);
    this.carDetailsForm.controls.RegistrationNo.setValue(data[0].RegistrationNo);
  },
  error => {
    this.openSnackbar(error.error)
  })
this.showModal = false;
this.carDetailsForm.reset();
  }

  updateCar()
  {
    let id =  this.carDetailsForm.controls.CarId.value;
      let car: CarDetails = this.carDetailsForm.value;
    console.log(car)
    this.carservice.UpdateCar(id,car).subscribe(
      data => {
        this.openSnackbar("Car Details Updated Successfully!")
        this.getAllCars();
      },
      error => {
        this.openSnackbar(error.error)
      })
    this.showEditModal = false;
    this.carDetailsForm.reset();
  }

  openSnackbar(message:string){
      this._snackbar.open(message,null,{
        duration: 5000,
        horizontalPosition:'center',
        verticalPosition:'bottom',
      });
  }
}
