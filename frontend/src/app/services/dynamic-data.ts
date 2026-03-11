import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, EMPTY, map, Observable, tap } from 'rxjs';
import { IProducts } from '../models/iproducts';
import { AuthService } from './auth-service';

@Injectable({
  providedIn: 'root',
})
export class DynamicData {
  private productsSubject = new BehaviorSubject<IProducts[]>([]);
  products$ = this.productsSubject.asObservable();

  private apiUrl = 'http://localhost:3000/products';

  constructor(
    private http: HttpClient,
    private auth: AuthService,
  ) {}

  // Load once at app start
  loadProducts() {
    this.http
      .get<IProducts[]>(this.apiUrl, { withCredentials: true })
      .subscribe((data) => this.productsSubject.next(data));
  }

  filterProducts(
    category: string = 'all',
    text: string = '',
    minPrice: number = 0,
    maxPrice: number = Number.MAX_VALUE,
    onlyMe: boolean = false,
  ): Observable<IProducts[]> {
    this.loadProducts();
    return this.products$.pipe(
      map((products) => {
        let filteredList = products;

        if (onlyMe) {
          filteredList = filteredList.filter(
            (product) => product.vendorMail === this.auth.user()?.email,
          );
        }

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
    return this.http.post<IProducts>(this.apiUrl, product, { withCredentials: true }).pipe(
      tap((newProduct) => {
        const current = this.productsSubject.value;
        this.productsSubject.next([...current, newProduct]);
      }),
    );
  }

  // DELETE
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { withCredentials: true }).pipe(
      tap(() => {
        const updated = this.productsSubject.value.filter((p) => p._id !== id);
        this.productsSubject.next(updated);
      }),
    );
  }

  // PATCH
  update(changes: Partial<IProducts>): Observable<IProducts> {
    return this.http
      .patch<IProducts>(`${this.apiUrl}/${changes._id}`, changes, { withCredentials: true })
      .pipe(
        tap((updatedProduct) => {
          const updated = this.productsSubject.value.map((p) =>
            p._id == changes._id ? updatedProduct : p,
          );
          this.productsSubject.next(updated);
        }),
      );
  }

  // PUT
  put(product: IProducts): Observable<IProducts> {
    return this.http
      .put<IProducts>(`${this.apiUrl}/${product._id}`, product, { withCredentials: true })
      .pipe(
        tap((updatedProduct) => {
          const updated = this.productsSubject.value.map((p) =>
            p._id === product._id ? updatedProduct : p,
          );
          this.productsSubject.next(updated);
        }),
      );
  }
}
