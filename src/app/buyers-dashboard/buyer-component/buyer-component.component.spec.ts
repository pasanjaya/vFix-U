import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerComponentComponent } from './buyer-component.component';

describe('BuyerComponentComponent', () => {
  let component: BuyerComponentComponent;
  let fixture: ComponentFixture<BuyerComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyerComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyerComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
