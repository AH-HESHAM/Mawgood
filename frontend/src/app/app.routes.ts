import { Routes } from '@angular/router';
import { Main } from './components/main/main';
import { Home } from './components/home/home';
import { Error } from './components/error/error';
import { Body } from './components/body/body';
import { AddProduct } from './forms/add-product/add-product';
import { UpdateProduct } from './forms/update-product/update-product';
import { DeleteProduct } from './forms/delete-product/delete-product';
import { Signup } from './forms/signup-form/signup-form';
import { adminGuardGuard } from './guards/admin-guard-guard';
import { Login } from './forms/login/login';
import { authGuard } from './guards/auth-guard';
import { CartPage } from './components/cart/cart-page/cart-page';
import { GuestCheckoutPage } from './components/checkout/guest-checkout-page/guest-checkout-page';
import { UserCheckoutPage } from './components/checkout/user-checkout-page/user-checkout-page';

export const routes: Routes = [
  /* Pages WITHOUT layout */
  { path: 'login', component: Login },
  { path: 'signup', component: Signup },

  /* Pages WITH layout */
  {
    path: '',
    component: Main,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: Home, canActivate: [authGuard] },
      { path: 'products', component: Body, canActivate: [authGuard] },
      { path: 'addProduct', component: AddProduct, canActivate: [authGuard, adminGuardGuard] },
      {
        path: 'updataProduct',
        component: UpdateProduct,
        canActivate: [authGuard, adminGuardGuard],
      },
      {
        path: 'deleteProduct',
        component: DeleteProduct,
        canActivate: [authGuard, adminGuardGuard],
      },
      { path: 'cart', component: CartPage },
      {
        path: 'checkout',
        children: [
          { path: 'user', component: UserCheckoutPage },
          { path: 'guest', component: GuestCheckoutPage },
        ],
      },
    ],
  },

  { path: '**', component: Error },
];
