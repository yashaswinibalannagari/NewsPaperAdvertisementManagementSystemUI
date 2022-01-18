import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientService } from '../services/client.service';
import { Admin } from '../shared/admin';

@Component({
  selector: 'app-addadmin',
  templateUrl: './addadmin.component.html',
  styleUrls: ['./addadmin.component.scss']
})
export class AddadminComponent implements OnInit {



  adminForm: FormGroup;
  admin: Admin;
  errMsg: any;


  @ViewChild('fform') adminFormDirective: NgForm;

  formErrors: any = {
    'firstName': '',
    'lastName': '',
    'email': '',
    'password': '',
    'confirmPassword': ''
  };


  validationMessages: any = {
    'firstName': {
      'required': 'firstname is required.',
      'minlength': 'firstname must be at least 2 characters long.',
      'maxlength': 'firstname cannot be more than 25 characters long.'
    },
    'lastName': {
      'required': 'lastname is required.',
      'minlength': 'lastname must be at least 2 characters long.',
      'maxlength': 'lastname cannot be more than 25 characters long.'
    },

    'email': {
      'required': 'Email is required.',
      'minlength': 'Email must be at least 2 characters long.'
    },
    ' password': {
      'required': 'Password is required.',
    },
    'confirmPassword': {
      'required': 'Password is required.',
    },


  };

  constructor(private fb: FormBuilder, private _router: Router, private _clientService: ClientService) {
    this.createForm();
  }

  ngOnInit(): void {
  }



  createForm(): void {
    this.adminForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      lastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      email: ['', [Validators.required, Validators.minLength(2)]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],

    });

    this.adminForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged();
  }



  onValueChanged(data?: any) {
    if (!this.adminForm) { return; }
    const form = this.adminForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';

        const control = form.get(field);

        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }




  onSubmit(): void {
    this.admin = this.adminForm.value;

    console.log(this.admin);



    // this._advertisementService.postAdvertisement(this.advertisement).subscribe((data) => { console.log("upload is done"); this.imgUrl = this.defimg }, (errMsg) => this.errMsg = errMsg);

    this._clientService.createAdmin(this.admin).subscribe((data) => { console.log("admin created successfully"); }, (errMsg) => { this.errMsg = errMsg });

    this.adminFormDirective.resetForm();


    this._router.navigate(['/home']);




  }



}
