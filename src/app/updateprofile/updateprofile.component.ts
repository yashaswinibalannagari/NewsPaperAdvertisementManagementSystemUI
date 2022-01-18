import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientService } from '../services/client.service';
import { baseurl } from '../shared/baseurl';
import { Client } from '../shared/client';

@Component({
  selector: 'app-updateprofile',
  templateUrl: './updateprofile.component.html',
  styleUrls: ['./updateprofile.component.scss']
})
export class UpdateprofileComponent implements OnInit {

  imgUrl: string = '/assets/images/upload.png';
  defimg: string = '/assets/images/upload.png';
  fileToUpload: any;

  profile: Client;
  profileForm: FormGroup;
  errMsg: any;
  @ViewChild('fform') profileFormDirective: NgForm;

  formErrors: any = {
    firstName: '',
    lastName: '',
    address: '',
    mobileNumber: '',
    profileImageFile: ''
  };


  validationMessages: any = {
    'firstName': {
      'required': 'FirstName is required.',
      'minlength': 'FirstName must be at least 2 characters long.',
      'maxlength': 'FirstName cannot be more than 25 characters long.'
    },
    'lastName': {
      'required': 'LastName is required.',
      'minlength': 'LastName must be at least 2 characters long.',
      'maxlength': 'LastName cannot be more than 25 characters long.'
    },

    'address': {
      'required': 'Adress is required.',
      'minlength': 'Adress must be at least 2 characters long.'
    },
    'mobileNumber': {
      'required': 'MobileNumber is required.',
    },
    'profileImageFile': {
      'required': 'profile ImageFile is required.',
    }
  };

  constructor(private fb: FormBuilder, private _clientService: ClientService, private _router: Router) {

  }

  ngOnInit(): void {
    this._clientService.getClientInfo().subscribe((client) => { this.setClient(client) }, (errMsg) => { this.errMsg = errMsg });
  }

  setClient(client: any): void {
    this.profile = client;
    console.log(this.profile);

    if (this.profile.profileImageName == null) {
      this.imgUrl = "/assets/images/upload.png";
    }

    else {
      this.imgUrl = baseurl + 'Images/Clients/' + this.profile.profileImageName;
    }

    console.log(this.imgUrl);
    this.createForm();

  }



  createForm(): void {
    this.profileForm = this.fb.group({
      firstName: [this.profile.firstName, [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      lastName: [this.profile.lastName, [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      address: [this.profile.address, [Validators.required, Validators.minLength(2)]],
      mobileNumber: [this.profile.mobileNumber, Validators.required],
      profileImageFile: ['', [Validators.required]],
    });

    this.profileForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged();
  }


  onValueChanged(data?: any) {
    if (!this.profileForm) { return; }
    const form = this.profileForm;
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
    this.profile = this.profileForm.value;
    this.profile.profileIamgeFile = this.fileToUpload;

    console.log(this.fileToUpload);

    this._clientService.updateProfile(this.profile).subscribe((data) => { console.log("update profile is done"); this.imgUrl = this.defimg }, (errMsg) => { this.errMsg = errMsg });


    // this._advertisementService.postAdvertisement(this.pro).subscribe((data) => { console.log("upload is done"); this.imgUrl = this.defimg }, (errMsg) => this.errMsg = errMsg);

    console.log(this.profile);

    this.profileFormDirective.resetForm();

    this._router.navigate(['/home']);



  }

  handleFileInput(event: any) {
    const file: FileList = event.target.files;

    this.fileToUpload = file.item(0);

    var reader = new FileReader();

    reader.onload = (event: any) => {
      this.imgUrl = event.target.result;
    }

    reader.readAsDataURL(this.fileToUpload);
  }

}

