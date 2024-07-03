import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutsModule } from './layouts/layouts.module';
import { GestionRandonneursComponent } from './views/admin/gestion-randonneurs/gestion-randonneurs.component';
import{HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BaseURL } from './models/baseurl';
@NgModule({
  declarations: [
    AppComponent,
    GestionRandonneursComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    
    { provide: 'BaseURL', useValue: BaseURL}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
