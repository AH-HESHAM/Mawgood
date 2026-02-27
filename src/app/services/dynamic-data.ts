import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { IProducts } from '../models/iproducts';

@Injectable({
  providedIn: 'root',
})
export class DynamicData {
  private productsSubject = new BehaviorSubject<IProducts[]>([]);
  products$ = this.productsSubject.asObservable();

  loadProducts() {
    this.httpClient
      .get<IProducts[]>('http://localhost:2000/products')
      .subscribe((data) => this.productsSubject.next(data));
  }

  addProduct(product: IProducts): Observable<IProducts> {
    return this.httpClient
      .post<IProducts>('http://localhost:2000/products', product)
      .pipe(tap(() => this.loadProducts()));
  }

  filterProducts(
    category: string = 'all',
    text: string = '',
    minPrice: number = 0,
    maxPrice: number = Number.MAX_VALUE,
  ): Observable<IProducts[]> {
    return this.getAllProducts().pipe(
      map((products) => {
        let filteredList = products;

        // Filter by category
        if (category !== 'all') {
          filteredList = filteredList.filter((product) => product.category === category);
        }

        // Filter by text
        if (text.trim() !== '') {
          filteredList = filteredList.filter(
            (product) =>
              product.title.toLowerCase().includes(text.toLowerCase()) ||
              product.description.toLowerCase().includes(text.toLowerCase()),
          );
        }

        // Filter by price
        filteredList = filteredList.filter(
          (product) => product.price >= minPrice && product.price <= maxPrice,
        );

        return filteredList;
      }),
    );
  }
  constructor(private httpClient: HttpClient) {}

  getAllProducts(): Observable<IProducts[]> {
    return this.httpClient.get<IProducts[]>('http://localhost:2000/products');
  }

  getProductByID(id: number): Observable<IProducts> {
    return this.httpClient.get<IProducts>(`http://localhost:2000/products/${id}`);
  }

  patchProduct(id: number, changes: Partial<IProducts>): Observable<IProducts> {
    return this.httpClient.patch<IProducts>(`http://localhost:2000/products/${id}`, changes);
  }

  updateProduct(product: IProducts): Observable<IProducts> {
    return this.httpClient.put<IProducts>(`http://localhost:2000/products/${product.id}`, product);
  }
}
