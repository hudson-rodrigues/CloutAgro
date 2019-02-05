import { Observable } from 'rxjs';
import { CadastroAmostraPage } from './../cadastro-amostra/cadastro-amostra';
import { AmostraProvider } from './../../providers/amostra/amostra';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

/**
 * Generated class for the ListaAmostrasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lista-amostras',
  templateUrl: 'lista-amostras.html',
})
export class ListaAmostrasPage {

  amostras:Observable<any>;
  constructor(public navCtrl: NavController, public navParams: NavParams, public provider: AmostraProvider,
    private toast: ToastController) {
    this.amostras = this.provider.getAll();
  }

  newAmostra(){
    this.navCtrl.push(CadastroAmostraPage, {});
  }

  editAmostra(amostra: any){
    this.navCtrl.push(CadastroAmostraPage, {amostra: amostra});
  }
  removeAmostra(key: string){
    if (key) {
      this.provider.remove(key)
        .then(() => {
          this.toast.create({ message: 'Amostra removida com sucesso.', duration: 3000 }).present();
        })
        .catch(() => {
          this.toast.create({ message: 'Erro ao remover a amostra.', duration: 3000 }).present();
        });
    }
  }


}
