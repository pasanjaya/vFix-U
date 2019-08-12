import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerDeliveryOptionComponent } from './buyer-delivery-option.component';

describe('BuyerDeliveryOptionComponent', () => {
  let component: BuyerDeliveryOptionComponent;
  let fixture: ComponentFixture<BuyerDeliveryOptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyerDeliveryOptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyerDeliveryOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
