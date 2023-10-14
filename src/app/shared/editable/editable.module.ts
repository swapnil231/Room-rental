import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditableComponent } from './editable.component';
import { FormsModule } from '@angular/forms';

import { ImageEditableComponent } from './image-editable/image-editable.component';
import { ImageUplodModule } from '../image-uplod/image-uplod.module';

@NgModule({
  declarations: [EditableComponent, ImageEditableComponent],
  imports: [CommonModule, FormsModule, ImageUplodModule],
  exports: [EditableComponent, ImageEditableComponent],
})
export class EditableModule {}
