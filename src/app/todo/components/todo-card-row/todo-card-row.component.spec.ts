import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoCardRowComponent } from './todo-card-row.component';

describe('TodoCardRowComponent', () => {
  let component: TodoCardRowComponent;
  let fixture: ComponentFixture<TodoCardRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodoCardRowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoCardRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
