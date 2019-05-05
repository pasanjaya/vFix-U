import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { CarSelectorService } from '../../services/car-selector.service';
import { AdminConfigureService } from './../../../admin-dashboard/pages/admin-configuration/admin-configure.service';
import { MessageRequestService } from './../../services/message-request.service';

import { CategoryData } from './../../../admin-dashboard/pages/admin-configuration/models/category-data.model';
import { mimeType } from './mime-type.validator';

@Component({
  selector: 'app-dashboard-component',
  templateUrl: './buyer-dashboard.component.html',
  styleUrls: ['./buyer-dashboard.component.scss']
})
export class BuyerDashboardComponent implements OnInit, OnDestroy {
  makers = [];
  models = [];
  categories: CategoryData[] = [];
  selectedMaker = 'Audi';
  selectedModel = '2009 Audi A3 3.2';
  selectedCategory: string;
  imagePreview: string;

  private categorySub: Subscription;

  partFindForm: FormGroup;

  constructor(
    private carSelectorService: CarSelectorService,
    private adminConfigureService: AdminConfigureService,
    private messageRequestService: MessageRequestService
  ) {}

  ngOnInit() {
    this.partFindForm = new FormGroup({
      maker: new FormControl(this.selectedMaker, Validators.required),
      model: new FormControl(this.selectedModel, Validators.required),
      category: new FormControl(null, Validators.required),
      sparePartName: new FormControl(null),
      partImage: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType]
      }),
      note: new FormControl(null)
    });

    this.carSelectorService.getVehicleDataJSON();
    this.makers = this.carSelectorService.getVehicleMakers();
    this.models = this.carSelectorService.getVehicleModel(this.selectedMaker);

    this.adminConfigureService.getCategories();
    this.categorySub = this.adminConfigureService
      .getCategoryUpdatedListener()
      .subscribe((categories: CategoryData[]) => {
        this.categories = categories;
      });
  }

  ngOnDestroy() {
    this.categorySub.unsubscribe();
  }

  changeMaker() {
    this.selectedMaker = this.partFindForm.get('maker').value;
    this.models = [];
    this.models = this.carSelectorService.getVehicleModel(this.selectedMaker);
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.partFindForm.patchValue({ partImage: file });
    this.partFindForm.get('partImage').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  get maker() {
    return this.partFindForm.get('maker');
  }

  get model() {
    return this.partFindForm.get('model');
  }

  get category() {
    return this.partFindForm.get('category');
  }

  get sparePartName() {
    return this.partFindForm.get('sparePartName');
  }

  get image() {
    return this.partFindForm.get('partImage');
  }

  get note() {
    return this.partFindForm.get('note');
  }

  onFindMyItem() {
    if (this.partFindForm.invalid) {
      return;
    }
    this.messageRequestService.createRequest(
      this.maker.value,
      this.model.value,
      this.category.value,
      this.sparePartName.value,
      this.image.value,
      this.note.value
    );
    this.partFindForm.reset();
  }
}
