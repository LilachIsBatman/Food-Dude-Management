import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Restaurant} from '../../entity/restaurant.interface';
import {Category} from '../../entity/category.interface';
import {Subject} from 'rxjs';
import {AreaEnum} from '../../entity/area.enum';

@Component({
  selector: 'app-new-restaurant',
  templateUrl: './new-restaurant.component.html',
  styleUrls: ['./new-restaurant.component.scss']
})
export class NewRestaurantComponent implements OnInit, OnDestroy {
  @Input() categories: Category[];
  @Input() areas: AreaEnum[];
  @Input() rating: number[];
  @Output() restaurantUpdate: EventEmitter<Restaurant>;
  newRestaurant: Restaurant;
  destroy$: Subject<void>;

  constructor() {
    this.restaurantUpdate = new EventEmitter<Restaurant>();
  }

  ngOnInit(): void {
    this.destroy$ = new Subject<void>();
    this.newRestaurant = {category: {_id: '', name: '', description: ''}, rating: 5, _id: '', description: '', name: '', imageUrl: '',
    address: {area: AreaEnum.All, city: '', street: '', houseNumber: 0}};
  }

  createRestaurant(restaurant: Restaurant): void {
    this.restaurantUpdate.emit(restaurant);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }
}
