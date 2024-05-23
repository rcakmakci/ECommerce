import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminLayoutComponent } from './layout.component';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from './components/components.module';


@NgModule({
  declarations: [
    AdminLayoutComponent,
  ],
  imports: [
    ComponentsModule,
    CommonModule,
    RouterModule
  ],
  exports: [
    AdminLayoutComponent
  ]
})
export class AdminLayoutModule { }
