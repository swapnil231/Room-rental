import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { ImageService } from '../image.service';

import { DomSanitizer } from '@angular/platform-browser';

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
    this.selectedImage = new ImageSnippet(file);
    this.fileReader.readAsDataURL(file);
    this.selet.emit(this.selectedImage);
  }

  private handleImageLoad = (event: any) => {
    const { result } = event.target;
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
    this.imageService.uploadImage(this.selectedImage.file).subscribe({
      next: (uploadedImage: any) => {
        this.imageUploaded.emit(uploadedImage._id);
        this.selectedImage.status = 'UPLOADED';
        this.isImagePreview = false;
      },
      error: () => {
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
  }
}
