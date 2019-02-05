import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';

/*
  Generated class for the AdubacaoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AdubacaoProvider {

  public producao = [
    {produtividade: 19, Nbaixo:200, Nadequado:140, Nalto:80, SemN: 200, Kbaixo:200, Kmedio:150, Kbom:100, Kmuitobom:0 },
    {produtividade: 30, Nbaixo:250, Nadequado:175, Nalto:110, SemN: 250, Kbaixo:250, Kmedio:190, Kbom:125, Kmuitobom:0 },
    {produtividade: 40, Nbaixo:300, Nadequado:220, Nalto:140, SemN: 300, Kbaixo:300, Kmedio:225, Kbom:150, Kmuitobom:0 },
    {produtividade: 50, Nbaixo:350, Nadequado:260, Nalto:170, SemN: 350, Kbaixo:350, Kmedio:260, Kbom:175, Kmuitobom:50 },
    {produtividade: 60, Nbaixo:400, Nadequado:300, Nalto:200, SemN: 400, Kbaixo:400, Kmedio:300, Kbom:200, Kmuitobom:75 },
    {produtividade: 61, Nbaixo:450, Nadequado:340, Nalto:230, SemN: 450, Kbaixo:450, Kmedio:340, Kbom:225, Kmuitobom:100 }
  ];
  public KEY_PROPERTY='';//path + key_property+/historico/
  public UID='';
  constructor(public db:AngularFireDatabase) {
  }

  save(adubacao) {
    return new Promise((resolve, reject) => {
      if (adubacao.key) {
        this.db.list(this.UID+'/propriedades/'+this.KEY_PROPERTY+"/historico/adubacoes/")
          .update(adubacao.key, { date: adubacao.date, etapa: adubacao.etapa, expectativa: adubacao.expectativa, Nfoliar: adubacao.Nfoliar, amostra: adubacao.amostra, N: adubacao.N, K: adubacao.K })
          .then(() => resolve())
          .catch((e) => reject(e));
      } else {
        this.db.list(this.UID+'/propriedades/'+this.KEY_PROPERTY+"/historico/adubacoes/")
          .push({ date: adubacao.date, etapa: adubacao.etapa, expectativa: adubacao.expectativa, Nfoliar: adubacao.Nfoliar, amostra: adubacao.amostra, N: adubacao.N, K: adubacao.K })
          .then(() => resolve());
      }
    })
}


}
