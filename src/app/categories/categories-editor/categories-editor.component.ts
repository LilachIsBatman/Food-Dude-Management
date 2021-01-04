import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {cloneDeep} from 'lodash';
import {Category} from '../../entity/category.interface';

@Component({
  selector: 'app-categories-editor',
  templateUrl: './categories-editor.component.html',
  styleUrls: ['./categories-editor.component.scss']
})
export class CategoriesEditorComponent implements OnInit {
  @Input() category: Category;
  @Output() categoryUpdate: EventEmitter<Category>;
  editedCategory: Category;

  constructor() {
    this.categoryUpdate = new EventEmitter<Category>();
  }

  ngOnInit(): void {
    this.editedCategory = cloneDeep(this.category);
  }

  updateCategory(category: Category): void {
    this.categoryUpdate.emit(category);
  }
}
