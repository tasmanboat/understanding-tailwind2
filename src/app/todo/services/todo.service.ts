import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subject, ReplaySubject, of } from 'rxjs';
import { tap, map, catchError, delay } from 'rxjs/operators';
import { Todo } from 'src/app/todo/interfaces/todo';
import { TodoApiService } from 'src/app/todo/services/todo-api.service';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private records$: ReplaySubject<Todo[]> = new ReplaySubject<Todo[]>(1);
  constructor(private apiService: TodoApiService) {
    this.loadRecords();
  }

  // load records for view
  private loadRecords() {
    this.apiService.getRecords().subscribe(records => {
      this.records$.next(records);
    })
  }

  // not sending network request, but read from cache in ReplaySubject
  getRecords(): Observable<Todo[]> {
    return this.records$.asObservable()
  }

  updateRecord(record: Todo): Observable<any> {
    return this.apiService.updateRecord(record).pipe(tap(_ => this.loadRecords()))
  }

  addRecord(record: Todo): Observable<Todo> {
    const timestamp = String(Date.now()).slice(0, -3);
    const modifiedRecord: Todo = { content: record.content, isCompleted: record.isCompleted, created_at: +timestamp, updated_at: +timestamp } as Todo;
    return this.apiService.addRecord(modifiedRecord).pipe(tap(_ => this.loadRecords()))
  }

  getRecord(id: number): Observable<Todo> {
    return this.apiService.getRecord(id).pipe(
      catchError(error => {
        console.error(`(record.service.ts) getRecord error`);
        return of({ id: -1, content: '(not found)', isCompleted: false, created_at: -1, updated_at: -1 } as Todo);
      })
    )
  }

  // not sending network request, instead read from cache in ReplaySubject
  // due to its dependence on this.records$ stream, it may trigger splash error in the create record scenario
  /*
  getRecord(id: number): Observable<Record> {
    return this.records$.asObservable().pipe(
      map(records => {
        const record = records.filter(r => r.id === id).pop()!;
        if (!record) { return { id: -1, content: '', isCompleted: false } as Record }
        return record;
      })
    )
  }
  */

  deleteRecord(id: number): Observable<Todo> {
    return this.apiService.deleteRecord(id).pipe(tap(_ => this.loadRecords()))
  }

}
