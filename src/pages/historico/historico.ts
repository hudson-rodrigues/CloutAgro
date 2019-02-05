import { HistoricoProvider } from './../../providers/historico/historico';
import { Observable } from 'rxjs/Observable';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

/**
 * Generated class for the HistoricoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-historico',
  templateUrl: 'historico.html',
})
export class HistoricoPage {

  calagens:Observable<any>;
  adubacoes:Observable<any>;
  msgAdubacao = 'As doses de nitrogênio e potássio deve ser aplicada'+
  ' em parcelas de três a quatro vezes durante o período'+
  ' chuvoso geralmente em outubro a março, à intervalos'+
  ' de 40 a 60 dias.';
  constructor(public navCtrl: NavController, public navParams: NavParams, public provider: HistoricoProvider,
    public alertCtrl: AlertController) {
    this.calagens = provider.getAllCalagem();
    this.adubacoes = provider.getAllAdubacao();
  }

  showAlert() {
    const alert = this.alertCtrl.create({
      title: 'Informação!',
      subTitle: this.msgAdubacao,
      buttons: ['OK']
    });
    alert.present();
  }


}
