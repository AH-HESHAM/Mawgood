import { IProducts } from './iproducts';

export interface DataGetter {
  getData(): IProducts[];
}
