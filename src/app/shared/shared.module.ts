import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardsComponent } from './cards/cards.component';
import { RouterModule } from '@angular/router';
import { UppercasefirstLetterPipe } from './uppercasefirst-letter.pipe';
import { HighlightDirective } from './highlight.directive';
import { ForbiddenemailDirective } from './directive/forbiddenemail.directive';
import { SameAsDirective } from './directive/same-as.directive';
import { MapModule } from './map/map.module';
import { FirstletterPipe } from './pipe/firstletter.pipe';

import { TimeFormatPipe } from './pipe/time-format/time-format.pipe';
import { EditableModule } from './editable/editable.module';
import { ImageUplodModule } from './image-uplod/image-uplod.module';
import { SpinnerModule } from './spinner/spinner.module';
import { ImageCropperModule } from 'ngx-image-cropper';

@NgModule({
  declarations: [
    CardsComponent,
    UppercasefirstLetterPipe,
    HighlightDirective,
    ForbiddenemailDirective,
    SameAsDirective,
    FirstletterPipe,

    TimeFormatPipe,
  ],
  imports: [CommonModule, RouterModule, MapModule, ImageCropperModule],
  exports: [
    CardsComponent,
    UppercasefirstLetterPipe,
    HighlightDirective,
    ForbiddenemailDirective,
    SameAsDirective,
    MapModule,
    FirstletterPipe,
    TimeFormatPipe,
    EditableModule,
    ImageUplodModule,
    SpinnerModule,
  ],
})
export class SharedModule {}
