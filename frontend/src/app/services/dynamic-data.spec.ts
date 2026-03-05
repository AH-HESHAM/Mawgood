import { TestBed } from '@angular/core/testing';

import { DynamicData } from './dynamic-data';

describe('DynamicData', () => {
  let service: DynamicData;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DynamicData);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
