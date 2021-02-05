import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SPTablesComponent } from './products-sale.component';
import { ProductsTableComponent } from './products-table/products-table.component';
import { CategoryTableComponent } from './category-table/category-table.component';
import { SaleTableComponent } from './sale-table/sale-table.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { AddProductsComponent } from './add-products/add-products.component';
import { EditCategoryComponent } from './edit-category/edit-category.component';
import { EditProductsComponent } from './edit-products/edit-products.component';

const routes: Routes = [{
  path: '',
  component: SPTablesComponent,
  children: [
    {
      path: 'products-table',
      component: ProductsTableComponent,
    },
    {
      path: 'category-table',
      component: CategoryTableComponent,
    },
    {
      path: 'sale-table',
      component: SaleTableComponent,
    },
    {
      path: 'add-category',
      component: AddCategoryComponent,
    },
    {
      path: 'add-products',
      component: AddProductsComponent,
    },
    {
      path: 'edit-category/:id',
      component: EditCategoryComponent,
    },
    {
      path: 'edit-products/:id',
      component: EditProductsComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SPTablesRoutingModule { }

export const routedComponents = [
  SPTablesComponent,
  ProductsTableComponent,
  CategoryTableComponent,
  SaleTableComponent,
  AddCategoryComponent,
  AddProductsComponent,
  EditCategoryComponent,
  EditProductsComponent,
];
