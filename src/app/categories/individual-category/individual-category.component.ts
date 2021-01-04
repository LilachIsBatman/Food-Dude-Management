import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Category} from '../../entity/category.interface';

@Component({
  selector: 'app-individual-category',
  templateUrl: './individual-category.component.html',
  styleUrls: ['./individual-category.component.scss']
})
export class IndividualCategoryComponent implements OnInit {
  @Input() frame: any;
  @Input() editedCategory: Category;
  @Output() categoryUpdate: EventEmitter<Category>;

  constructor() {
    this.categoryUpdate = new EventEmitter<Category>();
  }

  ngOnInit(): void {
  }

  updateCategory(category: Category): void {
    this.categoryUpdate.emit(category);
  }
}
