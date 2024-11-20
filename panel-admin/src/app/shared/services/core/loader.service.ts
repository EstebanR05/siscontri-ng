import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  // tslint:disable-next-line:variable-name
  private _isLoading = new BehaviorSubject(false);

  constructor() {
  }

  get isLoading(): BehaviorSubject<boolean> {
    return this._isLoading;
  }
}
