import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MaterialModule } from '../../../material.module';
import { MatButtonModule } from '@angular/material/button';
import { AuthUserService } from 'src/app/shared/services/auth-user.service';
import { Login } from 'src/app/shared/core/mod-core/models/login.model';
import { BaseComponent } from 'src/app/shared/core/base.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-side-login',
  standalone: true,
  imports: [
    RouterModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    HttpClientModule
  ],
  providers: [AuthUserService],
  templateUrl: './side-login.component.html',
  encapsulation: ViewEncapsulation.None
})
export class AppSideLoginComponent extends BaseComponent implements OnInit {

  constructor(
    private router: Router,
    private userService: AuthUserService,
    private fb: FormBuilder
  ) { super() }

  ngOnInit(): void {
    this.form = this.fb.group({
      uname: new FormControl('', [Validators.required, Validators.minLength(6)]),
      password: new FormControl('', [Validators.required]),
    });
  }

  get f() {
    return this.form.controls;
  }

  async submit(): Promise<void> {
    try {
      let login: Login = { username: this.form.value.uname, password: this.form.value.password };
      await this.userService.validAccessToken(login);
    } catch (e: any) {
      if (e.status === 401 || e.status === 400) {
        this.handleError('Usuario y/o contraseña es incorrecta.')
      }
    }
  }
}
