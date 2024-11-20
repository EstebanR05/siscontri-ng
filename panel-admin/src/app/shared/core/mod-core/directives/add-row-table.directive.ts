import {Directive, HostListener, Input} from '@angular/core';
import {Table} from "primeng/table";

@Directive({
  selector: '[sfAddRowTable]'
})
export class AddRowTableDirective {
  @Input() table: Table;
  @Input() model: any;

  constructor() {
  }

  @HostListener('click', ['$event'])
  onClick(event: Event) {
    if (!this.table.editingRowKeys.undefined) {
      this.table.initRowEdit({row: this.model.length + 1});
      this.table.value.unshift({row: this.model.length + 1});
    }

    event.preventDefault();
  }
}
