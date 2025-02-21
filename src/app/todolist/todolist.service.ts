import { Injectable } from '@angular/core';
import { data } from './todo.data.json';
import { ITask, Task } from './todo.model';
@Injectable({
  providedIn: 'root'
})
export class TodolistService {
  dd= Math.random();
  tasklist: ITask[] = data.map(t=>new Task(t));
  constructor() { }

}
