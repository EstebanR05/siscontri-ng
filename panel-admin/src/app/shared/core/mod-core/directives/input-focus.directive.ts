import {AfterViewInit, Directive, ElementRef} from "@angular/core";

@Directive({
  selector: 'input[inputAutoFocus]'
})
export class InputFocusDirective implements AfterViewInit {

  constructor(private elementRef: ElementRef) {
  }

  ngAfterViewInit() {
    this.elementRef.nativeElement.focus();
  }
}
