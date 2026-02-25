import { TestBed } from '@angular/core/testing';

import { StaticData } from './static-data';

describe('StaticData', () => {
  let service: StaticData;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StaticData);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
