import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FrontLayoutComponent } from './layouts/front-layout/front-layout.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';

const routes: Routes = [
  {path:'',component:FrontLayoutComponent,children:[
    {
      path:'login',loadChildren: () => import('./views/front/login/login.module').then(m => m.LoginModule)
    },
    {
      path:'register',loadChildren: () => import('./views/front/register/register.module').then(m =>m.RegisterModule)
    },
    {
      path:'about',loadChildren: () => import('./views/front/about/about.module').then(m =>m.AboutModule)
    },
    {
      path:'addRandonneur',loadChildren: () => import('./views/admin/add-randonneurs/add-randonneur/add-randonneur.module').then(m =>m.AddRandonneurModule)
    }
   
  ]},
  {path:'admin',component:AdminLayoutComponent,children:[
    {
      path:'',loadChildren: () => import('./views/admin/dashboard/dashboard.module').then(m =>m.DashboardModule)
    },
    {
      path:'dashboard',loadChildren: () => import('./views/admin/dashboard/dashboard.module').then(m =>m.DashboardModule)
    },
    {
      path:'GestionRandonneurs',loadChildren: () => import('./views/admin/gestion-randonneurs/gestion-randonneurs.module').then(m =>m.GestionRandonneursModule)
    },
    
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
