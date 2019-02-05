import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CadastroCulturaPage } from './cadastro-cultura';

@NgModule({
  declarations: [
    CadastroCulturaPage,
  ],
  imports: [
    IonicPageModule.forChild(CadastroCulturaPage),
  ],
})
export class CadastroCulturaPageModule {}
