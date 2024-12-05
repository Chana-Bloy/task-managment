import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task } from '../models/task';
import { HttpClient } from '@angular/common/http';

const baseUrl = 'https://localhost:7251/api/tasks';

@Injectable({
    providedIn: 'root'
})
export class TaskService {
    private tasksSubject = new BehaviorSubject<Task[]>([]);
    tasksList = this.tasksSubject.asObservable();

    constructor(private http: HttpClient) {
        this.getItems();
    }
    // Create
    addItem(item: Task) {
        return this.http.post(baseUrl, item).subscribe({
            next: (res) => {
                const currentItems = this.tasksSubject.value;
                this.tasksSubject.next([...currentItems, res as Task]);
            },
            error: (e) => console.error(e)
        });


    }

    // Read
    getItems() {
        this.http.get<Task[]>(baseUrl).subscribe({
            next: (data) => {
                this.tasksSubject.next(data);
            },
            error: (e) => console.error(e)
        });
    }
    getItem(id: string): Observable<Task>{
        return this.http.get<Task>(`${baseUrl}/${id}`)
    }
 

    // Update
    updateItem(updatedItem: Task) {
        this.http.put(`${baseUrl}/${updatedItem.id}`, updatedItem).subscribe({
            next: (res) => {
                const currentItems = this.tasksSubject.value;
                const index = currentItems.findIndex(item => item.id === updatedItem.id);
                if (index > -1) {
                    currentItems[index] = res as Task;
                    this.tasksSubject.next([...currentItems]);

                }
            },
            error: (e) => console.error(e)
        });

    }


    // Delete
    deleteItem(id: number) {


         this.http.delete(`${baseUrl}/${id}`).subscribe({
            next: (res) => {
                const currentItems = this.tasksSubject.value;
                const updatedItems = currentItems.filter(item => item.id !== id);
                this.tasksSubject.next(updatedItems);
            },
            error: (e) => console.error(e)
        });
    }
}

