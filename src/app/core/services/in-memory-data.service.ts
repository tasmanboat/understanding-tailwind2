import { Injectable } from '@angular/core';
import { InMemoryDbService, ResponseOptions } from 'angular-in-memory-web-api';
import { Todo } from 'src/app/todo/interfaces/todo';
import { TODOS } from 'src/app/core/services/mock-todos';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  constructor() { }

// #region API endpoint
/*
GET /api/todos
POST /api/todos
GET /api/todos/1
PUT /api/todos/1
DELETE /api/todos/1
*/
  createDb() {
    return { todos: TODOS };
  }
// #endregion

  genId(records: Todo[]): number {
    return records.length > 0 ? Math.max(...records.map(record => record.id))+1 : 11;
  }

  responseInterceptor(res: ResponseOptions, ri: RequestInfo): ResponseOptions {
    // console.log((ri as any)?.url);
    // console.log((ri as any)?.method);
    // console.log(res.body);
    // console.log(Array.isArray(res.body));
    return res;
  }

}
