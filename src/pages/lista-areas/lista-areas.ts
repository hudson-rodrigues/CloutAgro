import { HomePage } from './../home/home';
import { AmostraProvider } from './../../providers/amostra/amostra';
import { CadastroAreasPage } from './../cadastro-areas/cadastro-areas';
import { AreaProvider } from './../../providers/area/area';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Observable } from 'rxjs';

/**
 * Generated class for the ListaAreasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lista-areas',
  templateUrl: 'lista-areas.html',
})
export class ListaAreasPage {

  areas:Observable<any>;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private provider: AreaProvider,
    private providerAmostra:AmostraProvider,
    private toast: ToastController
      ) {
      this.areas = this.provider.getAll();
  }
  selectArea(area:any){
    this.providerAmostra.KEY_PROPERTY = this.provider.KEY_PROPERTY;
    this.providerAmostra.UID = this.provider.UID;
    this.providerAmostra.KEY_AREA = area.key;
    this.provider.TALHAO = area.name;
    this.navCtrl.setRoot(HomePage);
  }
  newArea(){
    this.navCtrl.push(CadastroAreasPage);
  }
  editArea(area: any){
    this.navCtrl.push(CadastroAreasPage, {area: area});
  }
  removeArea(area){
    if(area.name == this.provider.TALHAO){
      this.providerAmostra.KEY_AREA = this.provider.TALHAO = '';
    }
    if (area.key) {
      this.provider.remove(area.key)
        .then(() => {
          this.toast.create({ message: 'Talhão removido com sucesso.', duration: 3000 }).present();
        })
        .catch(() => {
          this.toast.create({ message: 'Erro ao remover talhão.', duration: 3000 }).present();
        });
    }
  }
}
