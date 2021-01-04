import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualCategoryComponent } from './individual-category.component';

describe('IndividualCategoryComponent', () => {
  let component: IndividualCategoryComponent;
  let fixture: ComponentFixture<IndividualCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndividualCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndividualCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
