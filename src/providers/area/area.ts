import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';

/*
  Generated class for the AreaProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AreaProvider {

  private PATH = 'propriedades/';
  public KEY_PROPERTY='';
  public UID = '';
  public TALHAO ='';
  constructor(public db:AngularFireDatabase) {
  }

  
  getAll() {
    if(this.KEY_PROPERTY != ''){
    return this.db.list(this.UID+'/'+this.PATH+this.KEY_PROPERTY+'/areas/')//+ this.KEY_PROPERTY
      .snapshotChanges()
      .map(changes => {
        return changes.map(c => ({
          key: c.payload.key, ...c.payload.val()
        }))
      })
    }
  }

  get(key: string) {
    return this.db.object(this.UID+'/'+this.PATH+this.KEY_PROPERTY+key)
      .snapshotChanges()
      .map(c => {
        return { key: c.key, ...c.payload.val() };
      })
  }

  save(area: any) {
    if(this.KEY_PROPERTY != ''){
      return new Promise((resolve, reject) => {
        if (area.key) {
          this.db.list(this.UID+'/'+this.PATH+this.KEY_PROPERTY+'/areas/')//+ this.KEY_PROPERTY
            .update(area.key, { name: area.name, description: area.description })
            .then(() => resolve())
            .catch((e) => reject(e));
        } else {
          this.db.list(this.UID+'/'+this.PATH+this.KEY_PROPERTY+'/areas/')
            .push({ name: area.name, description: area.description })
            .then(() => resolve());
        }
      })
    }
  }


  remove(key: string) {
    return this.db.list(this.UID+'/'+this.PATH+this.KEY_PROPERTY+'/areas/').remove(key);
  }
}
