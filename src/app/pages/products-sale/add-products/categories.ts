import { Injectable } from '@angular/core';
import { Model, ModelFactory } from '@angular-extensions/model';
import { Observable } from 'rxjs';

let ID = 0;

const initialData: Todo[] = [];
@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private model: Model<Todo[]>;

  todos$: Observable<Todo[]>;

  constructor(private modelFactory: ModelFactory<Todo[]>) {
    this.model = this.modelFactory.create(initialData);
    this.todos$ = this.model.data$;
  }

  addTodo(categories) {
    const todos = this.model.get();
    for(var i = 0;i < categories.length;i++){
      const newTodo = {
        id: categories[i].value,
        name:categories[i].option
      }
      todos.push(newTodo);
    }
    this.model.set(todos);
  }

  removeTodo(id: number) {
    const todos = this.model.get();

    todos.splice(todos.findIndex(todo => todo.id === id), 1);

    this.model.set(todos);
  }

  toggleTodo(id: number) {
    const todos = this.model.get();

    const todo = todos.find(todo => todo.id === id);
    todo.done = !todo.done;

    this.model.set(todos);
  }
}

export interface Todo {
  id: number;
  name: string;
  done: boolean;
}
