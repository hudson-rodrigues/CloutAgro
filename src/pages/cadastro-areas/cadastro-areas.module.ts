import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CadastroAreasPage } from './cadastro-areas';

@NgModule({
  declarations: [
    CadastroAreasPage,
  ],
  imports: [
    IonicPageModule.forChild(CadastroAreasPage),
  ],
})
export class CadastroAreasPageModule {}
