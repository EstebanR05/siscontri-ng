import {Directive, ElementRef, HostListener, Input} from '@angular/core';

@Directive({
  selector: '[sfNumberOnly]'
})
export class NumberOnlyDirective {
  @Input() sfNumberOnly: boolean;
  // Allow decimal numbers. The \. is only allowed once to occur
  private regex: RegExp = new RegExp(/^[0-9]+(\.[0-9]*){0,1}$/g);

  // Allow key codes for special events. Reflect :
  // Backspace, tab, end, home
  private specialKeys: Array<string> = ['Backspace', 'Tab', 'End', 'Home'];

  constructor(private el: ElementRef) {
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    if (this.sfNumberOnly) {
      // Allow Backspace, tab, end, and home keys
      if (this.specialKeys.indexOf(event.key) !== -1) {
        return;
      }

      const current: string = this.el.nativeElement.value;
      const next: string = current.concat(event.key);

      if (next && !String(next).match(this.regex)) {
        event.preventDefault();
      }
    }
  }
}
