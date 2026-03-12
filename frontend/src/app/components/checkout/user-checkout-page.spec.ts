import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCheckoutPage } from './user-checkout-page/user-checkout-page';

describe('UserCheckoutPage', () => {
  let component: UserCheckoutPage;
  let fixture: ComponentFixture<UserCheckoutPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserCheckoutPage],
    }).compileComponents();

    fixture = TestBed.createComponent(UserCheckoutPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
