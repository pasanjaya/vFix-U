import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { mimeType } from '../../../validators/mime-type.validator';

import { SellerAdvertisementService } from '../../services/seller-advertisement.service';
import { AdvertisementData } from 'src/app/models/advertisement-data.model';

import { DeleteConfirmationBoxComponent } from 'src/app/shared/delete-confirmation-box/delete-confirmation-box.component';

@Component({
  selector: 'app-seller-advertise',
  templateUrl: './seller-advertise.component.html',
  styleUrls: ['./seller-advertise.component.scss']
})
export class SellerAdvertiseComponent implements OnInit, OnDestroy {
  isInvalid = false;
  isLoading = false;
  mode = 'create';
  editingAdv = '';
  advImagePreviewPath: string;
  advertisingForm: FormGroup;

  advertisements: AdvertisementData[] = [];
  private advertisementSub: Subscription;

  constructor(
    private sellerAdvertisementService: SellerAdvertisementService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.advertisingForm = new FormGroup({
      title: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      advImage: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType]
      })
    });

    // retrive advertiesment data
    this.isLoading = true;
    this.sellerAdvertisementService.getAdvertisements();
    this.advertisementSub = this.sellerAdvertisementService
      .getAdvertisementUpadateListener()
      .subscribe((advertisements: AdvertisementData[]) => {
        this.advertisements = advertisements;
        this.isLoading = false;
      });
  }

  onAdvImageUpload(event: Event) {
    const image = (event.target as HTMLInputElement).files[0];
    this.advertisingForm.patchValue({ advImage: image });
    this.advertisingForm.get('advImage').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.advImagePreviewPath = reader.result as string;
    };
    reader.readAsDataURL(image);
  }

  get title() {
    return this.advertisingForm.get('title');
  }

  get description() {
    return this.advertisingForm.get('description');
  }

  get advImage() {
    return this.advertisingForm.get('advImage');
  }

  onPublish() {
    if (this.advertisingForm.invalid) {
      console.log(this.advertisingForm);
      this.isInvalid = true;
      return;
    }
    this.isInvalid = false;
    if (this.mode === 'create') {
      console.log(this.advertisingForm);
      this.sellerAdvertisementService.createAdvertisment(
        this.title.value,
        this.description.value,
        this.advImage.value
      );
      this.advertisingForm.reset();
    }
    if (this.mode === 'edit') {
      console.log(this.advertisingForm);
      this.sellerAdvertisementService.updateAdvertisement(
        this.editingAdv,
        this.title.value,
        this.description.value,
        this.advImage.value
      );
      console.log(this.editingAdv);
      this.advertisingForm.reset();
    }
  }
  // edit advertisement
  editAdv(index: number) {
    this.mode = 'edit';
    const doc = this.advertisements[index];
    this.editingAdv = doc.id;
    console.log(doc);

    this.advertisingForm.setValue({
      title: doc.title,
      description: doc.description,
      advImage: doc.advertisementPath
    });
    this.advImagePreviewPath = this.advertisements[index].advertisementPath;
  }

  // delete advertisements
  deleteAdv(id: string) {
    this.sellerAdvertisementService.deleteAdvertisement(id);
  }

  openDialog(id: string): void {
    const dialogRef = this.dialog.open(DeleteConfirmationBoxComponent, {
      width: '350px',
      data: 'Do you confirm the deletion of this advertisement?'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Yes clicked');
        this.deleteAdv(id);
      }
    });
  }

  ngOnDestroy() {
    this.advertisementSub.unsubscribe();
  }

}
