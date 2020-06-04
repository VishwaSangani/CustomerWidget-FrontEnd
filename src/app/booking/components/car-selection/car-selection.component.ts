import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validator, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-car-selection',
  templateUrl: './car-selection.component.html',
  styleUrls: ['./car-selection.component.scss']
})
export class CarSelectionComponent implements OnInit {

  constructor(private _router: Router, private fb : FormBuilder) { }

  showModal : Boolean = false;
  carDetailsForm : FormGroup


  carList = [
    {
      name: 'Hummer H1',
      number: 'GJ18FC1573'
    },
    {
      name: 'Hummer H2',
      number: 'GJ18FC1353'
    },
    {
      name: 'Hummer H3',
      number: 'GJ18FC1263'
    },
    {
      name: 'Hummer H3',
      number: 'GJ18FC1263'
    }
  ];
  ngOnInit(): void {
    this.carDetailsForm = this.fb.group({
      carName: ['',Validators.required],
      carBrand : ['', Validators.required],
      carNumber : ['',[Validators.required, Validators.maxLength(10)]]
    });
    console.log(localStorage.getItem('UserDetails'));
  }


  carSelected(name: String) {
    console.log(`Selected Item: ${name}`);
    this._router.navigate(['../booking/packageSelection']);
  }

  closeModal(){
    this.showModal = false;
    this.carDetailsForm.reset();
  }
}
