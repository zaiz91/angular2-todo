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


  public addItem = (item: TodoItem):  Observable<TodoItem> => {
        let toAdd = JSON.stringify({ item: item });

        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <TodoItem>response.json())
            .catch(this.handleError);
  }

  public removeItem = (id: int):  Observable<int> => {
        return this._http.post(this.actionUrl + "/remove", id, { headers: this.headers })
            .map((response: Response) => <TodoItem>response.json())
            .catch(this.handleError);
  }
  
  public updateItemText = (id: int, text: string):  Observable<int, string> => {
        return this._http.post(this.actionUrl + "/updatetext", [id, text], { headers: this.headers })
            .map((response: Response) => <TodoItem>response.json())
            .catch(this.handleError);
  }
  
  public updateItemCompletion = (id: int, completed: boolean):  Observable<int, boolean> => {
        return this._http.post(this.actionUrl + "/updatestate", [id, completed], { headers: this.headers })
            .map((response: Response) => <TodoItem>response.json())
            .catch(this.handleError);
  }

 
}
