import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';

/*
  Generated class for the HistoricoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HistoricoProvider {

  public UID='';
  private PATH='propriedades/';
  public KEY_PROPERTY= '';
  constructor(public db: AngularFireDatabase) {
  }

  getAllCalagem() {
    if(this.KEY_PROPERTY != ''){
    return this.db.list(this.UID+'/'+this.PATH+this.KEY_PROPERTY+'/historico/calagens/')//+ this.KEY_PROPERTY
      .snapshotChanges()
      .map(changes => {
        return changes.map(c => ({
          key: c.payload.key, ...c.payload.val()
        }))
      })
    }
  }
  getAllAdubacao() {
    if(this.KEY_PROPERTY != ''){
    return this.db.list(this.UID+'/'+this.PATH+this.KEY_PROPERTY+'/historico/adubacoes/')//+ this.KEY_PROPERTY
      .snapshotChanges()
      .map(changes => {
        return changes.map(c => ({
          key: c.payload.key, ...c.payload.val()
        }))
      })
    }
  }


}
