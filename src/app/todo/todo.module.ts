import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodoRoutingModule } from './todo-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { WidgetComponent } from './components/widget/widget.component';
import { Widget2Component } from './components/widget2/widget2.component';
import { Page1Component } from './components/page1/page1.component';
import { TodoCardComponent } from './components/todo-card/todo-card.component';
import { TodoCardRowComponent } from './components/todo-card-row/todo-card-row.component';

@NgModule({
  declarations: [
    WidgetComponent,
    Widget2Component,
    Page1Component,
    TodoCardComponent,
    TodoCardRowComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    TodoRoutingModule
  ]
})
export class TodoModule { }
