import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';

/*
  Generated class for the CulturaProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CulturaProvider {

  public PATH='/culturas/';
  public UID='';
  constructor(public db:AngularFireDatabase) {

  }

  getAll() {
    return this.db.list(this.UID+this.PATH)
      .snapshotChanges()
      .map(changes => {
        return changes.map(c => ({
          key: c.payload.key, ...c.payload.val()
        }))
      })
  }

  save(cultura: any) {
    return new Promise((resolve, reject) => {
      if (cultura.key) {
        this.db.list(this.UID+'/'+this.PATH)
          .update(cultura.key, { name: cultura.name, value: cultura.value })
          .then(() => resolve())
          .catch((e) => reject(e));
      } else {
        this.db.list(this.UID+'/'+this.PATH)
          .push({ name: cultura.name, value: cultura.value })
          .then(() => resolve());
      }
    })
  }
  remove(key: string) {
    return this.db.list(this.UID+'/'+this.PATH).remove(key);
  }
}
