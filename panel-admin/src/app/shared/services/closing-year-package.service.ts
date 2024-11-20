import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClosingYearPackageService {

  private closingData: any[] = [];

  constructor() { }

  public getClosingData(): any{
    return this.closingData;
  }

  public setClosingData(data: any): void{
    this.closingData = data;
  }
}
