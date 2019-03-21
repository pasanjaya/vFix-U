import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerNavbarComponentComponent } from './buyer-navbar-component.component';

describe('BuyerNavbarComponentComponent', () => {
  let component: BuyerNavbarComponentComponent;
  let fixture: ComponentFixture<BuyerNavbarComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyerNavbarComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyerNavbarComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
