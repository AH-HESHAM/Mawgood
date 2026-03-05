import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, EMPTY, map, Observable, tap } from 'rxjs';
import { IProducts } from '../models/iproducts';

@Injectable({
  providedIn: 'root',
})
export class DynamicData {
  private productsSubject = new BehaviorSubject<IProducts[]>([]);
  products$ = this.productsSubject.asObservable();

  private apiUrl = 'http://localhost:2000/products';

  constructor(private http: HttpClient) {}

  // Load once at app start
  loadProducts() {
    this.http.get<IProducts[]>(this.apiUrl).subscribe((data) => this.productsSubject.next(data));
  }

  filterProducts(
    category: string = 'all',
    text: string = '',
    minPrice: number = 0,
    maxPrice: number = Number.MAX_VALUE,
  ): Observable<IProducts[]> {
    return this.products$.pipe(
      map((products) => {
        let filteredList = products;

        // Category
        if (category !== 'all') {
          filteredList = filteredList.filter((product) => product.category === category);
        }

        // Text
        if (text.trim() !== '') {
          const lowerText = text.toLowerCase();
          filteredList = filteredList.filter(
            (product) =>
              product.title.toLowerCase().includes(lowerText) ||
              product.description.toLowerCase().includes(lowerText),
          );
        }

        // Price
        filteredList = filteredList.filter(
          (product) => product.price >= minPrice && product.price <= maxPrice,
        );

        return filteredList;
      }),
    );
  }

  // ADD
  post(product: IProducts): Observable<IProducts> {
    product.id = product.id.toString()
    return this.http.post<IProducts>(this.apiUrl, product).pipe(
      tap((newProduct) => {
        const current = this.productsSubject.value;
        this.productsSubject.next([...current, newProduct]);
      }),
    );
  }

  // DELETE
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        const updated = this.productsSubject.value.filter((p) => p.id !== id);
        this.productsSubject.next(updated);
      }),
    );
  }

  // PATCH
  update(changes: Partial<IProducts>): Observable<IProducts> {
    return this.http.patch<IProducts>(`${this.apiUrl}/${changes.id?.toString()}`, changes).pipe(
      tap((updatedProduct) => {
        const updated = this.productsSubject.value.map((p) =>
          p.id == changes.id ? updatedProduct : p,
        );
        this.productsSubject.next(updated);
      }),
    );
  }

  // PUT
  put(product: IProducts): Observable<IProducts> {
    return this.http.put<IProducts>(`${this.apiUrl}/${product.id}`, product).pipe(
      tap((updatedProduct) => {
        const updated = this.productsSubject.value.map((p) =>
          p.id === product.id ? updatedProduct : p,
        );
        this.productsSubject.next(updated);
      }),
    );
  }
}
