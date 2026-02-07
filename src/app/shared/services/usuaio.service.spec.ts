import { TestBed } from '@angular/core/testing';

import { UsuaioService } from './usuaio-service';

describe('UsuaioService', () => {
  let service: UsuaioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsuaioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
