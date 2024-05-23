import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeModule } from './home/home.module';
import { CartModule } from './cart/cart.module';
import { HomeComponent } from './home/home.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HomeModule,
    CartModule
  ],
})
export class PagesModule { }
