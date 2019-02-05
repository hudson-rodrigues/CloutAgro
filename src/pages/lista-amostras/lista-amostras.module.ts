import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListaAmostrasPage } from './lista-amostras';

@NgModule({
  declarations: [
    ListaAmostrasPage,
  ],
  imports: [
    IonicPageModule.forChild(ListaAmostrasPage),
  ],
})
export class ListaAmostrasPageModule {}
