import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseComponent } from 'src/app/shared/core/base.component';

@Component({
  selector: 'app-accountant-manager',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './accountant-manager.component.html',
  styleUrl: './accountant-manager.component.scss'
})
export class AccountantManagerComponent extends BaseComponent implements OnInit {
  public id: any = this.ActiveRoute.snapshot.paramMap.get('id');

  constructor(
    private ActiveRoute: ActivatedRoute,
    private fb: FormBuilder,
    private route: Router,
    public location: Location
  ){super()}

  ngOnInit(): void {
  }

  async submit(): Promise<void> {
  }
}
