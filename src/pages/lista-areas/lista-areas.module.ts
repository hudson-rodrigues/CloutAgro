import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListaAreasPage } from './lista-areas';

@NgModule({
  declarations: [
    ListaAreasPage,
  ],
  imports: [
    IonicPageModule.forChild(ListaAreasPage),
  ],
})
export class ListaAreasPageModule {}
