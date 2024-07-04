import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddRandonneurComponent } from './add-randonneur/add-randonneur.component';

const routes: Routes = [
  {path:'',component:AddRandonneurComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddRandonneurRoutingModule { }
