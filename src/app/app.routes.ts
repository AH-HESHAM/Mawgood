import { Routes } from '@angular/router';
import { Main } from './components/main/main';
import { Home } from './components/home/home';
import { Error } from './components/error/error';
import { Body } from './components/body/body';
import { AddProduct } from './forms/add-product/add-product';
import { UpdateProduct } from './forms/update-product/update-product';
import { DeleteProduct } from './forms/delete-product/delete-product';

export const routes: Routes = [
  {
    path: '',
    component: Main,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: Home },
      { path: 'products', component: Body },
      { path: 'addProduct', component: AddProduct },
      { path: 'updataProduct', component: UpdateProduct },
      { path: 'deleteProduct', component: DeleteProduct },
    ],
  },
  { path: '**', component: Error },
];
