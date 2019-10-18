import { Component } from '@angular/core';
import { NavController, ItemSliding } from 'ionic-angular';
import { Task } from './task';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Dialogs } from '@ionic-native/dialogs';
import { Platform } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'tasklist.html'
})
export class TaskListPage {
  taskList: AngularFireList<Task>;
  tasks: Observable<any[]>;
  constructor(public navCtrl: NavController, public af: AngularFireDatabase, private dialogs: Dialogs,
    private platform: Platform) {
    this.taskList = this.af.list('/tasks');
    this.tasks = this.taskList.valueChanges();
  }

  addItem() {
    if (this.platform.is('cordova')) {
      this.dialogs.prompt('Add a task', 'Ionic2Do', ['Ok', 'Cancel'], '')
        .then(
          theResult => {
            if (theResult.buttonIndex == 1 && theResult.input1 !== '') {
              const newTaskRef = this.taskList.push({ id: '', title: theResult.input1, status: 'open' });
              newTaskRef.update({ id: newTaskRef.key });
            }
          }
        )
    } else {
      let theNewTask: string = prompt("New Task");
      if (theNewTask != undefined && theNewTask !== '') {
        const newTaskRef = this.taskList.push({ id: '', title: theNewTask, status: 'open' });
        newTaskRef.update({ id: newTaskRef.key });
      }
    }
  }

  markAsDone(slidingItem: ItemSliding, task: Task) {
    task.status = "done";
    this.taskList.update(task.id, task)
    slidingItem.close();
  }
  removeTask(slidingItem: ItemSliding, task: Task) {
    this.taskList.remove(task.id);
    slidingItem.close();
  }
}
