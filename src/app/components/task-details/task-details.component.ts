import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from 'src/app/models/task';
import { TaskService } from 'src/app/services/task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {RouterModule} from '@angular/router';

@Component({
  selector: 'app-task-details',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterModule],
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent implements OnInit{
  @Input() viewMode = false;
  @Input() currentTask: Task = {description:'',id:0,isCompleted:false,title:''  } ;

  message = '';

  constructor(
    private TaskService: TaskService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.getTask(this.route.snapshot.params['id']);
    }
  }

  getTask(id: string): void {

    if (id) {
      this.TaskService.getItem(id).subscribe({
        next: (data) => {
            this.currentTask= data as Task;
        },
        error: (e) => console.error(e)
    }); 
    }
    else {
      this.currentTask = {} as Task
    }

  }

  updatePublished(status: boolean): void {
    const data = {
      title: this.currentTask.title,
      description: this.currentTask.description,
      isCompleted: status
    } as Task;

    this.message = '';

    this.TaskService.updateItem( data)
  }

  updateTask(): void {
    this.message = '';

    this.TaskService
      .updateItem( this.currentTask)
      
  }

  deleteTask(): void {
    this.TaskService.deleteItem(this.currentTask.id)
  }

}
