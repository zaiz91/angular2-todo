import {Component} from 'angular2/core';
import TodoStore from '../store/todostore';
import TodoItem from '../todoitem/todoitem';
import ItemUpdatedEvent from '../todoitem/itemupdatedevent';
import {addItem, removeItem, updateItemText, updateItemCompletion} from '../store/actions';

/* Component wird definiert, TemplateURL, Style URL und Direktive wird gesetzt */

@Component({
  selector: 'todo-list',
  templateUrl: 'todolist/todolist.html',
  styleUrls: ['todolist/todolist.css'],
  directives: [TodoItem]
})

export default class TodoList {
  newItem = 'test';
  store: TodoStore; // Store, in diesem Fall die REST - Verbindung wird gesetzt

  constructor(store: TodoStore) {
    this.store = store;
  }

  // addItem ruft die addItem-Methode vom Store auf und übergibt den neuen Eintrag
  addItem() {
    this.store.dispatch(addItem(this.newItem));
    this.newItem = '';
  }

  // ruft die removeItem - Methode vom Store auf mit der ID des zu löschenden Eintrages
  removeItem(itemId: string) {
    this.store.dispatch(removeItem(itemId));
  }

  itemUpdated(event: ItemUpdatedEvent) {
    if (event.text !== undefined) {
      if (event.text === '') { // ist die länge des Textes < 1
        this.store.dispatch(removeItem(event.itemId)); // lösche das Element
      } else {
        this.store.dispatch(updateItemText(event.itemId, event.text)); // ansonsten rufe die updateItem - Methode des Stores auf
      }
    }
    if (event.completed !== undefined) {
      this.store.dispatch(updateItemCompletion(event.itemId, event.completed)); // Aktualisiert den Status des Elements
    }
  }

}
