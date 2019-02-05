import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListaPropriedadesPage } from './lista-propriedades';

@NgModule({
  declarations: [
    ListaPropriedadesPage,
  ],
  imports: [
    IonicPageModule.forChild(ListaPropriedadesPage),
  ],
})
export class ListaPropriedadesPageModule {}
