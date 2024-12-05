import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from 'src/app/services/task.service';
import { Task } from 'src/app/models/task';
import { FormsModule } from '@angular/forms';
import { TaskDetailsComponent } from '../task-details/task-details.component';
import { Router } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';




@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule,FormsModule,TaskDetailsComponent,MatCheckboxModule,MatInputModule,MatFormFieldModule,MatButtonModule,MatIconModule,MatTableModule],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})

export class TaskListComponent implements OnInit {

  tasks: Task[]=[];
  filteredTasks: Task[]=[];
  currentTask: Task ={} as Task;
  keyword = '';
  displayedColumns: string[] = ['title', 'description', 'isCompleted','editAction'];

  constructor(private taskService: TaskService,private router: Router) {}

  ngOnInit(): void {
    
this.taskService.tasksList.subscribe((tasks:Task[]) => {
  this.tasks = tasks;
  this.filteredTasks = tasks;
});
    // this.retrieveTasks();
  }

  retrieveTasks(): void {
    // this.tasks=this.taskService.getAll();
  }

  setActiveTask(task: Task): void {
    this.currentTask = task;
    this.router.navigate(['/tasks', task.id]);
  }
  addTask():void{
    this.router.navigate(['/add']);
}

  editTask(e:Event,task: Task): void {
    e.stopPropagation()
    this.currentTask = task;
     this.router.navigate(['/tasks', task.id, 'edit']);

  }
  deleteTask(e:Event,task: Task): void {
    e.stopPropagation()
    this.taskService.deleteItem(task.id);
  }
  searchTitle(): void {
    this.currentTask = {} as Task;
    this.filteredTasks= this.tasks?.filter(x=>x.description.toLowerCase().includes(this.keyword.toLocaleLowerCase())||x.title.toLowerCase().includes(this.keyword.toLocaleLowerCase()))
    // this.taskService.findByTitle(this.title).subscribe({
    //   next: (data) => {
    //     this.tasks = data;
    //     console.log(data);
    //   },
    //   error: (e) => console.error(e)
    // });
  }

}
