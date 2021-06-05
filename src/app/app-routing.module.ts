import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'shop-register',
    loadChildren: () => import('./modules/shop/shop-register/shop-register.module').then( m => m.ShopRegisterPageModule)
  },
  {
    path: 'shop-details',
    loadChildren: () => import('./modules/shop/shop-details/shop-details.module').then( m => m.ShopDetailsPageModule)
  },
  {
    path: 'shop-list',
    loadChildren: () => import('./modules/shop/shop-list/shop-list.module').then( m => m.ShopListPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./modules/auth/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'welcome',
    loadChildren: () => import('./modules/auth/welcome/welcome.module').then( m => m.WelcomePageModule)
  },
  {
    path: 'user-register',
    loadChildren: () => import('./modules/user/user-register/user-register.module').then( m => m.UserRegisterPageModule)
  },
  {
    path: 'order-add',
    loadChildren: () => import('./modules/order/order-add/order-add.module').then( m => m.OrderAddPageModule)
  },
  {
    path: 'order-details',
    loadChildren: () => import('./modules/order/order-details/order-details.module').then( m => m.OrderDetailsPageModule)
  },
  {
    path: 'order-list',
    loadChildren: () => import('./modules/order/order-list/order-list.module').then( m => m.OrderListPageModule)
  },
  {
    path: 'user-details',
    loadChildren: () => import('./modules/user/user-details/user-details.module').then( m => m.UserDetailsPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
