import { Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap, map, switchMap, first } from 'rxjs/operators';
import { Todo } from '../../interfaces/todo';
import { TodoService } from '../../services/todo.service';

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
  filter$: BehaviorSubject<Filter> = new BehaviorSubject<Filter>(`all`);
  // updateFilter
  onFiltered(filter: string) {
    this.filter$.next(filter as Filter);
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



}

type Filter = 'all' | 'completed' | 'uncompleted';
