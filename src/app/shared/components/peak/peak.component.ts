import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, map, catchError, delay } from 'rxjs/operators';
import { Todo } from 'src/app/todo/interfaces/todo';

@Component({
  selector: 'app-peak',
  templateUrl: './peak.component.html',
  styleUrls: ['./peak.component.scss']
})
export class PeakComponent implements OnInit {

  records$?: Observable<Todo[]>;
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    const recordsUrl = 'api/todos';
    this.records$ = this.http.get<Todo[]>(recordsUrl).pipe(
      // catchError(error => { throw new Error(error) }),
      catchError(error => {
        // throw new Error(error)
        console.error('(PeakComponent) records not found');
        return of([{ id: -1, content: '(not found)', isCompleted: false, created_at: -1, updated_at: -1 }] as Todo[]);
      })
    )
  }

}
