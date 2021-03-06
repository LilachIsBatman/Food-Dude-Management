import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Restaurant} from '../../entity/restaurant.interface';
import {cloneDeep} from 'lodash';
import {Subject} from 'rxjs';
import {Category} from '../../entity/category.interface';
import {AreaEnum} from '../../entity/area.enum';

@Component({
  selector: 'app-restaurant-editor',
  templateUrl: './restaurant-editor.component.html',
  styleUrls: ['./restaurant-editor.component.scss']
})
export class RestaurantEditorComponent implements OnInit, OnDestroy {
  @Input() restaurant: Restaurant;
  @Input() categories: Category[];
  @Input() areas: AreaEnum[];
  @Input() rating: number[];
  @Output() restaurantUpdate: EventEmitter<Restaurant>;
  editedRestaurant: Restaurant;
  destroy$: Subject<void>;

  constructor() {
    this.restaurantUpdate = new EventEmitter<Restaurant>();
  }

  ngOnInit(): void {
    this.editedRestaurant = cloneDeep(this.restaurant);
    this.destroy$ = new Subject<void>();
  }

  updateRestaurant(restaurant: Restaurant): void {
    this.restaurantUpdate.emit(restaurant);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }
}
