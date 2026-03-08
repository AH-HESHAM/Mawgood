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

export const routes: Routes = [
  {
    path: '',
    component: Main,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: Home },
      { path: 'products', component: Body },
      { path: 'addProduct', component: AddProduct, canActivate: [adminGuardGuard] },
      { path: 'updataProduct', component: UpdateProduct, canActivate: [adminGuardGuard] },
      { path: 'deleteProduct', component: DeleteProduct, canActivate: [adminGuardGuard] },
      { path: 'signup', component: Signup },
      { path: 'login', component: Login },
    ],
  },
  { path: '**', component: Error },
];
