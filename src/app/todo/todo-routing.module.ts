import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WidgetComponent } from './components/widget/widget.component';
import { Widget2Component } from './components/widget2/widget2.component';
import { Page1Component } from './components/page1/page1.component';

const routes: Routes = [
  // { path: '', component: WidgetComponent },
  // { path: 'widget', component: WidgetComponent },
  // { path: 'widget2', component: Widget2Component },
  { path: 'page1', component: Page1Component },
  { path:'', redirectTo: 'page1', pathMatch: 'full' },
  { path: '**', redirectTo: 'page1' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TodoRoutingModule { }
