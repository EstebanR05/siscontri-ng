import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BaseComponent } from 'src/app/shared/core/base.component';
import { AccountVoucher, AccountVoucherFilter } from 'src/app/shared/core/mod-core/models/account-voucher.model';
import { AccountingVoucherService } from 'src/app/shared/services/accounting-voucher.service';
import { catchError, of, } from 'rxjs';

@Component({
  selector: 'app-accountant-list',
  standalone: true,
  imports: [HttpClientModule, CommonModule, RouterLink],
  providers: [AccountingVoucherService],
  templateUrl: './accountant-list.component.html',
  styleUrl: './accountant-list.component.scss'
})
export class AccountantListComponent extends BaseComponent implements OnInit {

  public accountingVouchers: AccountVoucher[];
  public filters = {} as AccountVoucherFilter;

  constructor(
    private accountingVoucherService: AccountingVoucherService
  ) { super() }

  ngOnInit(): void {
    this.getAccountingVoucher();
  }

  public getAccountingVoucher(page: number = 0, size: number = 10): void {
    this.accountingVoucherService.getAccountingVouchers(this.filters, page, size)
      .pipe(
        catchError((error) => {
          console.error('Error al obtener los vouchers:', error);
          return of({ content: [] });
        })
      )
      .subscribe({
        next: (result) => {
          console.log('Resultados obtenidos:', result);
          this.accountingVouchers = result.content;
        },
        error: (error) => console.error('Error en el suscriptor:', error),
      });
  }

}
