import { Component, OnInit } from '@angular/core';
import { TodoServiceService } from './todo-service.service';


@Component({
  selector: 'app-to-do-component',
  templateUrl: './to-do-component.component.html',
  styleUrls: ['./to-do-component.component.scss'],
  providers: [TodoServiceService]
})

export class ToDoComponentComponent implements OnInit {
  toDoListArray: any[];
  constructor(private toDoservice: TodoServiceService) { }

  ngOnInit() {
    this.toDoservice.getToDoList().snapshotChanges()
      .subscribe(item => {
        this.toDoListArray = [];
        item.forEach(elem => {
          var x = elem.payload.toJSON();
          x["$key"] = elem.key;
          console.log(x);
          this.toDoListArray.push(x);
        });

        this.toDoListArray.sort((a, b) => {
          return a.isChecked - b.isChecked;
        });

      });
  }

  onAdd(itemTitle){
    console.log("Clicked")
    this.toDoservice.addTitle(itemTitle.value);
    itemTitle.value = null;
  }

  alterCheck($key: string, isChecked){
    this.toDoservice.checkOrUncheckedTitle($key, !isChecked);
  }

  deleteTask($key: string){
    this.toDoservice.removeTitle($key);
  }

}
