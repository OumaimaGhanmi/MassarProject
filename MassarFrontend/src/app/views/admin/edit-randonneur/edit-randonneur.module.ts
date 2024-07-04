import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditRandonneurRoutingModule } from './edit-randonneur-routing.module';
import { EditRandonneurComponent } from './edit-randonneur/edit-randonneur.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    EditRandonneurComponent
  ],
  imports: [
    CommonModule,
    EditRandonneurRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class EditRandonneurModule { }
