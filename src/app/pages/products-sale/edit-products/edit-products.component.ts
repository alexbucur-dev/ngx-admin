import { Component ,Input} from '@angular/core';
import { TodoService } from './categories';
const axios = require('axios');
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'ngx-form-layouts',
  styleUrls: ['./edit-products.component.scss'],
  templateUrl: './edit-products.component.html',
})
export class EditProductsComponent {
  @Input() data = [];
  constructor(public todoService: TodoService,private router: ActivatedRoute) {
    this.catData();
    this.editInfo();
  }
  editInfo(): void {
    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,PUT,PATCH,DELETE,OPTIONS',
    };
    try {
      axios.get('http://angular.website/api/products/edit/' + this.router.snapshot.params.id, headers).then(res=>{
        this.data = res.data.edit
      });

    } catch (err) {
      // Handle Error Here
      console.error(err);
    }
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
        const resp = await axios.post('http://angular.website/api/products/update/'+ this.router.snapshot.params.id, qs.stringify(this.data), {headers})
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
