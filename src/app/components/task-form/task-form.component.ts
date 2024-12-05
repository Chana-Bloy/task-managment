import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from 'src/app/models/task';
import { TaskService } from 'src/app/services/task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';




@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule,MatInputModule,MatCheckboxModule,MatButtonModule],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {

  tasks?: Task[];
  @Input() viewMode = false;

  @Input() currentTask: Task = { description: '', id: 0, isCompleted: false, title: '' };

  message = '';

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router
  ) { }
  submitted = false;
  id!: string;
  ngOnInit(): void {
    this.taskService.tasksList.subscribe((tasks:Task[]) => {
      this.tasks = tasks;
    });
    if (!this.viewMode) {
      this.message = '';
      this.id = this.route.snapshot.params['id'];
      this.getTask(this.id);
    }
  }

  getTask(id: string): void {
    if (id) {
      this.taskService.getItem(id).subscribe({
        next: (data) => {
            debugger;
            this.currentTask= data as Task;
        },
        error: (e) => console.error(e)
    }); 
    }
    else {
      this.currentTask = {} as Task
    }
  }

  saveTask(): void {
    if (this.id) {
      this.updateTask();
    }
    else {
      this.createTask();
    }
    this.router.navigate(['/tasks']);
  }

  updateTask(): void {
    this.message = '';
    this.taskService
      .updateItem( this.currentTask)   
  }

  createTask(): void {
    const data = {
      title: this.currentTask.title,
      description: this.currentTask.description,
      isCompleted:this.currentTask.isCompleted
    } as Task;
    this.taskService.addItem(data)
  }

  newTask(): void {
    this.submitted = false;
    this.currentTask = {
      title: '',
      description: '',
      isCompleted: false
    } as Task;
  }

}

