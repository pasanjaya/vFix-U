import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAdvertisementsComponent } from './admin-advertisements.component';

describe('AdminAdvertisementsComponent', () => {
  let component: AdminAdvertisementsComponent;
  let fixture: ComponentFixture<AdminAdvertisementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAdvertisementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAdvertisementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
