import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AmostraProvider } from './../../providers/amostra/amostra';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';

/**
 * Generated class for the CadastroAmostraPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cadastro-amostra',
  templateUrl: 'cadastro-amostra.html',
})
export class CadastroAmostraPage {

  title: string;
  form: FormGroup;
  amostra: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
     public provider: AmostraProvider, private formBuilder: FormBuilder,
     private toast: ToastController, public alertCtrl: AlertController) { 
    this.amostra = this.navParams.data.amostra || {};
    this.createForm();
    this.setupPageTitle();
  }

  private setupPageTitle() {
    this.title = this.navParams.data.amostra ? 'Alterando amostra' : 'Nova amostra';
  }

  //add os campos da amostra
  createForm() {
    this.form = this.formBuilder.group({
      key: [this.amostra.key],
      name: [this.amostra.name, Validators.required],
      code: [this.amostra.code, Validators.required],
      date: [this.amostra.date],
      ph: [this.amostra.ph, Validators.required],
      mo: [this.amostra.mo, Validators.required],
      p: [this.amostra.p, Validators.required],
      k: [this.amostra.k, Validators.required],
      ca: [this.amostra.ca, Validators.required],
      mg: [this.amostra.mg, Validators.required],
      h_al: [this.amostra.h_al, Validators.required], 
      al: [this.amostra.al, Validators.required],
      sb: [this.amostra.sb, Validators.required],
      ctc: [this.amostra.ctc, Validators.required],
      v: [this.amostra.v, Validators.required],
      m: [this.amostra.m, Validators.required],
      tipo: [this.amostra.tipo, Validators.required],
    });
  }
            
  converter(){
    if(this.amostra.k != null){
      this.amostra.k = this.amostra.k*390;
    }
  }
  info(){
    const alert = this.alertCtrl.create({
      title: 'Informação!',
      subTitle: 'se K estiver em Mg dm³ não precisa converter.<br> Caso estiver em Cmolc dm³, insira o valor e clique em converter!',
      buttons: ['OK']
    });
    alert.present();
  }

  onSubmit() {
    if (this.form.valid) {
      this.provider.save(this.form.value)
        .then(() => {
          this.toast.create({ message: 'Amostra salva com sucesso.', duration: 3000 }).present();
          this.navCtrl.pop();
        })
        .catch((e) => {
          this.toast.create({ message: 'Erro ao salvar amostra.', duration: 3000 }).present();
          console.error(e);
        })
    }
  }
 

}
 