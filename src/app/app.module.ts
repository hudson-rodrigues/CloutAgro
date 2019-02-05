import { StartPage } from './../pages/start/start';
import { CadastroCulturaPage } from './../pages/cadastro-cultura/cadastro-cultura';
import { CulturaPage } from './../pages/cultura/cultura';
import { SelectAdubacaoPage } from './../pages/select-adubacao/select-adubacao';
import { ResetpasswordPage } from './../pages/resetpassword/resetpassword';
import { ListaAreasPage } from './../pages/lista-areas/lista-areas';
import { ListaPropriedadesPage } from './../pages/lista-propriedades/lista-propriedades';
import { ListaAmostrasPage } from './../pages/lista-amostras/lista-amostras';
import { CadastroAgronomoPage } from './../pages/cadastro-agronomo/cadastro-agronomo';
import { LoginPage } from './../pages/login/login';
import { HistoricoPage } from './../pages/historico/historico';
import { AdubacaoPage } from './../pages/adubacao/adubacao';
import { CalagemPage } from './../pages/calagem/calagem';
import { CadastroAmostraPage } from './../pages/cadastro-amostra/cadastro-amostra';
import { CadastroAreasPage } from './../pages/cadastro-areas/cadastro-areas';
import { CadastroPropriedadePage } from './../pages/cadastro-propriedade/cadastro-propriedade';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AmostraProvider } from '../providers/amostra/amostra';
import { UsuarioProvider } from '../providers/usuario/usuario';
import { PropriedadeProvider } from '../providers/propriedade/propriedade';
import { AreaProvider } from '../providers/area/area';
import { CalagemProvider } from '../providers/calagem/calagem';
import { AdubacaoProvider } from '../providers/adubacao/adubacao';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { HistoricoProvider } from '../providers/historico/historico';
import { CulturaProvider } from '../providers/cultura/cultura';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    CadastroPropriedadePage,
    CadastroAreasPage,
    CadastroAmostraPage,
    CalagemPage,
    AdubacaoPage,
    HistoricoPage,
    LoginPage,
    CadastroAgronomoPage,
    ListaAmostrasPage,
    ListaPropriedadesPage,
    ListaAreasPage,
    SelectAdubacaoPage,
    CulturaPage,
    CadastroCulturaPage,
    StartPage,
    ResetpasswordPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyAsakOfmUFFXuCbs_AIPKWm2GptbUiHQ6k",
      authDomain: "cloutagro-be5c7.firebaseapp.com",
      databaseURL: "https://cloutagro-be5c7.firebaseio.com",
      projectId: "cloutagro-be5c7",
      storageBucket: "cloutagro-be5c7.appspot.com",
      messagingSenderId: "206843113832"
    }),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    CadastroPropriedadePage,
    CadastroAreasPage,
    CadastroAmostraPage,
    CalagemPage,
    AdubacaoPage,
    HistoricoPage,
    LoginPage,
    CadastroAgronomoPage,
    ListaAmostrasPage,
    ListaPropriedadesPage,
    ListaAreasPage,
    SelectAdubacaoPage,
    CulturaPage,
    CadastroCulturaPage,
    StartPage,
    ResetpasswordPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AmostraProvider,
    UsuarioProvider,
    PropriedadeProvider,
    AreaProvider,
    CalagemProvider,
    AdubacaoProvider,
    HistoricoProvider,
    CulturaProvider
  ]
})
export class AppModule { }
