import { TestBed } from '@angular/core/testing';

import { RandonneurServService } from './randonneur-serv.service';

describe('RandonneurServService', () => {
  let service: RandonneurServService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RandonneurServService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
