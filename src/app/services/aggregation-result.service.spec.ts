import { TestBed } from '@angular/core/testing';

import { AggregationResultService } from './aggregation-result.service';

describe('AggregationResultService', () => {
  let service: AggregationResultService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AggregationResultService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
