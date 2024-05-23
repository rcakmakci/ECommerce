import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsModule } from './products/products.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { OrdersModule } from './orders/orders.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddProductComponent } from './products/add-product/add-product.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ProductsModule,
    DashboardModule,
    OrdersModule
  ],
  exports: [
   DashboardComponent,
   AddProductComponent,
  ]
})
export class PagesModule { }
