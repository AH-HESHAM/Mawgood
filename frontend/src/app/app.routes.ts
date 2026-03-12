import { Routes } from '@angular/router';
import { Main } from './components/main/main';
import { Home } from './components/home/home';
import { Error } from './components/error/error';
import { Body } from './components/body/body';
import { AddProduct } from './forms/add-product/add-product';
import { Signup } from './forms/signup-form/signup-form';
import { adminGuardGuard } from './guards/admin-guard-guard';
import { Login } from './forms/login/login';
import { authGuard } from './guards/auth-guard';
import { CartPage } from './components/cart/cart-page/cart-page';
import { AdminPortal } from './components/admin-portal/admin-portal';
import { EditProduct } from './forms/edit-product/edit-product';
import { Payment } from './services/payment';
import { PaymentSuccess } from './components/payment-success/payment-success';
import { PaymentCancel } from './components/payment-cancel/payment-cancel';
import { UserCheckoutPage } from './components/checkout/user-checkout-page';

export const routes: Routes = [
  /* Pages WITHOUT layout */
  { path: 'login', component: Login },
  { path: 'signup', component: Signup },

  /* Pages WITH layout */
  {
    path: '',
    component: Main,
    children: [
      // exposed home and products to allow for guest checkout
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: Home },
      { path: 'products', component: Body, canActivate: [authGuard] },
      { path: 'add-product', component: AddProduct, canActivate: [authGuard] },

      { path: 'edit-product/:id', component: EditProduct, canActivate: [authGuard] },
      { path: 'admin-portal', component: AdminPortal, canActivate: [authGuard, adminGuardGuard] },
      { path: 'cart', component: CartPage },
      { path: 'payment-success', component: PaymentSuccess },
      { path: 'payment-cancel', component: PaymentCancel },
      { path: 'checkout', component: UserCheckoutPage },
    ],
  },

  { path: '**', component: Error },
];
