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
      loginFormModalEmail: new FormControl(this.editedUser.email, Validators.email),
    });
  }

  get loginFormModalEmail(): AbstractControl {
    return this.validatingForm.get('loginFormModalEmail');
  }

  updateUser(user: User): void {
    this.userUpdate.emit(user);
  }
}
