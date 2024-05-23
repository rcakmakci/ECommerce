import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesModule } from './pages/pages.module';
import { AdminLayoutModule } from './layout/layout.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PagesModule,
    AdminLayoutModule
  ],
  exports: [

  ]
})
export class AdminModule { }
