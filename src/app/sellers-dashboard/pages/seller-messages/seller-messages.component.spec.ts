import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerMessagesComponent } from './seller-messages.component';

describe('SellerMessagesComponent', () => {
  let component: SellerMessagesComponent;
  let fixture: ComponentFixture<SellerMessagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerMessagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
