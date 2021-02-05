import {Component, Input} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
const axios = require('axios');

@Component({
  selector: 'ngx-form-layouts',
  styleUrls: ['./edit-category.component.scss'],
  templateUrl: './edit-category.component.html',
})
export class EditCategoryComponent {
  public name ='';
  @Input() data = '';
  constructor(private router: ActivatedRoute) {
    this.editInfo();
  }
  editInfo(): void {
    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,PUT,PATCH,DELETE,OPTIONS',
    };
    try {
      axios.get('http://angular.website/api/categories/edit/' + this.router.snapshot.params.id, headers).then(res=>{
        this.data = res.data.edit
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
        var data = {
          name:this.name
        }
        const resp = await axios.post('http://angular.website/api/categories/update/'+ this.router.snapshot.params.id, qs.stringify(data),{headers})
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
