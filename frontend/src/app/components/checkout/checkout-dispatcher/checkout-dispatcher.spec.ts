import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutDispatcher } from './checkout-dispatcher';

describe('CheckoutDispatcher', () => {
  let component: CheckoutDispatcher;
  let fixture: ComponentFixture<CheckoutDispatcher>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckoutDispatcher]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckoutDispatcher);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
