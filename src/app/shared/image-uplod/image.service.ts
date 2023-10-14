import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ImageSnippet } from './image/image.component';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  constructor(private http: HttpClient) {}

  uploadImage(image: File): Observable<any> {
    console.log(image, 'image');

    const formData = new FormData();
    formData.append('foo', image);

    return this.http.post('/api/v1/image-upload', formData);
  }
}

// function b64ToFile(
//   b64Data: string,
//   type = 'image/jpeg',
//   name: string
// ): File | any {
//   let data;
//   const aux = b64Data.split(',');
//   if (aux.length > 1) {
//     data = aux[1];
//   } else {
//     data = b64Data;
//   }

//   const byteString = atob(data);
//   const ab = new ArrayBuffer(byteString.length);
//   const ia = new Uint8Array(ab);

//   for (let i = 0; i < byteString.length; i += 1) {
//     ia[i] = byteString.charCodeAt(i);
//   }

//   const blob = new Blob([ab], { type });

//   if (!blob) {
//     return null;
//   }
//   return new File([blob], name, { type });
// }
