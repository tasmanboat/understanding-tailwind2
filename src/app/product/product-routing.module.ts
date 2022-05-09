import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FilterableProductTableComponent } from './components/filterable-product-table/filterable-product-table.component';

const routes: Routes = [
  { path: 'fpt', component: FilterableProductTableComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
