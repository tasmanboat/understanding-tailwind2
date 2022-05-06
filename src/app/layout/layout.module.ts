import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // routerLink

import { SharedModule } from 'src/app/shared/shared.module';

import { LayoutAppComponent } from './layouts/layout-app/layout-app.component';
import { LayoutDefaultComponent } from './layouts/layout-default/layout-default.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';



@NgModule({
  declarations: [
    LayoutAppComponent,
    LayoutDefaultComponent,
    FooterComponent,
    HeaderComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
  ]
})
export class LayoutModule { }
