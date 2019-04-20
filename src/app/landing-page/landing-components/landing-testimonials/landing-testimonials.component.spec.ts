import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingTestimonialsComponent } from './landing-testimonials.component';

describe('LandingTestimonialsComponent', () => {
  let component: LandingTestimonialsComponent;
  let fixture: ComponentFixture<LandingTestimonialsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandingTestimonialsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingTestimonialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
