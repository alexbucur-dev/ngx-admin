import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
const axios = require('axios');
import { SmartTableData } from '../../../@core/data/smart-table';
import {Router} from '@angular/router';

@Component({
  selector: 'ngx-smart-table',
  templateUrl: './sale-table.component.html',
  styleUrls: ['./sale-table.component.scss'],
})
export class SaleTableComponent {

  settings = {
    actions: {
      add: false,
      edit: false,
      delete: true,
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
      category_name: {
        title: 'Category',
        type: 'string',
      },
      price: {
        title: 'Price',
        type: 'string',
      },
      description: {
        title: 'Description',
        type: 'string',
        width:'50%'
      }
    },
  };

  source: LocalDataSource = new LocalDataSource();

   constructor(private service: SmartTableData, private router: Router) {
     this.source.load(this.getData());
   }
  getData(): void {
    const headers = {
      'Access-Control-Allow-Origin':'*',
      'Access-Control-Allow-Methods':'GET,POST,PUT,PATCH,DELETE,OPTIONS',
    }
    this.source.load([{'id':'1','firstName':'2'}]);
    var myThis = this;
    axios.get('http://angular.website/api/sale',{headers})
    .then(function (response) {
      myThis.source.load(response.data.info.saleproducts);
    })
    return []
  }
  deleteData(event): void {
    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,PUT,PATCH,DELETE,OPTIONS',
    };
    const sendDeleteRequest = async () => {
      try {
        const resp = await axios.get('http://angular.website/api/sale/delete/'+event.data.id, headers);
      } catch (err) {
        // Handle Error Here
        console.error(err);
      }
    };
    sendDeleteRequest();
  }
}
