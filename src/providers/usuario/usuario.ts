import { AdubacaoProvider } from './../adubacao/adubacao';
import { AmostraProvider } from './../amostra/amostra';
import { AreaProvider } from './../area/area';
import { CalagemProvider } from './../calagem/calagem';
import { CulturaProvider } from './../cultura/cultura';
import { HistoricoProvider } from './../historico/historico';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from './user';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { PropriedadeProvider } from '../propriedade/propriedade';

let config_key_name = "config";

@Injectable()
export class UsuarioProvider {

  usuario: User = new User();
  constructor(private db: AngularFireDatabase,
    private angularFireAuth: AngularFireAuth,
    public provider: PropriedadeProvider,
    public providerHistorico: HistoricoProvider,
    public providerCultura: CulturaProvider,
    public providerCalagem: CalagemProvider,
    public providerArea: AreaProvider,
    public providerAmostra: AmostraProvider,
    public providerAdubacao: AdubacaoProvider
    ){
      this.angularFireAuth.authState;
    }
    //recupera os dados do localstorage
    getConfigData():any{
      return localStorage.getItem(config_key_name) || null;
    }
    setConfigData(showSlide?: boolean){
      let config = {
        showSlide: false
      }
      if(showSlide){
        config.showSlide = showSlide;
      }
      localStorage.setItem(config_key_name, JSON.stringify(config));
    }

  save(user:any, PATH){
    this.usuario = user;
    this.usuario.uid = PATH;
    return new Promise((resolve, reject) => {
      if(user.uid){ 
        this.db.object(PATH+'/')
        .update({name: user.name, lastname: user.lastname})
        .then(()=> resolve())
        .catch((e) => reject(e));
      } else{
        this.db.object(PATH+'/')
        .set({name: user.name, lastname: user.lastname})
        .then(()=> resolve());
      }
    })
  }
  
  getUsuario() {
     this.db.object(this.usuario.uid)
      .valueChanges()
      .forEach(element => {
        this.usuario.name = element['name'];
      });
  }

  /*login e autenticação*/
  createUser(user: User) {
    return this.angularFireAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
  }
  signIn(user: User) {
    return this.angularFireAuth.auth.signInWithEmailAndPassword(user.email, user.password);
  }

  signOut(){
    //zerar todos uid
    return this.angularFireAuth.auth.signOut();
  }
  resetPassword(email: string) {
    return this.angularFireAuth.auth.sendPasswordResetEmail(email);
  }



}
