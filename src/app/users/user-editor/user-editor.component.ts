import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../../entity/user.interface';
import {cloneDeep} from 'lodash';

@Component({
  selector: 'app-user-editor',
  templateUrl: './user-editor.component.html',
  styleUrls: ['./user-editor.component.scss']
})
export class UserEditorComponent implements OnInit {
  @Input() user: User;
  @Output() userUpdate: EventEmitter<User>;
  editedUser: User;
  validatingForm: FormGroup;

  constructor() {
    this.userUpdate = new EventEmitter<User>();
  }

  ngOnInit(): void {
    this.editedUser = cloneDeep(this.user);
    this.validatingForm = new FormGroup({
      email: new FormControl(this.editedUser.email, [Validators.email, Validators.required]),
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      city: new FormControl(null, Validators.required),
      street: new FormControl(null, Validators.required),
      houseNumber: new FormControl(null, [Validators.required, Validators.min(1)])
    });
  }

  updateUser(user: User): void {
      this.userUpdate.emit(user);
  }

  get firstNameInput(): AbstractControl {
    return this.validatingForm.get('firstName');
  }

  get lastNameInput(): AbstractControl {
    return this.validatingForm.get('lastName');
  }

  get emailInput(): AbstractControl {
    return this.validatingForm.get('email');
  }

  get cityInput(): AbstractControl {
    return this.validatingForm.get('city');
  }
  get streetInput(): AbstractControl {
    return this.validatingForm.get('street');
  }

  get houseNumberInput(): AbstractControl {
    return this.validatingForm.get('houseNumber');
  }

  isAllInputsValid(): boolean {
   return this.firstNameInput.valid && this.lastNameInput.valid && this.emailInput.valid &&
    this.cityInput.valid && this.streetInput.valid && this.houseNumberInput.valid;
  }
}
