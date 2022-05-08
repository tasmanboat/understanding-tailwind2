import { Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap, map, switchMap, first } from 'rxjs/operators';
import { Todo } from '../../interfaces/todo';
import { TodoService } from '../../services/todo.service';

// a todo widget
// full functionality (GET, POST, PUT, DELETE)
// not set UI state according to web data loading / loaded state switch

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.scss']
})
export class WidgetComponent implements OnInit {

  constructor(private service: TodoService) { }

  ngOnInit(): void {
  }

// #region records and filtered records
// an event will trigger filtering of todos
  filter$: BehaviorSubject<Filter> = new BehaviorSubject<Filter>('completed');
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

// #region filters
  filters: Filter[] = ['all', 'completed', 'uncompleted'];
// #endregion

// #region update a record by toggling checkbox
// modify the copied record and update with the copied & modified record
// leave the original record alone, which is to be updated by new server data
  toggle(e: any, record: Todo) {
    if (record.isCompleted !== e.target.checked) {
      const _record = {...record};
      _record.isCompleted = e.target.checked;
      this.service.updateRecord(_record).subscribe();
    }
  }
// #endregion

// #region update a record by editing
// check if there is an update, if there is, make a POST request

  onBlur(e: any, record: Todo) {
    if (record.content !== e.target.textContent) {
      const _record = {...record};
      _record.content = e.target.textContent;
      this.service.updateRecord(_record).subscribe();
    }
  }

  // #endregion

// #region record count
  todoCount$: Observable<number> = this.service.getRecords().pipe(
    map((records: Todo[]) => records.length)
  )
// #endregion

// #region add a record
// trim the input

  todo: Todo = { content: '', isCompleted: false } as Todo;
  onSubmit() {
    if (this.todo.content.trim()) {
      this.service.addRecord(this.todo).subscribe();
      this.todo = { content: '', isCompleted: false } as Todo;
    }
  }

// #endregion

// #region delete a record
  delete(id: number) {
    this.service.deleteRecord(id).subscribe();
  }
// #endregion

}

type Filter = 'all' | 'completed' | 'uncompleted';
