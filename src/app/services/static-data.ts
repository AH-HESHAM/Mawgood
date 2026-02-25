import { Injectable } from '@angular/core';
import { IProducts } from '../models/iproducts';
import { JsonDataGetter } from '../models/json-data-getter';

@Injectable({
  providedIn: 'root',
})
export class StaticData {
  productsList: IProducts[];

  constructor() {
    const stored = localStorage.getItem('products');

    if (stored) {
      this.productsList = JSON.parse(stored);
    } else {
      this.productsList = new JsonDataGetter().getData();
      this.saveToStorage();
    }
  }

  private saveToStorage(): void {
    localStorage.setItem('products', JSON.stringify(this.productsList));
  }

  getAllProducts(): IProducts[] {
    return this.productsList;
  }

  getProductById(id: number): IProducts | null {
    let product = this.productsList.filter((product) => product.id == +id).at(0);
    if (product !== undefined) return product;
    else return null;
  }

  filterProducts(
    category: string = 'all',
    text: string = '',
    minPrice: number = 0,
    maxPrice: number = Number.MAX_VALUE,
  ): IProducts[] {
    let filteredList = this.filterByCategory(category);
    filteredList = this.filterByText(text, filteredList);
    filteredList = this.filterByPrice(minPrice, maxPrice, filteredList);
    return filteredList;
  }

  private filterByCategory(category: string): IProducts[] {
    if (category === 'all') return this.productsList;
    else return this.productsList.filter((product) => product.category === category);
  }

  private filterByText(text: string, filteredList: IProducts[]): IProducts[] {
    if (text.trim() !== '') {
      filteredList = filteredList.filter((product) => {
        return (
          product.title.toLowerCase().includes(text.toLowerCase()) ||
          product.description.toLocaleLowerCase().includes(text.toLocaleLowerCase())
        );
      });
    }
    return filteredList;
  }

  private filterByPrice(
    minPrice: number,
    maxPrice: number,
    filteredList: IProducts[],
  ): IProducts[] {
    filteredList = filteredList.filter((product) => {
      return product.price >= +minPrice && product.price <= +maxPrice;
    });

    return filteredList;
  }

  post(newProduct: IProducts): void {
    this.productsList.push(newProduct);
    this.saveToStorage();
  }

  update( updates: Partial<IProducts>): void {
    const index = this.productsList.findIndex((p) => p.id === updates.id);
    if (index !== -1) {
      const existingProduct = this.productsList[index];
      const cleanUpdates = Object.fromEntries(
        Object.entries(updates).filter(([_, value]) => value !== null && value !== undefined),
      );
      this.productsList[index] = { ...existingProduct, ...cleanUpdates };
    }
    this.saveToStorage();
  }

  delete(id: number): void {
    const index = this.productsList.findIndex((p) => p.id === id);
    if (index !== -1) {
      this.productsList.splice(index, 1);
      this.saveToStorage();
    }
  }
}
