import { CulturaProvider } from './../../providers/cultura/cultura';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

/**
 * Generated class for the CadastroCulturaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cadastro-cultura',
  templateUrl: 'cadastro-cultura.html',
})
export class CadastroCulturaPage {

  title:string;
  cultura: any;
  form: FormGroup;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public provider: CulturaProvider, public toast: ToastController,
    public formBuilder: FormBuilder) {
    this.cultura = this.navParams.data.cultura || {};
    this.createForm();
    this.setupPageTitle();
  }
  private setupPageTitle() {
    this.title = this.navParams.data.cultura ? 'Alterando cultura' : 'Nova cultura';
  }
  createForm() {
    this.form = this.formBuilder.group({
      key: [this.cultura.key],
      name: [this.cultura.name, Validators.required],
      value: [this.cultura.value, Validators.required],
    });
  }
  onSubmit() {
    if (this.form.valid) {
      this.provider.save(this.form.value)
        .then(() => {
          this.toast.create({ message: 'Cultura salva com sucesso.', duration: 3000 }).present();
          this.navCtrl.pop();
        })
        .catch((e) => {
          this.toast.create({ message: 'Erro ao salvar a cultura.', duration: 3000 }).present();
          console.error(e);
        })
    }
  }

}
