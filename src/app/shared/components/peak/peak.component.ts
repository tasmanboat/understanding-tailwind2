import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, map, catchError, delay } from 'rxjs/operators';
import { Todo } from 'src/app/todo/interfaces/todo';
import { TodoService } from 'src/app/todo/services/todo.service';

@Component({
  selector: 'app-peak',
  templateUrl: './peak.component.html',
  styleUrls: ['./peak.component.scss']
})
export class PeakComponent implements OnInit {

  records$?: Observable<Todo[]>;
  constructor(
    private http: HttpClient,
    private service: TodoService,
  ) { }

  ngOnInit(): void {
    const recordsUrl = 'api/todos';
    this.records$ = this.getRecords(); // manually get new data
    // this.records$ = this.service.getRecords(); // auto get new data
  }

  onClicked(e: any): void {
    this.records$ = this.getRecords(); // manually get new data
    // this.records$ = this.service.getRecords(); // auto get new data
  }

  private getRecords(): Observable<Todo[]> {
    const recordsUrl = 'api/todos';
    return this.http.get<Todo[]>(recordsUrl).pipe(
      // catchError(error => { throw new Error(error) }),
      catchError(error => {
        // throw new Error(error)
        console.error('(PeakComponent) records not found');
        return of([{ id: -1, content: '(not found)', isCompleted: false, created_at: -1, updated_at: -1 }] as Todo[]);
      })
    )
  }

}
