import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerSidebarComponentComponent } from './buyer-sidebar-component.component';

describe('BuyerSidebarComponentComponent', () => {
  let component: BuyerSidebarComponentComponent;
  let fixture: ComponentFixture<BuyerSidebarComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyerSidebarComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyerSidebarComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
