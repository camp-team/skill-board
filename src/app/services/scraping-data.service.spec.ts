import { TestBed } from '@angular/core/testing';

import { ScrapingDataService } from './scraping-data.service';

describe('ScrapingDataService', () => {
  let service: ScrapingDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScrapingDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
