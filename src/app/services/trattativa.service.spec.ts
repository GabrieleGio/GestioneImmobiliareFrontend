import { TestBed } from '@angular/core/testing';

import { TrattativaService } from './trattativa.service';

describe('TrattativaService', () => {
  let service: TrattativaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrattativaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
