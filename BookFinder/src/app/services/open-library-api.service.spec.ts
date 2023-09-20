import { TestBed } from '@angular/core/testing';

import { OpenLibraryAPIService } from './open-library-api.service';

describe('OpenLibraryAPIService', () => {
  let service: OpenLibraryAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpenLibraryAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
