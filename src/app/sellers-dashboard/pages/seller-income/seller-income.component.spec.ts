import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerIncomeComponent } from './seller-income.component';

describe('SellerIncomeComponent', () => {
  let component: SellerIncomeComponent;
  let fixture: ComponentFixture<SellerIncomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerIncomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerIncomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
