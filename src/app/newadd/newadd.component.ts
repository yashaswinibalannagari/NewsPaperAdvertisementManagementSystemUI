import { formatDate } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdvertisementService } from '../services/advertisement.service';
import { Advertisement, subPlan } from '../shared/advertisement';
import { adSize } from '../shared/advertisement';
import { SUBSCRIBERS } from '../shared/subscribers';


@Component({
  selector: 'app-newadd',
  templateUrl: './newadd.component.html',
  styleUrls: ['./newadd.component.scss']
})

export class NewaddComponent implements OnInit {

  imgUrl: string = '/assets/images/upload.png';
  defimg: string = '/assets/images/upload.png';
  fileToUpload: any;


  advertisementForm: FormGroup;
  advertisement: Advertisement
  errMsg: any;
  adSize = adSize;
  adsubscribers = SUBSCRIBERS;
  subPlan = subPlan;

  @ViewChild('fform') advertisementFormDirective: NgForm;

  formErrors: any = {
    'advertisementTitle': '',
    'advertisementType': '',
    'advertisementDesc': '',
    'advertisementImageFile': File,
    'advertisementSize': '',
    'subscriber': '',
    'agree': false,
    'subscriptionPlan': '',
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
    ' advertisementImageFile': {
      'required': 'Advertisement ImageFile is required.',
    },
    'advertisementSize': {
      'required': 'Advertisement Size is required.',
    },
    'subscriber': {
      'required': 'Advertisement Size is required.',
    },
    'agree': {
      'requiredTrue': 'Please Agree to terms and conditions',
    },
    ' subscriptionPlan': {
      'required': 'Subscription Plan is required.',
    },

  };

  constructor(private fb: FormBuilder, private _advertisementService: AdvertisementService, private _router: Router) {
    this.createForm();
  }

  ngOnInit(): void {
  }



  createForm(): void {
    this.advertisementForm = this.fb.group({
      advertisementTitle: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      advertisementType: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      advertisementDesc: ['', [Validators.required, Validators.minLength(2)]],
      advertisementImageFile: ['', [Validators.required]],
      advertisementSize: ['', [Validators.required]],
      subscriber: ['', [Validators.required]],
      agree: [false, [Validators.requiredTrue]],
      subscriptionPlan: ['', [Validators.required]]


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
    this.advertisement.advertisementImageFile = this.fileToUpload;

    console.log(this.fileToUpload);

    this.advertisement.advRegisteredDate = formatDate(new Date(), 'dd/MM/yyyy', 'en-US');



    var result = subPlan.find(x => x.name === this.advertisement.subscriptionPlan);

    this.advertisement.subscriptionDays = result.value;


    this._advertisementService.postAdvertisement(this.advertisement).subscribe((data) => { console.log("upload is done"); this.imgUrl = this.defimg }, (errMsg) => this.errMsg = errMsg);

    console.log(this.advertisement);

    this.advertisementFormDirective.resetForm();


    this._router.navigate(['/myads']);




  }

  reloadComponent() {
    let currentUrl = this._router.url;
    this._router.routeReuseStrategy.shouldReuseRoute = () => false;
    this._router.onSameUrlNavigation = 'reload';
    this._router.navigate([currentUrl]);
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

