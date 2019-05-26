import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteConfirmationBoxComponent } from './delete-confirmation-box.component';

describe('DeleteConfirmationBoxComponent', () => {
  let component: DeleteConfirmationBoxComponent;
  let fixture: ComponentFixture<DeleteConfirmationBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteConfirmationBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteConfirmationBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
