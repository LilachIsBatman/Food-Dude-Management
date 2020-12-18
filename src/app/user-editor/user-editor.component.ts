import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../entity/user.interface';

@Component({
  selector: 'app-user-editor',
  templateUrl: './user-editor.component.html',
  styleUrls: ['./user-editor.component.scss']
})
export class UserEditorComponent implements OnInit {
  @Input() user: User;
  validatingForm: FormGroup;

  constructor() {
  }

  ngOnInit(): void {
    this.validatingForm = new FormGroup({
      loginFormModalEmail: new FormControl(this.user.email, Validators.email),
    });
  }

  get loginFormModalEmail(): AbstractControl {
    return this.validatingForm.get('loginFormModalEmail');
  }
}
