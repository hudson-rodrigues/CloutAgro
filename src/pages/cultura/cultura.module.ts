import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CulturaPage } from './cultura';

@NgModule({
  declarations: [
    CulturaPage,
  ],
  imports: [
    IonicPageModule.forChild(CulturaPage),
  ],
})
export class CulturaPageModule {}
