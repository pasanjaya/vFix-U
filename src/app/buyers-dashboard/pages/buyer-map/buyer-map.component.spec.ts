import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerMapComponent } from './buyer-map.component';

describe('BuyerMapComponent', () => {
  let component: BuyerMapComponent;
  let fixture: ComponentFixture<BuyerMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyerMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyerMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
