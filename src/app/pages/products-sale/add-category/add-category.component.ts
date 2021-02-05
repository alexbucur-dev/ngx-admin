import { Component } from '@angular/core';
const axios = require('axios');

@Component({
  selector: 'ngx-form-layouts',
  styleUrls: ['./add-category.component.scss'],
  templateUrl: './add-category.component.html',
})
export class AddCategoryComponent {
  public name ='';
  addData(event): void {
    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,PUT,PATCH,DELETE,OPTIONS',
    };
    const sendPostRequest = async () => {
      try {
        var qs = require('qs');
        var data = {
          name:this.name
        }
        const resp = await axios.post('http://angular.website/api/categories/add', qs.stringify(data),{headers})
          .then(res => {

          },(error) => {

          });
        console.log(resp.data);
      } catch (err) {
        // Handle Error Here
        console.error(err);
      }
    };
    sendPostRequest();
  }
  onSave(event) {
    const value = event.target.value;
    this.name = value;
  }
}
