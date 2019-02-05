import { CulturaProvider } from './../../providers/cultura/cultura';
import { PropriedadeProvider } from './../../providers/propriedade/propriedade';
import { NgForm } from '@angular/forms';
import { HomePage } from './../home/home';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { User } from '../../providers/usuario/user';



/**
 * Generated class for the CadastroAgronomoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cadastro-agronomo',
  templateUrl: 'cadastro-agronomo.html',
})
export class CadastroAgronomoPage {


  user: User = new User();
  @ViewChild('form') form: NgForm;

  constructor(
   public navCtrl: NavController,
   public navParams: NavParams,
   private authService: UsuarioProvider,
   private toastCtrl: ToastController,
   public provider: PropriedadeProvider,
   public providerCultura: CulturaProvider
   ) {
   
  }
  createAccount() {
    if (this.form.form.valid) {
      let toast = this.toastCtrl.create({ duration: 3000, position: 'bottom' });
      this.authService.createUser(this.user)
        .then((user: any) => {
          user.sendEmailVerification();
          this.authService.save(this.user,user.uid);//salvando usuario no firebase
          this.providerCultura.UID = this.provider.UID = user.uid;//salvando a key do usuario
          toast.setMessage('Usuário criado com sucesso.');
          toast.present();
          this.navCtrl.setRoot(HomePage);
        })
        .catch((error: any) => {
          if (error.code  == 'auth/email-already-in-use') {
            toast.setMessage('O e-mail digitado já está em uso.');
          } else if (error.code  == 'auth/invalid-email') {
            toast.setMessage('O e-mail digitado não é valido.');
          } else if (error.code  == 'auth/operation-not-allowed') {
            toast.setMessage('Não está habilitado criar usuários.');
          } else if (error.code  == 'auth/weak-password') {
            toast.setMessage('A senha digitada é muito fraca.');
          }
          toast.present();
        });
    }
  }

}
