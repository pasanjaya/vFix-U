import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingNewArraivalsComponent } from './landing-new-arraivals.component';

describe('LandingNewArraivalsComponent', () => {
  let component: LandingNewArraivalsComponent;
  let fixture: ComponentFixture<LandingNewArraivalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandingNewArraivalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingNewArraivalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
