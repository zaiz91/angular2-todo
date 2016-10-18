import { Injectable } from '@angular/core';

@Injectable()
export class Configuration {
    public Server: string = "http://serverurl/";
    public ApiUrl: string = "api/";
    public ServerWithApiUrl = this.Server + this.ApiUrl;
}


import Configuration from './configuration';

export default class TodoStore {
  
  constructor() {
    const storedItemsString = <string> this._http.get(this.actionUrl)
                              .map((response: Response) => <TodoItem>response.json())
                              .catch(this.handleError); || '[]';
    const storedItems = <Array<any>> JSON.parse(storedItemsString);
    const items = List<TodoItem>(storedItems.map(i => new TodoItem(i._data)));
    this.actionURL = Configuration.ServerWithApiURL;
  }


  get items(): List<TodoItem> {
    return this._http.get(this.actionUrl)
            .map((response: Response) => <TodoItem>response.json())
            .catch(this.handleError);
  }

  dispatch(action: ITodoAction) {
    this.store.dispatch(action);
  }
}
