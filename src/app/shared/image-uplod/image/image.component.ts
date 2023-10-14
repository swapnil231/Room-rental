import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { ImageService } from '../image.service';
import {
  ImageCroppedEvent,
  LoadedImage,
  base64ToFile,
} from 'ngx-image-cropper';
import { DomSanitizer } from '@angular/platform-browser';
import * as bodyParser from 'body-parser';

export class ImageSnippet {
  src!: any;
  file!: File;
  status!: string;

  constructor(file?: File) {
    if (file) {
      (this.file = file), (this.status = 'INIT');
    }
  }
}

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss'],
})
export class ImageComponent implements OnInit, OnDestroy {
  selectedImage!: ImageSnippet;
  isImagePreview = true;

  @Input() istruevalue: any;
  @Output() istruefromchid = new EventEmitter();
  // selet=this.selectedImage
  @Output() selet = new EventEmitter();

  @Output() imageUploaded = new EventEmitter();

  ngOnInit(): void {
    this.lisenToFileLoad();
  }

  constructor(
    private imageService: ImageService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnDestroy(): void {
    this.removeFileLoderLisner();
  }

  private fileReader = new FileReader();

  OnImageLoad(event: any) {
    this.isImagePreview = true;
    const file = event.target?.files[0];
    console.log(file);

    this.selectedImage = new ImageSnippet(file);
    this.fileReader.readAsDataURL(file);
    console.log(this.fileReader, 'filereader');
    this.selet.emit(this.selectedImage);
  }

  private handleImageLoad = (event: any) => {
    const { result } = event.target;
    console.log(result, 'result');
    this.selectedImage.src = result;
    this.selectedImage.status = 'LOADED';
  };

  private lisenToFileLoad() {
    this.fileReader.addEventListener('load', this.handleImageLoad);
  }
  private removeFileLoderLisner() {
    this.fileReader.removeEventListener('load', this.handleImageLoad);
  }

  uploadImage() {
    this.selectedImage.status = 'PENDING';
    console.log(this.selectedImage.file);
    this.imageService.uploadImage(this.selectedImage.file).subscribe({
      next: (uploadedImage: any) => {
        this.imageUploaded.emit(uploadedImage._id);

        this.selectedImage.status = 'UPLOADED';
        this.isImagePreview = false;
      },
      error: (err) => {
        this.selectedImage.status = 'ERROR';
        this.isImagePreview = false;
        this.istruefromchid.emit((this.istruevalue = true));
      },
    });
  }

  cancelImage(fileInput: any) {
    fileInput.value = null;
    this.istruevalue = true;
    this.istruefromchid.emit(this.istruevalue);
    // this.errorinUplod.emit((this.errorinuplodvar = false));
  }
  // x: any;

  // imageCropped(event: ImageCroppedEvent) {
  //   // if (event.objectUrl) {
  //   //   this.selectedImage.src = this.sanitizer.bypassSecurityTrustUrl(
  //   //     event.objectUrl
  //   //   );
  //   // }
  //   this.croppedImage = event.base64;
  //   // this.selectedImage.src = event.base64
  //   // this.croppedImage = event.base64;
  //   console.log(this.selectedImage.src);
  //   console.log(this.croppedImage);
  //   console.log(event);
  // }
}
