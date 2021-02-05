import { NgModule } from '@angular/core';
import {NbButtonModule, NbCardModule, NbIconModule, NbInputModule, NbTreeGridModule, NbSelectModule} from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ThemeModule } from '../../@theme/theme.module';
import { SPTablesRoutingModule, routedComponents } from './products-sale-routing.module';


@NgModule({
  imports: [
    NbCardModule,
    NbButtonModule,
    NbTreeGridModule,
    NbIconModule,
    NbInputModule,
    ThemeModule,
    SPTablesRoutingModule,
    Ng2SmartTableModule,
    NbSelectModule,
  ],
  declarations: [
    ...routedComponents,
  ],
})
export class TablesModule { }
