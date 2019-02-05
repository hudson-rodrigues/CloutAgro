import { HomePage } from './../home/home';
import { AdubacaoProvider } from './../../providers/adubacao/adubacao';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AmostraProvider } from './../../providers/amostra/amostra';
import { Observable } from 'rxjs/Observable';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';

/**
 * Generated class for the AdubacaoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-adubacao',
  templateUrl: 'adubacao.html',
})
export class AdubacaoPage {

  form: FormGroup;
  amostras: Observable<any>;
  adubacao:any;
  nomeBotao = 'Calcular';
  etapa;
  resultado;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public provider: AdubacaoProvider,
    public providerAmostra: AmostraProvider,
    public formBuilder:FormBuilder,
    public alertCtrl: AlertController,
    public toast: ToastController) {
    this.etapa = this.navParams.get('etapa');
    this.amostras = providerAmostra.getAll();
    this.adubacao = this.navParams.data.adubacao || {};
    this.createForm();
  }

  calcularAdubacao(){
    var msg= '';
    if(this.form.valid){
        var chave = this.form.value['amostra'];
        if(this.nomeBotao == 'Calcular' && this.form.value['Nfoliar'] >= 0 && this.form.value['Nfoliar'] < 3.6){
          this.nomeBotao = 'Salvar';
          //buscando o resultado da produtividade
          this.provider.producao.forEach( action => {
            if(this.adubacao.expectativa == action['produtividade']){
              this.resultado = action;
            }
          });
          //Sem N foliar
          if(this.adubacao.Nfoliar == 0){
            this.adubacao.N = this.resultado['SemN'];
          } else {
            //Com N foliar
            if (this.adubacao.Nfoliar > 0 && this.adubacao.Nfoliar < 2.6){
              this.adubacao.N = this.resultado['Nbaixo'];
            }
            if (this.adubacao.Nfoliar > 2.5 && this.adubacao.Nfoliar < 3.1){
              this.adubacao.N = this.resultado['Nadequado'];
            }
            if (this.adubacao.Nfoliar > 3 && this.adubacao.Nfoliar < 3.6){
              this.adubacao.N = this.resultado['Nalto'];
            }
          }
          // end n foliar
          let amostra = this.providerAmostra.get(chave);
          amostra.forEach(elemento => {
            this.adubacao.amostra = elemento.name;
            if(elemento.k > 0 && elemento.k < 61){
              this.adubacao.K = this.resultado['Kbaixo'];
            }
            if(elemento.k > 60 && elemento.k < 121){
              this.adubacao.K = this.resultado['Kmedio'];
            }
            if(elemento.k > 120 && elemento.k < 201){
              this.adubacao.K = this.resultado['Kbom'];
            }
            if(elemento.k > 200){
              this.adubacao.K = this.resultado['Kmuitobom'];
            }
            msg =  'As doses de nitrogênio e potássio deve ser aplicada'+
            ' em parcelas de três a quatro vezes durante o período'+
            ' chuvoso geralmente em outubro a março, à intervalos'+
            ' de 40 a 60 dias.<br> Doses a serem aplicadas:<br> Nitrogênio:'+this.adubacao.N+
            ' kg/ha/ano <br> Potássio:'+this.adubacao.K+' kg/ha/ano';
            this.showAlert(msg);
          });
      } else if(this.nomeBotao == 'Salvar'){
          this.form.value['amostra'] = this.adubacao.amostra;
          this.provider.save(this.form.value)
          .then(() => {
            this.toast.create({message: 'Adubação salva com sucesso.', duration: 3000}).present();
            this.navCtrl.setRoot(HomePage);
          })
          .catch((e) => {
            this.toast.create({ message: 'Erro ao salvar Adubação.', duration: 3000 }).present();
            console.error(e);
          })
      }
    } 
  }

  createForm(){
    this.form = this.formBuilder.group({
      key: [this.adubacao.key],
      date: [this.adubacao.date, Validators.required],
      etapa: [this.adubacao.etapa, Validators.required],
      expectativa: [this.adubacao.expectativa, Validators.required],
      Nfoliar: [this.adubacao.Nfoliar, Validators.required],
      amostra: [this.adubacao.amostra, Validators.required],
      K: [this.adubacao.K],
      N: [this.adubacao.N]
    });
  }

  semNFoliar(){
    this.adubacao.Nfoliar = 0;
  }
  showAlert(msg) {
    const alert = this.alertCtrl.create({
      title: 'Resultado',
      subTitle: msg,
      buttons: ['ok']
    });
    alert.present();
  }
  
}
