import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdvertisementService } from '../services/advertisement.service';
import { Advertisement } from '../shared/advertisement';
import { baseurl } from '../shared/baseurl';

@Component({
  selector: 'app-editad',
  templateUrl: './editad.component.html',
  styleUrls: ['./editad.component.scss']
})
export class EditadComponent implements OnInit {
  imgUrl: string = '/assets/images/upload.png';
  defimg: string = '/assets/images/upload.png';
  fileToUpload: any;

  id: any;
  advertisements: Advertisement[];
  advertisement: any;
  errMsg: string;
  advertisementForm: FormGroup;


  @ViewChild('fform') advertisementFormDirective: NgForm;

  formErrors: any = {
    'advertisementTitle': '',
    'advertisementType': '',
    'advertisementDesc': '',
    'advertisementImageFile': File,
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
    }

  };

  constructor(private _activatedRoute: ActivatedRoute, private _router: Router, private advertisementService: AdvertisementService, private fb: FormBuilder) {

  }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe(params => {
      this.id = params.get('id');
      console.log(this.id);
      this.advertisementService.getAdvertisementsByClientId().subscribe((advertisements) => { this.setAdvertisements(advertisements) }, errMsg => { this.errMsg = errMsg });

    });
  }

  setAdvertisements(advertisements: any): void {
    this.advertisements = advertisements;
    this.advertisement = this.advertisements.find(a => a.advertisementId == this.id);
    this.imgUrl = baseurl + 'Images/Advertisements/' + this.advertisement.advertisementImageName;

    this.createForm();
  }
  getAdvertisement() {

    return this.advertisement;
  }


  createForm(): void {
    this.advertisementForm = this.fb.group({
      advertisementTitle: [this.advertisement.advertisementTitle, [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      advertisementType: [this.advertisement.advertisementType, [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      advertisementDesc: [this.advertisement.advertisementDesc, [Validators.required, Validators.minLength(2)]],
      advertisementImageFile: ['', [Validators.required]]


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
    this.advertisement.advertisementId = this.id;
    this.advertisement.advertisementImageFile = this.fileToUpload;

    console.log(this.fileToUpload);


    this.advertisementService.UpdateAdvertisement(this.advertisement).subscribe((data) => { console.log("upload is done"); this._router.navigate(['/myads']) }, (errMsg) => this.errMsg = errMsg);

    console.log(this.advertisement);

    this.advertisementFormDirective.resetForm();

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
