import { Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject, of, merge, mergeAll, zip, combineLatest, forkJoin, } from 'rxjs';
import { tap, map, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-filterable-product-table',
  templateUrl: './filterable-product-table.component.html',
  styleUrls: ['./filterable-product-table.component.scss']
})
export class FilterableProductTableComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

// #region update in stock filter
  // inStockFilter: boolean = false;
  inStockFilter$ = new BehaviorSubject<boolean>(false);
  toggleInStockFilter(e: any) {
    e.preventDefault();
    e.stopPropagation();
    this.inStockFilter$.next(e.target.checked)
  }
// #endregion

// #region products and filtered products
  private searchTerms$ = new BehaviorSubject<string>('');
  search(term: string) {
    this.searchTerms$.next(term);
  }
  products$: Observable<Product[]> = combineLatest([
    this.searchTerms$,
    this.inStockFilter$
  ]).pipe(
    debounceTime(500),
    distinctUntilChanged(),
    tap(([searchTerm, inStockFilter]: [string, boolean]) => { console.log(searchTerm, inStockFilter) }),
    map(([searchTerm, inStockFilter]: [string, boolean]) => {
      const products: Product[] = inStockFilter ? this.products.filter(product => product.stocked) : this.products;
      const term: string = searchTerm.trim();
      return term ? products.filter(product => product.name.includes(term)) : products;
    }),
  )
  private products = PRODUCTS;
// #endregion

}

const PRODUCTS: Product[] = [
  {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
  {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
  {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
  {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
  {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
  {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'},
];

interface Product {
  category: string;
  price: string;
  stocked: boolean;
  name: string;
}
