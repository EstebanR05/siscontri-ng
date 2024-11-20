import {Directive, HostListener, Input} from '@angular/core';

@Directive({
  selector: '[sfCancelRowTable]'
})
export class CancelRowTableDirective {
  @Input() model: any;
  @Input() editItem: any;
  @Input() item: any;
  @Input() index: number;

  constructor() {
  }

  @HostListener('click', ['$event'])
  onClick(event: Event) {
    if (!this.item.id) {
      this.model.shift();
    } else {
      this.model[this.index] = this.editItem;
    }

    event.preventDefault();
  }
}
