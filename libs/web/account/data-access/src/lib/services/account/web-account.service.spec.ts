import { TestBed } from '@angular/core/testing';
import { Apollo } from 'apollo-angular';

import { WebAccountService } from './web-account.service';

describe('WebAccountService', () => {
  let service: WebAccountService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: Apollo,
          useValue: {
            watchQuery: jest.fn(() => ({
              valueChanges: jest.fn(),
            })),
          },
        },
      ],
    });
    service = TestBed.inject(WebAccountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
