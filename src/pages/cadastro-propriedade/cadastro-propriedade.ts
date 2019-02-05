import { PropriedadeProvider } from './../../providers/propriedade/propriedade';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

/**
 * Generated class for the CadastroPropriedadePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cadastro-propriedade',
  templateUrl: 'cadastro-propriedade.html',
})
export class CadastroPropriedadePage {

  title: string;
  form: FormGroup;
  propriedade: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private formBuilder: FormBuilder, private provider: PropriedadeProvider,
    private toast: ToastController) {
    this.propriedade = this.navParams.data.propriedade || {};
    this.createForm();
    this.setupPageTitle();
  }

  private setupPageTitle() {
    this.title = this.navParams.data.propriedade ? 'Alterando propriedade' : 'Nova propriedade';
  }

  createForm() {
    this.form = this.formBuilder.group({
      key: [this.propriedade.key],
      owner: [this.propriedade.owner,Validators.required],
      name: [this.propriedade.name, Validators.required],
      description: [this.propriedade.description, Validators.required],
    });
  }
  onSubmit() {
    if (this.form.valid) {
      this.provider.save(this.form.value)
        .then(() => {
          this.toast.create({ message: 'Propriedade salva com sucesso.', duration: 3000 }).present();
          this.navCtrl.pop();
        })
        .catch((e) => {
          this.toast.create({ message: 'Erro ao salvar a propriedade.', duration: 3000 }).present();
          console.error(e);
        })
    }
  }


}
