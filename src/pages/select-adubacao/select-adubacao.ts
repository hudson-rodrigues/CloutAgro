import { AdubacaoPage } from './../adubacao/adubacao';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the SelectAdubacaoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-select-adubacao',
  templateUrl: 'select-adubacao.html',
})
export class SelectAdubacaoPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  adubarProducao(){
    this.navCtrl.push(AdubacaoPage, {etapa: 'Produção'});
  }
}
