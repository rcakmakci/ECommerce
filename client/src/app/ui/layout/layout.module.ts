import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { RouterModule } from '@angular/router';
import { PagesModule } from '../pages/pages.module';
import { ComponentsModule } from './components/components.module';


@NgModule({
  declarations: [
    LayoutComponent
  ],
  imports: [
    ComponentsModule,
    CommonModule,
    RouterModule,
    PagesModule
  ]
})
export class LayoutModule { }
