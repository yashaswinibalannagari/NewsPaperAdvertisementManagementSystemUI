import { formatDate } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { AdvertisementService } from '../services/advertisement.service';
import { Advertisement } from '../shared/advertisement';

@Component({
  selector: 'app-newadd',
  templateUrl: './newadd.component.html',
  styleUrls: ['./newadd.component.scss']
})
export class NewaddComponent implements OnInit {




  advertisementForm: FormGroup;
  advertisement: Advertisement
  errMsg: any;

  @ViewChild('fform') advertisementFormDirective: NgForm;

  formErrors: any = {
    'advertisementTitle': '',
    'advertisementType': '',
    'advertisementDesc': '',
    'advertisementImageName': ''
  };


  validationMessages: any = {
    'advertisementTitle': {
      'required': 'Advertisement Title is required.',
      'minlength': 'Advertisement Title must be at least 2 characters long.',
      'maxlength': 'Advertisement Title cannot be more than 25 characters long.'
    },
    'advertisementType': {
      'required': 'Advertisement Type is required.',
      'minlength': 'Advertisement Type must be at least 2 characters long.',
      'maxlength': 'Advertisement Type cannot be more than 25 characters long.'
    },

    'advertisementDesc': {
      'required': 'Advertisement Description is required.',
      'minlength': 'Advertisement Description must be at least 2 characters long.'
    },
    'advertisementImageName': {
      'required': 'Advertisement ImageName is required.',
      'minlength': 'Advertisement ImageName must be at least 2 characters long.',
      'maxlength': 'Advertisement ImageName cannot be more than 25 characters long.'
    },
  };

  constructor(private fb: FormBuilder, private _advertisementService: AdvertisementService) {
    this.createForm();
  }

  ngOnInit(): void {
  }



  createForm(): void {
    this.advertisementForm = this.fb.group({
      advertisementTitle: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      advertisementType: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      advertisementDesc: ['', [Validators.required, Validators.minLength(2)]],
      advertisementImageName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]]

    });

    this.advertisementForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged();
  }


  onValueChanged(data?: any) {
    if (!this.advertisementForm) { return; }
    const form = this.advertisementForm;
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
    this.advertisement = this.advertisementForm.value;
    this.advertisement.advRegistrationDate = formatDate(new Date(), 'dd/MM/yyyy', 'en-US');

    //service
    // this._advertisementService.postAdvertisement(this.advertisement).subscribe(() => { }, (errMsg) => this.errMsg = errMsg);

    console.log(this.advertisement);

    this.advertisementForm.reset(
      {
        advertisementTitle: '',
        advertisementDesc: '',
      }
    );

    this.advertisementFormDirective.resetForm();

  }
}
