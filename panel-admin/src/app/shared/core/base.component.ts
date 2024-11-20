import { Component } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { AbstractControl, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({ template: '' })
export class BaseComponent {

  public form!: FormGroup;
  public token: any = environment.auth.JWT;
  public apiUrl = environment.app.apiBaseUrl;
  public userId: number = environment.auth.userId ? parseInt(environment.auth.userId, 10) : 0;

  //modal
  selected$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  modalDisplay$: BehaviorSubject<any> = new BehaviorSubject<any>("none");
  subscription!: Subscription;
  idModal: any = null;

  constructor() { }

  getControl(control: string, form: FormGroup = this.form): AbstractControl {
    return form.controls[control];
  }

  clearHistory() {
    localStorage.removeItem('token');
    sessionStorage.clear();
    localStorage.clear();
  }

  handleError(error: string) {
    Swal.fire({ title: 'Error!', text: error, icon: 'warning' });
  }

  async handleSuccess(message: string) {
    Swal.fire({ title: 'Realizado!', text: message, icon: 'success' });
  }

  async confirmDelete(): Promise<any> {
    return await Swal.fire({
      title: "Estas seguro de eliminar?",
      text: "No podras revertir esta accion!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, estoy seguro!"
    });
  }

  async handleSuccessDelete(): Promise<any> {
    return await Swal.fire({
      title: "Eliminado!",
      text: "Se ha eliminado correctamente.",
      icon: "success"
    });
  }

  openModal(event: any, id = null) {
    if (id) this.idModal = id;
    this.selected$.next({ event })
    this.modalDisplay$.next("block");
  }

  closeModalMethod() {
    this.selected$.next(null);
    this.modalDisplay$.next("none");
    this.subscription.unsubscribe();
  }
}