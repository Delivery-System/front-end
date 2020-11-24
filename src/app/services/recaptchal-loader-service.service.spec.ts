import { TestBed } from '@angular/core/testing';

import { RecaptchalLoaderServiceService } from './recaptchal-loader-service.service';

describe('RecaptchalLoaderServiceService', () => {
  let service: RecaptchalLoaderServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecaptchalLoaderServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
