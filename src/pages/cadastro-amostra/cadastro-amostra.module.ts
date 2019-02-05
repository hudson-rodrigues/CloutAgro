import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CadastroAmostraPage } from './cadastro-amostra';

@NgModule({
  declarations: [
    CadastroAmostraPage,
  ],
  imports: [
    IonicPageModule.forChild(CadastroAmostraPage),
  ],
})
export class CadastroAmostraPageModule {}
