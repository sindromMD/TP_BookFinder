import { TestBed } from '@angular/core/testing';

import { FavorisStorageService } from './favoris-storage.service';

describe('FavorisStorageService', () => {
  let service: FavorisStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavorisStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
