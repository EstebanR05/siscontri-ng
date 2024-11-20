import {AfterViewInit, Directive, ElementRef, Input, OnChanges, Renderer2} from '@angular/core';

const DISABLED = 'disabled';
const APP_DISABLED = 'sf-disabled';

@Directive({
  selector: '[sfDisabled]'
})
export class DisabledDirective implements OnChanges, AfterViewInit {
  @Input() sfDisabled: boolean;

  constructor(private eleRef: ElementRef, private renderer: Renderer2) {
  }

  ngOnChanges(): void {
    this.disableElement(this.eleRef.nativeElement);
  }

  ngAfterViewInit(): void {
    this.disableElement(this.eleRef.nativeElement);
  }

  private disableElement(element: any): void {
    if (this.sfDisabled) {
      if (element.localName.includes('p-') || element.localName.includes('sf-')) {
        this.renderer.setAttribute(element, APP_DISABLED, '');
        this.renderer.setAttribute(element, DISABLED, '');
        this.renderer.addClass(element, 'p-disabled');
      }
    }

    if (element.children) {
      for (const child of element.children) {
        this.disableElement(child);
      }
    }
  }
}
