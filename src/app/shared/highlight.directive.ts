import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
})
export class HighlightDirective implements OnInit {
  @Input('appHighlight') bgColor: any;
  el: ElementRef;

  constructor(el: ElementRef) {
    this.el = el;
  }
  ngOnInit(): void {
    this.el.nativeElement.style.backgroundColor = this.bgColor;
  }
}
