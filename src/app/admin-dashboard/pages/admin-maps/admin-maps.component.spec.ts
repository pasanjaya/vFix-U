import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMapsComponent } from './admin-maps.component';

describe('AdminMapsComponent', () => {
  let component: AdminMapsComponent;
  let fixture: ComponentFixture<AdminMapsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminMapsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminMapsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
