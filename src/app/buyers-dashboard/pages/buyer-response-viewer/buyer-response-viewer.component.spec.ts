import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerResponseViewerComponent } from './buyer-response-viewer.component';

describe('BuyerResponseViewerComponent', () => {
  let component: BuyerResponseViewerComponent;
  let fixture: ComponentFixture<BuyerResponseViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyerResponseViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyerResponseViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
