import { AdubacaoProvider } from './../../providers/adubacao/adubacao';
import { AmostraProvider } from './../../providers/amostra/amostra';
import { AreaProvider } from './../../providers/area/area';
import { CalagemProvider } from './../../providers/calagem/calagem';
import { HistoricoProvider } from './../../providers/historico/historico';
import { User } from './../../providers/usuario/user';
import { CulturaProvider } from './../../providers/cultura/cultura';
import { PropriedadeProvider } from './../../providers/propriedade/propriedade';
import { ResetpasswordPage } from './../resetpassword/resetpassword';
import { NgForm } from '@angular/forms';
import { UsuarioProvider } from './../../providers/usuario/usuario';
import { CadastroAgronomoPage } from './../cadastro-agronomo/cadastro-agronomo';
import { HomePage } from './../home/home';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user: User = new User();
  @ViewChild('form') form: NgForm;
  constructor(private toastCtrl: ToastController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public authService: UsuarioProvider,
    public provider: PropriedadeProvider,
    public providerHistorico: HistoricoProvider,
    public providerCalagem: CalagemProvider,
    public providerAdubacao: AdubacaoProvider,
    public providerArea: AreaProvider,
    public providerAmostra: AmostraProvider,
    public providerCultura: CulturaProvider
    ) {
        this.authService.usuario.uid = this.provider.UID = this.provider.PROPERTY = this.providerHistorico.UID = this.providerHistorico.KEY_PROPERTY = '';
        this.providerCultura.UID = this.providerCalagem.UID = this.providerCalagem.KEY_PROPERTY = this.providerArea.UID = this.providerArea.KEY_PROPERTY = '';
        this.providerAmostra.UID = this.providerAmostra.KEY_PROPERTY = this.providerAmostra.KEY_AREA = '';
        this.providerAdubacao.UID = this.providerAdubacao.KEY_PROPERTY = '';
  }


  signIn() {
    if (this.form.form.valid) {
      this.authService.signIn(this.user)
        .then((response) => {
          this.authService.usuario.uid = this.provider.UID = this.providerCultura.UID = this.providerCalagem.UID = this.providerAdubacao.UID  = response.uid;
          this.authService.getUsuario();
          this.presentLoading();
          this.navCtrl.setRoot(HomePage);
        })
        .catch((error: any) => {
          let toast = this.toastCtrl.create({ duration: 3000, position: 'bottom' });
          if (error.code == 'auth/invalid-email') {
            toast.setMessage('O e-mail digitado não é valido.');
          } else if (error.code == 'auth/user-disabled') {
            toast.setMessage('O usuário está desativado');
          } else if (error.code == 'auth/user-not-found') {
            toast.setMessage('O usuário não foi encontrado.');
          } else if (error.code == 'auth/wrong-password') {
            toast.setMessage('A senha digitada não é valida.');
          }
          toast.present();
        });
    }
  }

  resetPassword() {
    this.navCtrl.push(ResetpasswordPage);
  }
  cadastrarAgronomo(){
    this.navCtrl.push(CadastroAgronomoPage, {});
  }
  presentLoading() {
    const loader = this.loadingCtrl.create({
      content: "Carregando...",
      duration: 1000
    });
    loader.present();
  }
}
