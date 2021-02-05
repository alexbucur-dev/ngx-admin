import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
const axios = require('axios');
import { SmartTableData } from '../../../@core/data/smart-table';
import {Router} from '@angular/router';

@Component({
  selector: 'ngx-smart-table',
  templateUrl: './category-table.component.html',
  styleUrls: ['./category-table.component.scss'],
})
export class CategoryTableComponent {
  settings = {
    actions: {
      add: false,
      edit: false,
      delete:true,
      custom: [
        {
          name: 'editAction',
          title: '<i class="nb-edit"></i>'
        },
      ],
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
      saveButtonContent: 'save',
      cancelButtonContent: 'cancel'
    },
    columns: {
      id: {
        title: 'ID',
        type: 'number',
      },
      name: {
        title: 'Name',
        type: 'string',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

   constructor(private service: SmartTableData, private router: Router) {
     //const data = this.service.getData();
     this.source.load(this.getData());
   }
  getData(): void {
    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,PUT,PATCH,DELETE,OPTIONS',
    }
    var myThis = this;
    axios.get('http://angular.website/api/categories',{headers})
      .then(function (response) {
        myThis.source.load(response.data);
      });
    return [];
  }
  deleteData(event): void {
    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,PUT,PATCH,DELETE,OPTIONS',
    };
    const sendDeleteRequest = async () => {
      try {
        const resp = await axios.get('http://angular.website/api/categories/delete/'+event.data.id, headers);
        console.log(resp.data);
      } catch (err) {
        // Handle Error Here
        console.error(err);
      }
    };
    sendDeleteRequest();
  }
  onEditConfirm(event) {
     //console.log(event)
    this.router.navigate(['/pages/products-sale/edit-category/'+event.data.id]);
  }
}
