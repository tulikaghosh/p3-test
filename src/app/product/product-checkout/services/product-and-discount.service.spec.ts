import { TestBed } from '@angular/core/testing';

import { ProductAndDiscountService } from './product-and-discount.service';

describe('ProductAndDiscountService', () => {
  let service: ProductAndDiscountService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductAndDiscountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
