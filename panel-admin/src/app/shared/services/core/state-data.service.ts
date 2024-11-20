import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class StateDataService {

  constructor() {
  }

  getData(data: string, route: ActivatedRouteSnapshot): any {
    const activatedRoute = this.lastChild(route);
    return activatedRoute.data[data];
  }

  private lastChild(route: ActivatedRouteSnapshot): ActivatedRouteSnapshot {
    if (route.firstChild) {
      return this.lastChild(route.firstChild);
    } else {
      return route;
    }
  }
}
