import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodoRoutingModule } from './todo-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { WidgetComponent } from './components/widget/widget.component';

@NgModule({
  declarations: [
    WidgetComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    TodoRoutingModule
  ]
})
export class TodoModule { }
