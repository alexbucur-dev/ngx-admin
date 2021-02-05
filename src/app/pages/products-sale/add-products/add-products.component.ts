import {Component} from '@angular/core';
import { TodoService } from './categories';
const axios = require('axios');

@Component({
  selector: 'ngx-form-layouts',
  styleUrls: ['./add-products.component.scss'],
  templateUrl: './add-products.component.html',
})
export class AddProductsComponent {
  public data : string[] = [];
  constructor(public todoService: TodoService) {
    this.catData()
  }
  catData(): void {
    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,PUT,PATCH,DELETE,OPTIONS',
    };
    try {
      axios.get('http://angular.website/api/categories-select', headers).then(res=>{
        this.todoService.addTodo(res.data.info.categories);
      });
    } catch (err) {
      // Handle Error Here
      console.error(err);
    }
  }
  addData(event): void {
    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,PUT,PATCH,DELETE,OPTIONS',
    };
    const sendPostRequest = async () => {
      try {
        var qs = require('qs');
        const resp = await axios.post('http://angular.website/api/products/add', qs.stringify(this.data), {headers})
          .then(res => {

          },(error) => {

          });
      } catch (err) {
        // Handle Error Here
        console.error(err);
      }
    };
    sendPostRequest();
  }
  onSave(event) {
    this.data[event.target.name] = event.target.value;
  }
  onSaveCategory(event) {
    this.data['category_id'] = event;
  }
}
