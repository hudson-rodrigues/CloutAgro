import { CulturaProvider } from './../../providers/cultura/cultura';
import { AmostraProvider } from './../../providers/amostra/amostra';
import { Observable } from 'rxjs';
import { CalagemProvider } from './../../providers/calagem/calagem';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';

/**
 * Generated class for the CalagemPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-calagem',
  templateUrl: 'calagem.html',
})
export class CalagemPage {

  form: FormGroup;
  calagem: any;
  amostras: Observable<any>;
  culturas: Observable<any>;
  nomeBotao ='Calcular';
  //apresentar um resultado mais explicativo EX: Aplicar 2.54 T/ha de calcário em área total
  resultado;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder:FormBuilder,
    public toast: ToastController,
    public provider:CalagemProvider,
    public providerAmostra: AmostraProvider,
    public providerCultura: CulturaProvider,
    public alertCtrl: AlertController) {
    this.calagem = this.navParams.data.calagem || {};
    this.amostras = this.providerAmostra.getAll();
    this.culturas = this.providerCultura.getAll();
    this.createForm();
  }

  createForm(){
    this.form = this.formBuilder.group({
      key: [this.calagem.key],
      date: [this.calagem.date, Validators.required],
      amostra: [this.calagem.amostra, Validators.required],
      cultura: [this.calagem.cultura, Validators.required],
      prnt: [this.calagem.prnt, Validators.required],
      resultado: [this.calagem.resultado]
    });
  }
  calcularCalagem(){
    var msg = '';
    if (this.form.valid) {
      if(this.nomeBotao == 'Calcular' && this.form.value['prnt'] > 0 ){
        this.nomeBotao = 'Salvar';
        let amostra = this.providerAmostra.get(this.form.value['amostra']);
        amostra.forEach( elemento => {
          this.calagem.amostra = elemento.name;
          if(elemento.tipo == 'mmol'){
            //mmol dm³
            this.calagem.resultado = this.resultado = (((this.form.value['cultura']-elemento.v) * elemento.ctc)/(10*this.form.value['prnt'])).toFixed(2);
            if(this.calagem.resultado > 1){
              msg = 'Incorporar '+this.calagem.resultado+" T/ha de calcário em área total na camada de 0-20 cm"
            } else {
              msg = 'Não é necessário fazer calagem.';
            }
            this.showAlert(msg);
          } else {
            //cmoldm³
            this.calagem.resultado = this.resultado = (((this.form.value['cultura']-elemento.v) * elemento.ctc)/this.form.value['prnt']).toFixed(2);
            if(this.calagem.resultado > 1){
              msg = 'Incorporar '+this.calagem.resultado+" T/ha de calcário em área total na camada de 0-20 cm"
            } else {
              msg = 'Não é necessário fazer calagem.';
            }
            this.showAlert(msg);
          }
        });
      }else {
        this.form.value['amostra'] = this.calagem.amostra;
        this.provider.save(this.form.value)
          .then(() => {
            this.toast.create({ message: 'Calagem salva com sucesso.', duration: 3000 }).present();
            this.navCtrl.pop();
          })
          .catch((e) => {
            this.toast.create({ message: 'Erro ao salvar calagem.', duration: 3000 }).present();
            console.error(e);
          })
      }
    }
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
