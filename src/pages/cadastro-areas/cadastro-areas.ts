import { AreaProvider } from './../../providers/area/area';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

/**
 * Generated class for the CadastroAreasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cadastro-areas',
  templateUrl: 'cadastro-areas.html',
})
export class CadastroAreasPage {

  title: string;
  form: FormGroup;
  area: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private formBuilder: FormBuilder, private provider: AreaProvider,
    private toast: ToastController) {
    this.area = this.navParams.data.area || {};
    this.createForm();
    this.setupPageTitle();
  }

  private setupPageTitle() {
    this.title = this.navParams.data.area ? 'Alterando talhão' : 'Novo talhão';
  }

  createForm() {
    this.form = this.formBuilder.group({
      key: [this.area.key],
      name: [this.area.name, Validators.required],
      description: [this.area.description, Validators.required]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      //adicionar no path
      this.provider.save(this.form.value)
        .then(() => {
          this.toast.create({ message: 'Talhão salva com sucesso.', duration: 3000 }).present();
          this.navCtrl.pop();
        })
        .catch((e) => {
          this.toast.create({ message: 'Erro ao salvar o Talhão.', duration: 3000 }).present();
          console.error(e);
        })
    }
  }

}
