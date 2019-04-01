import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageDeatilsComponent } from './manage-deatils.component';

describe('ManageDeatilsComponent', () => {
  let component: ManageDeatilsComponent;
  let fixture: ComponentFixture<ManageDeatilsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageDeatilsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageDeatilsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
