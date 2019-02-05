import { AdubacaoProvider } from './../../providers/adubacao/adubacao';
import { CalagemProvider } from './../../providers/calagem/calagem';
import { HistoricoProvider } from './../../providers/historico/historico';
import { AmostraProvider } from './../../providers/amostra/amostra';
import { AreaProvider } from './../../providers/area/area';
import { HomePage } from './../home/home';
import { Observable } from 'rxjs';
import { PropriedadeProvider } from './../../providers/propriedade/propriedade';
import { CadastroPropriedadePage } from './../cadastro-propriedade/cadastro-propriedade';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

/**
 * Generated class for the ListaPropriedadesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lista-propriedades',
  templateUrl: 'lista-propriedades.html',
})
export class ListaPropriedadesPage {

  properties: Observable<any>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private provider:PropriedadeProvider,
    private providerArea: AreaProvider,
    private providerAmostra: AmostraProvider,
    public providerHistorico: HistoricoProvider,
    public providerCalagem: CalagemProvider,
    public providerAdubacao: AdubacaoProvider,
    private toast:ToastController) {
      this.properties = this.provider.getAll();
  }

  selectProperty(property:any){
    this.providerArea.KEY_PROPERTY = this.providerAmostra.KEY_AREA = this.providerArea.TALHAO = this.providerAmostra.KEY_PROPERTY = '';
    //name da propriedade selecionada para aparecer na tela home
    this.provider.PROPERTY = property.name;

    //key do usuario
    this.providerArea.UID = this.providerHistorico.UID = this.providerCalagem.UID = this.provider.UID;
    //key da propriedade selecionada para salvar no banco relacionando com a area
    this.providerCalagem.KEY_PROPERTY = this.providerAdubacao.KEY_PROPERTY = this.providerArea.KEY_PROPERTY = this.providerHistorico.KEY_PROPERTY = property.key;
    this.navCtrl.setRoot(HomePage);
  }

  newProperty(){
    this.navCtrl.push(CadastroPropriedadePage, {});
  }
  editProperty(propriedade: any){
    this.navCtrl.push(CadastroPropriedadePage, {propriedade: propriedade});
  }
  removeProperty(propriedade) {
    if(propriedade.name == this.provider.PROPERTY){
      this.providerArea.KEY_PROPERTY = this.providerAmostra.KEY_AREA = this.providerArea.TALHAO = this.provider.PROPERTY = this.providerAmostra.KEY_PROPERTY = '';
    }
    if (propriedade.key) {
      this.provider.remove(propriedade.key)
        .then(() => {
          this.toast.create({ message: 'Propriedade removida com sucesso.', duration: 3000 }).present();
        })
        .catch(() => {
          this.toast.create({ message: 'Erro ao remover a propriedade.', duration: 3000 }).present();
        });
    }
  }

}
