import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestCheckoutPage } from './guest-checkout-page';

describe('GuestCheckoutPage', () => {
  let component: GuestCheckoutPage;
  let fixture: ComponentFixture<GuestCheckoutPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuestCheckoutPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuestCheckoutPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
