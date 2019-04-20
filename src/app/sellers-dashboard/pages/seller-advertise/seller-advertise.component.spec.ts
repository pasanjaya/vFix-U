import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerAdvertiseComponent } from './seller-advertise.component';

describe('SellerAdvertiseComponent', () => {
  let component: SellerAdvertiseComponent;
  let fixture: ComponentFixture<SellerAdvertiseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerAdvertiseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerAdvertiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
