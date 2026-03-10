import { IProducts } from './iproducts';

export interface ICartItem extends IProducts {
  quantity: number;
}
