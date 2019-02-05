import { CulturaProvider } from './../../providers/cultura/cultura';
import { Observable } from 'rxjs';
import { CadastroCulturaPage } from './../cadastro-cultura/cadastro-cultura';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

/**
 * Generated class for the CulturaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cultura',
  templateUrl: 'cultura.html',
})
export class CulturaPage {

  culturas: Observable<any>;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public provider:CulturaProvider,
    public toast: ToastController
    ) {
      this.culturas = provider.getAll();
  }
  
  newCultura(){
    this.navCtrl.push(CadastroCulturaPage);
  }

  editCultura(cultura: any){
    this.navCtrl.push(CadastroCulturaPage, {cultura: cultura});
  }

  removeCultura(key: string){
    if (key) {
      this.provider.remove(key)
        .then(() => {
          this.toast.create({ message: 'Cultura removida com sucesso.', duration: 3000 }).present();
        })
        .catch(() => {
          this.toast.create({ message: 'Erro ao remover a Cultura.', duration: 3000 }).present();
        });
    }
  }

}
