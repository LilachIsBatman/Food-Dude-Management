import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Category} from '../../entity/category.interface';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.scss']
})
export class CreateCategoryComponent implements OnInit {
  @Output() categoryCreate: EventEmitter<Category>;
  newCategory: Category;

  constructor() {
    this.categoryCreate = new EventEmitter<Category>();
  }

  ngOnInit(): void {
    this.newCategory = {_id: '', name: '', description: ''};
  }

  createCategory(category: Category): void {
    this.categoryCreate.emit(category);
  }
}
