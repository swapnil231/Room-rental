import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './map/map.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [MapComponent],
  imports: [CommonModule, HttpClientModule],
  exports: [MapComponent],
})
export class MapModule {}
