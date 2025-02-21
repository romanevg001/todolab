import { Routes } from '@angular/router';
import { TodolistComponent } from './todolist/todolist/todolist.component';
import { TaskComponent } from './todolist/task/task.component';
import { AddEditTaskComponent } from './todolist/add-edit-task/add-edit-task.component';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: TodolistComponent,
    },
    {
        path: 'task/add',
        component: AddEditTaskComponent,
    }, 
    {
        path: 'task/edit/:id',
        component: AddEditTaskComponent,
    }, 
    {
        path: 'task/:id',
        component: TaskComponent,
    },
     
];
