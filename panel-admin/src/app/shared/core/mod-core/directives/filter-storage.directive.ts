import { Directive, EventEmitter, Input, OnDestroy, Output } from "@angular/core";

import { AuthUserService } from "src/app/shared/services/auth-user.service";
import { User } from "../models/user.model";

@Directive({
  selector: '[sfFilterStorage]'
})
export class FilterStorageDirective implements OnDestroy {
  @Input() filterStorageName: string;
  @Output() sfFilterStorageChange = new EventEmitter<any>();
  storage: Storage = sessionStorage;
  user: User;
  sfFilterStorageAppliedFlag = false;
  private _sfFilterStorage: any;

  constructor(
    private userService: AuthUserService
  ) { }

  get sfFilterStorage() {
    return this._sfFilterStorage;
  }

  @Input()
  set sfFilterStorage(val) {
    this._sfFilterStorage = val;

    if (this.sfFilterStorageAppliedFlag) {
      return;
    }

    this.sfFilterStorageAppliedFlag = true;

    this.getStorageItem();
  }

  getStorageName(): string {
    this.user = this.userService.getInfoUser();
    return this.user ? `${this.filterStorageName}-${this.user.id}` : `${this.filterStorageName}`;
  }

  setStorageItem(): void {
    const storageName = this.getStorageName();

    this.storage.setItem(storageName, JSON.stringify(this.sfFilterStorage));
  }

  getStorageItem(): void {
    const storageName = this.getStorageName();
    const storageItem = this.storage.getItem(storageName);

    if (storageItem && storageItem !== 'undefined') {
      this._sfFilterStorage = JSON.parse(storageItem);
      if (this._sfFilterStorage.elaborationDateRange) {
        this._sfFilterStorage.elaborationDateRange[0] = new Date(this._sfFilterStorage.elaborationDateRange[0]);

        if (this._sfFilterStorage.elaborationDateRange[1]) {
          this._sfFilterStorage.elaborationDateRange[1] = new Date(this._sfFilterStorage.elaborationDateRange[1]);
        }
      }

      this.sfFilterStorageChange.emit(this._sfFilterStorage);
    }
  }

  ngOnDestroy() {
    this.setStorageItem();
  }
}
