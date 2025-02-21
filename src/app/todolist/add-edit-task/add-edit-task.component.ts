import { ChangeDetectionStrategy, Component, inject, linkedSignal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { getRouteParam$ } from '../../utils';
import { toSignal, } from '@angular/core/rxjs-interop';
import { ITask, Task } from '../todo.model';
import { DatepickerRangePopupComponent, IDate } from '../datepicker-range-popup/datepicker-range-popup.component';
import { NgbDate,  } from '@ng-bootstrap/ng-bootstrap';
import { Router, RouterLink } from '@angular/router';
import { TodolistService } from '../todolist.service';

@Component({
  selector: 'app-add-edit-task',
  imports: [ReactiveFormsModule, DatepickerRangePopupComponent, RouterLink],
  templateUrl: './add-edit-task.component.html',
  styleUrl: './add-edit-task.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddEditTaskComponent {
  todolistService = inject(TodolistService);

  taskForm!: FormGroup;
  fb: FormBuilder = inject(FormBuilder);
  router: Router = inject(Router);
  id = toSignal(getRouteParam$('id'));
  isEdit = linkedSignal<boolean>(()=>!!this.id());
  get data(): ITask | undefined {
    return this.todolistService.tasklist.find(({id})=> id == this.id())
  }
  currentDate: IDate | null = null;

  get fromDate() {
    if (!this.data) return null;
    let d = new Date(this.data?.startDate);
    return  NgbDate.from({month: d.getMonth()+1, day: d.getDate(), year: d.getFullYear()})
  }
  get toDate() {
    if (!this.data) return null;
    let d = new Date(this.data?.endDate);
    return  NgbDate.from({month: d.getMonth()+1, day: d.getDate(), year: d.getFullYear()})
  }


  constructor() {
    if (this.isEdit()) {
      this.createForm(this.data)
    } else{
      this.createForm();
    }
  }


  private createForm(data?:Omit<ITask,"id"|"isOpen"|"deadline">) {
    this.taskForm = this.fb.group({
      "title": [data?.title || '', Validators.compose([Validators.required,Validators.max(50),Validators.min(5)])],
      "description": [data?.description || ''],
    })
  }

  setDate(date: IDate) {
    this.currentDate = date;
  }

  

  onSubmit() {
    const formVal =  this.taskForm.value;

    if (this.isEdit()) {
      const dd = this.data;
      if(dd) {
        dd.title = formVal.title;
        dd.description = formVal.description;
        if (this.currentDate) {
          dd.startDate = this.currentDate.startDate;
          dd.endDate = this.currentDate.endDate;
        }
      }
    } else {
      this.todolistService.tasklist.push(new Task({
        id: Math.random(),
        ...formVal,
        ...this.currentDate,
        isOpen: false
      }))
    }
    this.router.navigate(['/']);
  }

}
