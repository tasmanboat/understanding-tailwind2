import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { FilterableProductTableComponent } from './components/filterable-product-table/filterable-product-table.component';

@NgModule({
  declarations: [
    FilterableProductTableComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ProductRoutingModule,
  ]
})
export class ProductModule { }
