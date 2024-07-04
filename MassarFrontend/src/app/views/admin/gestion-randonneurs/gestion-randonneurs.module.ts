import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GestionRandonneursRoutingModule } from './gestion-randonneurs-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GestionRandonneursComponent } from './gestion-randonneurs.component';


@NgModule({
  declarations: [
    GestionRandonneursComponent
  ],
  imports: [
    CommonModule,
    GestionRandonneursRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    
  ]
})
export class GestionRandonneursModule { }
