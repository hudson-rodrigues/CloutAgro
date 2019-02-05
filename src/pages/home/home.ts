import { AngularFireDatabase } from 'angularfire2/database';
import { CalagemProvider } from './../../providers/calagem/calagem';
import { HistoricoProvider } from './../../providers/historico/historico';
import { CulturaProvider } from './../../providers/cultura/cultura';
import { CulturaPage } from './../cultura/cultura';
import { LoginPage } from './../login/login';
import { AmostraProvider } from './../../providers/amostra/amostra';
import { ListaAreasPage } from './../lista-areas/lista-areas';
import { ListaPropriedadesPage } from './../lista-propriedades/lista-propriedades';
import { ListaAmostrasPage } from './../lista-amostras/lista-amostras';
import { HistoricoPage } from './../historico/historico';
import { CalagemPage } from './../calagem/calagem';
import { Component } from '@angular/core';
import { NavController, LoadingController, NavParams } from 'ionic-angular';
import { PropriedadeProvider } from '../../providers/propriedade/propriedade';
import { AreaProvider } from '../../providers/area/area';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { SelectAdubacaoPage } from '../select-adubacao/select-adubacao';
import { AdubacaoProvider } from '../../providers/adubacao/adubacao';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public provider: PropriedadeProvider,
    public providerArea: AreaProvider,
    public providerAmostra: AmostraProvider,
    public providerHistorico: HistoricoProvider,
    public providerCultura: CulturaProvider,
    public providerCalagem: CalagemProvider,
    public providerAdubacao: AdubacaoProvider,
    public authService: UsuarioProvider,
    public navParams: NavParams,
    public db: AngularFireDatabase
    ) {
  }
  propriedades(){
    this.navCtrl.push(ListaPropriedadesPage, {});
  }
  areas(){
    this.navCtrl.push(ListaAreasPage, {});
  }
  amostras(){
    this.navCtrl.push(ListaAmostrasPage, {});
  }
  calagem(){
    this.navCtrl.push(CalagemPage, {});
  }
  adubacao(){
      this.navCtrl.push(SelectAdubacaoPage, {});
  }
  cultura(){
    this.navCtrl.push(CulturaPage);
  }
  historico(){
    this.navCtrl.push(HistoricoPage, {});
  } 
  signOut() {
    this.authService.signOut()
      .then(() => {
        this.authService.usuario.uid = this.provider.UID = this.provider.PROPERTY = this.providerHistorico.UID = this.providerHistorico.KEY_PROPERTY = '';
        this.providerCultura.UID = this.providerCalagem.UID = this.providerCalagem.KEY_PROPERTY = this.providerArea.UID = this.providerArea.KEY_PROPERTY = '';
        this.providerAmostra.UID = this.providerAmostra.KEY_PROPERTY = this.providerAmostra.KEY_AREA = this.providerArea.TALHAO = '';
        this.providerAdubacao.UID = this.providerAdubacao.KEY_PROPERTY = '' 
        this.db.database.goOffline();
        this.navCtrl.setRoot(LoginPage);
      })
      .catch((erro) => {
        console.error(erro);
      });
  }
  

}


