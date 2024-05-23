import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './admin/layout/layout.component';
import { ProductsModule } from './admin/pages/products/products.module';
import { DashboardModule } from './admin/pages/dashboard/dashboard.module';
import { OrdersModule } from './admin/pages/orders/orders.module';
import { HomeComponent } from './ui/pages/home/home.component';
import { AppComponent } from './app.component';
import { LayoutComponent } from './ui/layout/layout.component';

const routes: Routes = [
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      { path: '', loadChildren: () => import('./admin/pages/dashboard/dashboard.module').then(m => m.DashboardModule) },
      { path: 'products', loadChildren: () => import('./admin/pages/products/products.module').then(m => m.ProductsModule) },
      { path: 'orders', loadChildren: () => import('./admin/pages/orders/orders.module').then(m => m.OrdersModule) }
    ]
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'cart', loadChildren: () => import('./ui/pages/cart/cart.module').then(m => m.CartModule) }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
