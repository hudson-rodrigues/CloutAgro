import { LoginPage } from './../pages/login/login';
import { UsuarioProvider } from './../providers/usuario/usuario';
import { StartPage } from './../pages/start/start';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { PropriedadeProvider } from '../providers/propriedade/propriedade';
import { CulturaProvider } from '../providers/cultura/cultura';
import { CalagemProvider } from '../providers/calagem/calagem';
import { AdubacaoProvider } from '../providers/adubacao/adubacao';

@Component({
  templateUrl: 'app.html',
  providers: [
    UsuarioProvider
  ]
})
export class MyApp {
  rootPage:any;
  constructor(afAuth: AngularFireAuth,
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    provider: UsuarioProvider,
    providerPropriedade: PropriedadeProvider,
    providerCultura: CulturaProvider,
    providerCalagem: CalagemProvider,
    providerAdubacao: AdubacaoProvider
    ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      let config = provider.getConfigData();
      afAuth.authState.subscribe(user => {
        if (user) {//sessao do usuario
          provider.usuario.uid = providerPropriedade.UID = providerCultura.UID = providerCalagem.UID = providerAdubacao.UID = user.uid;
          provider.getUsuario();
          this.rootPage = HomePage;
        } else {
          if(config == null){
            this.rootPage = StartPage;
            provider.setConfigData(false);
          }else {
            this.rootPage = LoginPage;
          }
        }
      });
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

