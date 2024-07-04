import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditRandonneurComponent } from './edit-randonneur/edit-randonneur.component';

const routes: Routes = [
  {path:'',component:EditRandonneurComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditRandonneurRoutingModule { }
