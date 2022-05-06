import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // routerLink

// shared
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DateAgoPipe } from './pipes/date-ago.pipe';
import { DecodeHTMLEntitiesPipe } from './pipes/decode-html-entities.pipe';
import { MarkdownPipe } from './pipes/markdown.pipe';

import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { PeakComponent } from './components/peak/peak.component';


@NgModule({
  declarations: [
    DateAgoPipe,
    DecodeHTMLEntitiesPipe,
    MarkdownPipe,
    PageNotFoundComponent,
    PeakComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    FormsModule, ReactiveFormsModule,

    DateAgoPipe,
    DecodeHTMLEntitiesPipe,
    MarkdownPipe,
    PageNotFoundComponent,
    PeakComponent,
  ],
})
export class SharedModule { }
