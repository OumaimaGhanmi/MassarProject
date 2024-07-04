import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AddRandonneurRoutingModule } from './add-randonneur-routing.module';

import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
  
  ],
  imports: [
    CommonModule,
    AddRandonneurRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class AddRandonneurModule { }
