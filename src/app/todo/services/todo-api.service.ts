import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, map, catchError, delay } from 'rxjs/operators';
import { Todo } from 'src/app/todo/interfaces/todo';
import { PersistentStorageService } from 'src/app/core/services/persistent-storage.service';

@Injectable({
  providedIn: 'root'
})
export class TodoApiService {

  constructor(private http: HttpClient, private pss: PersistentStorageService) { }

  getRecords(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.recordsUrl).pipe(
      catchError(error => { throw new Error(error) })
    )
  }

  updateRecord(record: Todo): Observable<any> {
    return this.http.put(this.recordsUrl, record, this.httpOptions).pipe(
      // tap(_ => this.performSideEffect()),
      catchError(error => { throw new Error(error) })
    )
  }

  addRecord(record: Todo): Observable<Todo> {
    return this.http.post<Todo>(this.recordsUrl, record, this.httpOptions).pipe(
      // tap((newRecord: Todo) => this.performSideEffect()),
      catchError(error => { throw new Error(error) })
    )
  }

  getRecord(id: number): Observable<Todo> {
    const url = `${this.recordsUrl}/${id}`;
    return this.http.get<Todo>(url).pipe(
      catchError(error => {
        console.error(`(record-api.service.ts) getRecord error`)
        throw new Error(error)
      })
    );
  }

  deleteRecord(id: number): Observable<Todo> {
    const url = `${this.recordsUrl}/${id}`;
    return this.http.delete<Todo>(url, this.httpOptions).pipe(
      // tap(_ => this.performSideEffect()),
      catchError(error => { throw new Error(error) })
    )
  }

  private performSideEffect() {
    // side effect
    this.http.get<Todo[]>(this.recordsUrl).subscribe(r => {
      const str = JSON.stringify(r);
      this.pss.setItemAsync('todos', str); // not block
    })
  }

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }
  private recordsUrl = 'api/todos';

}
