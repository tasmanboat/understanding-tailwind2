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

// #region update a record by toggling checkbox

// modify the copied record and update with the copied & modified record
// leave the original record alone, which is to be updated by new server data

// disable the button timely

  toggle(e: any, record: Todo) {
    if (record.isCompleted !== e.target.checked) {
      e.target.disabled = true;
      const _record = {...record};
      _record.isCompleted = e.target.checked;
      this.service.updateRecord(_record).subscribe(_ => {
        e.target.disabled = false;
      });
    }
  }

// #endregion

// #region update a record by editing
// check if there is an update, if there is, make a POST request

  onBlur(e: any, record: Todo) {
    if (record.content !== e.target.textContent) {
      this.editable = false;
      const _record = {...record};
      _record.content = e.target.textContent;
      this.service.updateRecord(_record).subscribe(_ => this.editable = true);
    }
  }
  editable: boolean = true;

// #endregion

// #region delete a record
// disable the button timely
  delete(e:any, id: number) {
    e.target.disabled = true;
    this.service.deleteRecord(id).subscribe(_ => e.target.disabled = false);
  }
// #endregion

}

type Filter = 'all' | 'completed' | 'uncompleted';
