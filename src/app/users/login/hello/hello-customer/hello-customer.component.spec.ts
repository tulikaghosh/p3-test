import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelloCustomerComponent } from './hello-customer.component';

describe('HelloCustomerComponent', () => {
  let component: HelloCustomerComponent;
  let fixture: ComponentFixture<HelloCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HelloCustomerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HelloCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
