import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CadastroPropriedadePage } from './cadastro-propriedade';

@NgModule({
  declarations: [
    CadastroPropriedadePage,
  ],
  imports: [
    IonicPageModule.forChild(CadastroPropriedadePage),
  ],
})
export class CadastroPropriedadePageModule {}
