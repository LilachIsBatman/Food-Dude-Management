import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Category} from '../../entity/category.interface';
import {Restaurant} from '../../entity/restaurant.interface';
import {AreaEnum} from '../../entity/area.enum';

@Component({
  selector: 'app-individual-restaurant',
  templateUrl: './individual-restaurant.component.html',
  styleUrls: ['./individual-restaurant.component.scss']
})
export class IndividualRestaurantComponent implements OnInit {
  @Input() frame: any;
  @Input() editedRestaurant: Restaurant;
  @Input() categories: Category[];
  @Input() selectedCategory: string;
  @Input() rating: number[];
  @Input() areas: AreaEnum[];
  @Output() restaurantUpdate: EventEmitter<Restaurant>;

  constructor() {
    this.restaurantUpdate = new EventEmitter<Restaurant>();
  }

  ngOnInit(): void {
  }

  updateRestaurant(restaurant: Restaurant): void {
    restaurant.category = this.categories.find(category => category.name === this.selectedCategory);
    this.restaurantUpdate.emit(restaurant);
  }
}
