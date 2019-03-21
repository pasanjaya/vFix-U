import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponentComponent } from './dashboard-component.component';

describe('DashboardComponentComponent', () => {
  let component: DashboardComponentComponent;
  let fixture: ComponentFixture<DashboardComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
