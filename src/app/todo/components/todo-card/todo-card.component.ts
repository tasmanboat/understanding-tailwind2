import { Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap, map, switchMap, first } from 'rxjs/operators';
import { Todo } from '../../interfaces/todo';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo-card',
  templateUrl: './todo-card.component.html',
  styleUrls: ['./todo-card.component.scss']
})
export class TodoCardComponent implements OnInit {

  constructor(private service: TodoService) { }

  ngOnInit(): void {
  }

// #region records and filtered records
// an event will trigger filtering of todos
  filter$: BehaviorSubject<Filter> = new BehaviorSubject<Filter>('all');
  // updateFilter
  updateFilter(e: any) {
    const filter = e.target.value as Filter;
    this.filter$.next(filter);
  }
  todos$: Observable<Todo[]> = this.filter$.pipe(
    switchMap((filter: Filter) => {
      return this.service.getRecords().pipe(
        map((records: Todo[]) => {
          console.log(`filtering ...`);
          let filteredRecords: Todo[];
          switch(filter) {
            case 'all':
              filteredRecords = records;
              break;
            case 'completed':
              filteredRecords = records.filter(record => record.isCompleted === true);
              break;
            case 'uncompleted':
              filteredRecords = records.filter(record => record.isCompleted === false);
              break;
            default:
              filteredRecords = records;
              break;
          }
          return filteredRecords;
        })
      );
    })
  )
// #endregion


// #region trackById
  trackById(index: number, record: Todo): number {
    return record.id;
  }
// #endregion

// #region add a record
// trim the input

  todo: Todo = { content: '', isCompleted: false } as Todo;
  onSubmit() {
    if (this.todo.content.trim()) {
      this.lock = true;
      this.service.addRecord(this.todo).subscribe(_ => {
        this.lock = false;
        this.todo = { content: '', isCompleted: false } as Todo;
      });
    }
  }
  lock: boolean = false;

// #endregion

// #region update a record
  onUpdatedRecord(record: Todo) {
    this.service.updateRecord(record).subscribe();
  }
// #endregion

// #region delete a record
  onDeletedRecord(id: number) {
    this.service.deleteRecord(id).subscribe();
  }
// #endregion

}

type Filter = 'all' | 'completed' | 'uncompleted';
