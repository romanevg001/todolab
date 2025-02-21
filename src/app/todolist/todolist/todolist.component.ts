import { ChangeDetectionStrategy, Component, inject, LOCALE_ID } from '@angular/core';
import { ITask, DeadlineEnum, Task } from '../todo.model';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { TodolistService } from '../todolist.service';
import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem  } from '@angular/cdk/drag-drop';
@Component({
  selector: 'app-todolist',
  imports: [RouterLink,DatePipe, DragDropModule],
  templateUrl: './todolist.component.html',
  styleUrl: './todolist.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodolistComponent {
  todolistService = inject(TodolistService);
  deadlineEnum = DeadlineEnum;
  tasklist: ITask[] = this.todolistService.tasklist;



  drop(event: CdkDragDrop<any>) {
    if (event.previousContainer === event.container) {
      // Reorder items within the same list
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      // Move items between lists
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}
