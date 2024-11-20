import { Injectable } from '@angular/core';
import { ReportsFilter } from '../core/mod-core/models/reports-filter.model';
import { SERVER_URL } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  constructor() { }

  public printDailyBalance(reportsFilter: ReportsFilter, isExport: boolean): void {
    const url = this.getUrlByFilters(`/acco/api/v1/report/dailyBalance${!isExport ? '/export' : ''}?`, reportsFilter);
    window.open(url, '_blank');
  }

  public printGroupsAndSalePrice(reportsFilter: ReportsFilter, isExport: boolean): void {
    const url = this.getUrlByFilters(`/acco/api/v1/report/groupsAndSalePrice${!isExport ? '/export' : ''}?`, reportsFilter);
    window.open(url, '_blank');
  }

  public printCommissionAgent(reportsFilter: ReportsFilter, isExport: boolean, selected: boolean): void {
    const url = this.getUrlByFilters(`/acco/api/v1/report/CommissionAgent${!isExport ? '/export' : ''}/${selected}?`, reportsFilter);
    window.open(url, '_blank');
  }

  public printMassPrinting(reportsFilter: ReportsFilter, isExport: boolean, isMiddle: boolean): void {
    const url = this.getUrlByFilters(`/acco/api/v1/report/massPrinting${!isExport ? '/export' : '/' + isMiddle}?`, reportsFilter);
    window.open(url, '_blank');
  }

  public printPayrollSettlement(reportsFilter: ReportsFilter, isExport: boolean, selected: boolean): void {
    const url = this.getUrlByFilters(`/acco/api/v1/report/PayrollSettlement${!isExport ? '/export' : ''}/${selected}?`, reportsFilter);
    window.open(url, '_blank');
  }

  private getUrlByFilters(api: string, reportsFilter: ReportsFilter): string {
    let url = `${SERVER_URL}${api}`;

    if (reportsFilter.accountAccountingStart) {
      url += `documentCodeStart=${reportsFilter.accountAccountingStart.code}&`;
      url += `acacIdStart=${reportsFilter.accountAccountingStart.id}&`;
    }

    if (reportsFilter.accountAccountingEnd) {
      url += `documentCodeEnd=${reportsFilter.accountAccountingEnd.code}&`;
      url += `acacIdEnd=${reportsFilter.accountAccountingEnd.id}&`;
    }

    if (reportsFilter.elaborationDate) {
      url += `endDate=${reportsFilter.elaborationDate.getTime().toString()}&`;
    }

    if (reportsFilter.elaborationDateRange) {
      const datesRage = reportsFilter.elaborationDateRange.map(item => item ? item.getTime() : '');
      url += `startDate=${datesRage[0]?.toString()}&endDate=${datesRage[1]?.toString()}&`;
    }

    if (reportsFilter.invoices) {
      const invoiceIds = reportsFilter.invoices.map(o => o.id);
      url += `invoices=${invoiceIds}&`;
    }

    if (reportsFilter.users) {
      const users = reportsFilter.users.map(o => o.id);
      url += `users=${users}&`;
    }

    if (reportsFilter.groupsAndSalePrice) {
      const groupsAndSalePriceIds = reportsFilter.groupsAndSalePrice.map(o => o.id);
      url += `groupsAndSalePrices=${groupsAndSalePriceIds}&`;
    }

    if (reportsFilter.states) {
      const statesId = reportsFilter.states.map(o => o.id);
      url += `states=${statesId}&`;
    }

    if (reportsFilter.commissionAgent) {
      const commissionAgentId = reportsFilter.commissionAgent.map(o => o.id);
      url += `commissionAgents=${commissionAgentId}&`;
    }

    if (reportsFilter.contacts) {
      const contactIds = reportsFilter.contacts.map(o => o.id);
      url += `contacts=${contactIds}&`;
    }

    if (reportsFilter.accounts) {
      const accounts = reportsFilter.accounts.map(o => o.code);
      url += `accounts=${accounts}&`;
    }

    if (reportsFilter.branchOffices) {
      url += `branchOfficesId=${reportsFilter.branchOffices.id}&`;
    }

    if (reportsFilter.costCenters) {
      url += `costCenterId=${reportsFilter.costCenters.id}&`;
    }

    if (reportsFilter.format) {
      url += `formatId=${reportsFilter.format.id}&`;
    }

    url += `businessId=${reportsFilter.businessId}`;

    return url;
  }
}
