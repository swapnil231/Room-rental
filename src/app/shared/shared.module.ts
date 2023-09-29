import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardsComponent } from './cards/cards.component';
import { RouterModule } from '@angular/router';
import { UppercasefirstLetterPipe } from './uppercasefirst-letter.pipe';
import { HighlightDirective } from './highlight.directive';
import { ForbiddenemailDirective } from './directive/forbiddenemail.directive';
import { SameAsDirective } from './directive/same-as.directive';

@NgModule({
  declarations: [
    CardsComponent,
    UppercasefirstLetterPipe,
    HighlightDirective,
    ForbiddenemailDirective,
    SameAsDirective,
  ],
  imports: [CommonModule, RouterModule],
  exports: [
    CardsComponent,
    UppercasefirstLetterPipe,
    HighlightDirective,
    ForbiddenemailDirective,
    SameAsDirective,
  ],
})
export class SharedModule {}
