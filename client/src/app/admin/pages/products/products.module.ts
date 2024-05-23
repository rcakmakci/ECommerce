import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddProductComponent } from './add-product/add-product.component';
import { RouterModule } from '@angular/router';
import { UpdateProductComponent } from './update-product/update-product.component';


@NgModule({
  declarations: [
    AddProductComponent,
    UpdateProductComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path:"" , component:AddProductComponent },
      {path: "add-product", component:AddProductComponent},
      {path: "update-product", component:UpdateProductComponent},
      
    ]),
  ],
  exports: [
    AddProductComponent,
    UpdateProductComponent
  ]
})
export class ProductsModule { }
