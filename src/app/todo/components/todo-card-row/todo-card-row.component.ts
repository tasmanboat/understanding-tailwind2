import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Todo } from '../../interfaces/todo';

// a todo row
// it manage its lock state: when update a record, it locks itself until it receives a new record

@Component({
  selector: '[app-todo-card-row]',
  templateUrl: './todo-card-row.component.html',
  styleUrls: ['./todo-card-row.component.scss']
})
export class TodoCardRowComponent implements OnInit {
  // @Input() record!: Todo;
  @Input()
  set record(todo: Todo) {
    this._record = todo;
    this.lock = false;
  }
  get record(): Todo { return this._record }
  private _record!: Todo;

  @Output() updatedRecord: EventEmitter<Todo> = new EventEmitter<Todo>();
  @Output() deletedRecord: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

// #region update a record (edit, toggle)
// check if there is an update, if there is, make a POST request

// modify the copied record and update with the copied & modified record
// leave the original record alone, which is to be updated by @Input

  onToggle(e: any) {
    e.preventDefault();
    e.stopPropagation();
    if (this.record.isCompleted !== e.target.checked) {
      this.lock = true;
      const _record = {...this.record};
      _record.isCompleted = e.target.checked;
      this.updatedRecord.emit(_record);
    }
  }

  onBlur(e: any) {
    e.preventDefault();
    e.stopPropagation();
    if (this.record.content !== e.target.textContent) {
      this.lock = true;
      const _record = {...this.record};
      _record.content = e.target.textContent;
      this.updatedRecord.emit(_record);
    }
  }

  lock: boolean = false;

// #endregion

// #region delete a record
  onDelete(e: any) {
    e.preventDefault();
    e.stopPropagation();
    this.lock = true;
    this.deletedRecord.emit(this.record.id);
  }
// #endregion

}
