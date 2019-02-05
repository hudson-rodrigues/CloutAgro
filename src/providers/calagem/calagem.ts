import { AreaProvider } from './../area/area';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

/*
  Generated class for the CalagemProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CalagemProvider {

  public KEY_PROPERTY='';//path + key_property+/historico/
  public UID='';
  constructor(public db:AngularFireDatabase, public providerArea:AreaProvider) {
  }

  save(calagem) {
      return new Promise((resolve, reject) => {
        if (calagem.key) {
          this.db.list(this.UID+'/propriedades/'+this.KEY_PROPERTY+"/historico/calagens/")
            .update(calagem.key, { date: calagem.date, amostra: calagem.amostra, cultura: calagem.cultura, prnt: calagem.prnt, resultado: calagem.resultado })
            .then(() => resolve())
            .catch((e) => reject(e));
        } else {
          this.db.list(this.UID+'/propriedades/'+this.KEY_PROPERTY+"/historico/calagens/")
            .push({ date: calagem.date, amostra: calagem.amostra, cultura: calagem.cultura, prnt: calagem.prnt, resultado: calagem.resultado })
            .then(() => resolve());
        }
      })
  }

}
