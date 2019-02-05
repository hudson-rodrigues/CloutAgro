import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CadastroAgronomoPage } from './cadastro-agronomo';

@NgModule({
  declarations: [
    CadastroAgronomoPage,
  ],
  imports: [
    IonicPageModule.forChild(CadastroAgronomoPage),
  ],
})
export class CadastroAgronomoPageModule {}
