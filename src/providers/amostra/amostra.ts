import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';

/*
  Generated class for the AmostraProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AmostraProvider {

  private PATH = 'propriedades/';
  public KEY_PROPERTY='';
  public KEY_AREA='';
  public UID='';
  constructor(public db:AngularFireDatabase) {
  }

  getAll() {
    if(this.KEY_PROPERTY != '' && this.KEY_AREA != ''){
    return this.db.list(this.UID+'/'+this.PATH+this.KEY_PROPERTY+'/areas/'+this.KEY_AREA+'/amostras/')
      .snapshotChanges()
      .map(changes => {
        return changes.map(c => ({
          key: c.payload.key, ...c.payload.val()
        }))
      })
    }
  }

  get(key: string) {
    return this.db.object(this.UID+'/'+this.PATH+this.KEY_PROPERTY+'/areas/'+this.KEY_AREA+'/amostras/'+key)
      .snapshotChanges()
      .map(c => {
        return { key: c.key, ...c.payload.val() };
      })
  }

  save(amostra: any) {
    if(this.KEY_PROPERTY != '' && this.KEY_AREA != ''){
      return new Promise((resolve, reject) => {
        if (amostra.key) {
          this.db.list(this.UID+'/'+this.PATH+this.KEY_PROPERTY+'/areas/'+this.KEY_AREA+'/amostras/')
            .update(amostra.key, { name: amostra.name, code: amostra.code, date: amostra.date, ph: amostra.ph, mo: amostra.mo,
            p: amostra.p, k: amostra.k, ca: amostra.ca, mg: amostra.mg, h_al: amostra.h_al,
            al: amostra.al, sb: amostra.sb, ctc: amostra.ctc, v: amostra.v, m: amostra.m, tipo: amostra.tipo})
            .then(() => resolve())
            .catch((e) => reject(e));
        } else {
          this.db.list(this.UID+'/'+this.PATH+this.KEY_PROPERTY+'/areas/'+this.KEY_AREA+'/amostras/')
            .push({ name: amostra.name, code: amostra.code, date: amostra.date, ph: amostra.ph, mo: amostra.mo,
               p: amostra.p, k: amostra.k, ca: amostra.ca, mg: amostra.mg, h_al: amostra.h_al,
              al: amostra.al, sb: amostra.sb, ctc: amostra.ctc, v: amostra.v, m: amostra.m, tipo: amostra.tipo})
            .then(() => resolve());
        }
      })
    }
  }
  /* kctc: amostra.kctc, cactc: amostra.cactc,
              mgctc: amostra.mgctc, alctc: amostra.alctc, hctc: amostra.hctc, camg: amostra.camg, cak: amostra.cak, mgk: amostra.mgk,*/
  remove(key: string) {
    return this.db.list(this.UID+'/'+this.PATH+this.KEY_PROPERTY+'/areas/'+this.KEY_AREA+'/amostras/').remove(key);
  }
}
