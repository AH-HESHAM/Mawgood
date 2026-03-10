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
import { AdminPortal } from './components/admin-portal/admin-portal';

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
      { path: 'updateProduct', component: UpdateProduct, canActivate: [authGuard, adminGuardGuard] },
      { path: 'deleteProduct', component: DeleteProduct, canActivate: [authGuard, adminGuardGuard] },
      { path: 'admin-portal', component: AdminPortal, canActivate: [authGuard, adminGuardGuard] },
    ]
  },

  { path: '**', component: Error }

];