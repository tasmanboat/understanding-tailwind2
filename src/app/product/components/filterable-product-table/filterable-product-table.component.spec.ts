import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterableProductTableComponent } from './filterable-product-table.component';

describe('FilterableProductTableComponent', () => {
  let component: FilterableProductTableComponent;
  let fixture: ComponentFixture<FilterableProductTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterableProductTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterableProductTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
