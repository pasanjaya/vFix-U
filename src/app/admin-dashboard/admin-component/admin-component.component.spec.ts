import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminComponentComponent } from './admin-component.component';

describe('AdminComponentComponent', () => {
  let component: AdminComponentComponent;
  let fixture: ComponentFixture<AdminComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
