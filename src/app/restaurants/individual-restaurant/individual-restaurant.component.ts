import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Category } from '../../entity/category.interface';
import { Restaurant } from '../../entity/restaurant.interface';
import { AreaEnum } from '../../entity/area.enum';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import * as Joi from 'joi';

@Component({
  selector: 'app-individual-restaurant',
  templateUrl: './individual-restaurant.component.html',
  styleUrls: ['./individual-restaurant.component.scss'],
})
export class IndividualRestaurantComponent implements OnInit {
  @Input() frame: any;
  @Input() editedRestaurant: Restaurant;
  @Input() categories: Category[];
  @Input() selectedCategory: string;
  @Input() rating: number[];
  @Input() areas: AreaEnum[];
  @Output() restaurantUpdate: EventEmitter<Restaurant>;
  validatingForm: FormGroup;

  constructor() {
    this.restaurantUpdate = new EventEmitter<Restaurant>();
  }

  ngOnInit(): void {
    this.validatingForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      city: new FormControl(null, Validators.required),
      street: new FormControl(null, Validators.required),
      houseNumber: new FormControl(null, Validators.required),
      imageUrl: new FormControl(null, [Validators.required, this.uri()]),
    });
  }

  updateRestaurant(restaurant: Restaurant): void {
    restaurant.category = this.categories.find(
      (category) => category.name === this.selectedCategory
    );
    this.restaurantUpdate.emit(restaurant);
  }

  get nameInput(): AbstractControl {
    return this.validatingForm.get('name');
  }

  get descriptionInput(): AbstractControl {
    return this.validatingForm.get('description');
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

  get imageUrlInput(): AbstractControl {
    return this.validatingForm.get('imageUrl');
  }

  isAllInputsValid(): boolean {
    return (
      this.nameInput.valid &&
      this.descriptionInput.valid &&
      this.cityInput.valid &&
      this.streetInput.valid &&
      this.houseNumberInput.valid &&
      this.imageUrlInput.valid
    );
  }

  private uri(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const { error } = Joi.string().uri().validate(control.value);
      return !error ? null : { error };
    };
  }
}
