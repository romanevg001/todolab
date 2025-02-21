import {
  ChangeDetectionStrategy,
  Component,
  inject,
  SkipSelf,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { getRouteParam$ } from '../../utils';
import { AsyncPipe } from '@angular/common';
import { map } from 'rxjs';
import { TodolistService } from '../todolist.service';

@Component({
  selector: 'app-task',
  imports: [AsyncPipe, RouterLink],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskComponent {
  todolistService = inject(TodolistService);
  task$ = getRouteParam$('id').pipe(map(id=>this.todolistService.tasklist.find((task)=>task.id ==id)));
 
  constructor(){}
}
