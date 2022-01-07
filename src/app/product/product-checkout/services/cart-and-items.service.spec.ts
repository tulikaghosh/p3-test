import { TestBed } from '@angular/core/testing';

import { CartAndItemsService } from './cart-and-items.service';

describe('CartAndItemsService', () => {
  let service: CartAndItemsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartAndItemsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
