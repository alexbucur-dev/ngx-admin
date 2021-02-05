import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
const axios = require('axios');
import { SmartTableData } from '../../../@core/data/smart-table';
import {Router} from '@angular/router';
const sendGetRequest = function () {

  var data = async () => {
    try {
      const resp = await axios.get('http://angular.website/api/categories-select');
      console.log(resp.data);
      return resp.data;
    } catch (err) {
      // Handle Error Here
      // console.error(err);
    }
  };
  return [];
};

@Component({
  selector: 'ngx-smart-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.scss'],
})
export class ProductsTableComponent {

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
        {
          name: 'migrateSale',
          title: '<i class="nb-paper-plane"></i>'
        }
      ],
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
      saveButtonContent: 'save',
      cancelButtonContent: 'cancel',
    },
    columns: {
      id: {
        title: 'ID',
        type: 'number'
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
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,PUT,PATCH,DELETE,OPTIONS',
    };
    let myThis = this;
    axios.get('http://angular.website/api/products', {headers})
    .then(function (response) {
      myThis.source.load(response.data.info.products);
      // myThis.settings.columns.category_id.editor.config.list = response.data.info.categories;
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
        const resp = await axios.get('http://angular.website/api/products/delete/'+event.data.id, headers);
        console.log(resp.data);
      } catch (err) {
        // Handle Error Here
        console.error(err);
      }
    };
    sendDeleteRequest();
  }
  onEditConfirm(event) {
     console.log(event)
    if(event.action == 'editAction'){
      this.router.navigate(['/pages/products-sale/edit-products/'+event.data.id]);
    }else if(event.action == 'migrateSale'){
      axios.get('http://angular.website/api/sale/migrate-to-sale-products/'+event.data.id).then(res=>{
          console.log(res.data)
      });
    }

  }
}
