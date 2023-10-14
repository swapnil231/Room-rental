import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageComponent } from './image/image.component';
import { SpinnerModule } from '../spinner/spinner.module';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ImageEditableComponent } from '../editable/image-editable/image-editable.component';

@NgModule({
  declarations: [ImageComponent],
  imports: [CommonModule, SpinnerModule, ImageCropperModule],
  exports: [ImageComponent],
})
export class ImageUplodModule {}
