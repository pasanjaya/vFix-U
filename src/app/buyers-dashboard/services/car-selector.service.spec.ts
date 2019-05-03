import { TestBed } from '@angular/core/testing';

import { CarSelectorService } from './car-selector.service';

describe('CarSelectorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CarSelectorService = TestBed.get(CarSelectorService);
    expect(service).toBeTruthy();
  });
});
