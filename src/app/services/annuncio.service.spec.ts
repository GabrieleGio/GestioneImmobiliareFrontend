import { TestBed } from '@angular/core/testing';

import { AnnuncioService } from './annuncio.service';

describe('AnnuncioService', () => {
  let service: AnnuncioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnnuncioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
