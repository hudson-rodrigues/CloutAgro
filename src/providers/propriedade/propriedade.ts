import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';

/*
  Generated class for the PropriedadeProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PropriedadeProvider {

  private PATH = 'propriedades/';
  public PROPERTY = '';
  public UID = '';
  constructor(public db: AngularFireDatabase) {
  }

  getAll() {
    return this.db.list(this.UID+'/'+this.PATH)
      .snapshotChanges()
      .map(changes => {
        return changes.map(c => ({
          key: c.payload.key, ...c.payload.val()
        }))
      })
  }

  get(key: string) {
    return this.db.object(this.PATH + key)
      .snapshotChanges()
      .map(c => {
        return { key: c.key, ...c.payload.val() };
      })
  }

  save(propriedade: any) {
    return new Promise((resolve, reject) => {
      if (propriedade.key) {
        this.db.list(this.UID+'/'+this.PATH)
          .update(propriedade.key, { owner:propriedade.owner, name: propriedade.name, description: propriedade.description })
          .then(() => resolve())
          .catch((e) => reject(e));
      } else {
        this.db.list(this.UID+'/'+this.PATH)
          .push({ owner:propriedade.owner, name: propriedade.name, description: propriedade.description })
          .then(() => resolve());
      }
    })
  }


  remove(key: string) {
    return this.db.list(this.UID+'/'+this.PATH).remove(key);
  }
}
