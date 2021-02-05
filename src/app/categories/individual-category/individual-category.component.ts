import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Category} from '../../entity/category.interface';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-individual-category',
  templateUrl: './individual-category.component.html',
  styleUrls: ['./individual-category.component.scss']
})
export class IndividualCategoryComponent implements OnInit {
  @Input() frame: any;
  @Input() editedCategory: Category;
  @Output() categoryUpdate: EventEmitter<Category>;
  validatingForm: FormGroup;

  constructor() {
    this.categoryUpdate = new EventEmitter<Category>();
  }

  ngOnInit(): void {
    this.validatingForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required)
    });
  }

  updateCategory(category: Category): void {
    this.categoryUpdate.emit(category);
  }

  get nameInput(): AbstractControl {
    return this.validatingForm.get('name');
  }

  get descriptionInput(): AbstractControl {
    return this.validatingForm.get('description');
  }

  isAllInputsValid(): boolean {
    return this.nameInput.valid && this.descriptionInput.valid;
  }
}
