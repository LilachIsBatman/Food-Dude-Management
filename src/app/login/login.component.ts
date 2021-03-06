import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AuthState } from './reducer/auth.reducer';
import { login } from './actions/auth.action';
import { getErrorMassage } from './selectors/auth.selectors';
import { Observable, Subject } from 'rxjs';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnDestroy, OnInit {
  destroy$: Subject<void>;
  error$: Observable<string>;
  validatingForm: FormGroup;

  constructor(private store: Store<AuthState>) {
    this.error$ = this.store.pipe(select(getErrorMassage));
  }

  login(email: string, password: string): void {
    this.store.dispatch(login({ email, password }));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  ngOnInit(): void {
    this.destroy$ = new Subject<void>();
    this.validatingForm = new FormGroup({
      email: new FormControl(null, [Validators.email, Validators.required]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  get emailInput(): AbstractControl {
    return this.validatingForm.get('email');
  }

  get passwordInput(): AbstractControl {
    return this.validatingForm.get('password');
  }

  isAllInputsValid(): boolean {
    return this.emailInput.valid && this.passwordInput.valid;
  }
}
