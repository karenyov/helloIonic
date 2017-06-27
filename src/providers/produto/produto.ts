import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { NativeStorage } from '@ionic-native/native-storage';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/mergeMap';

import { IProdutoService } from '../../providers.interfaces/IProdutoService';
import { Observable } from 'rxjs/Observable';
import { ProdutoModel } from '../../models/ProdutoModel';
import { HelloIonicConstantes } from '../../app/HelloIonicConstantes';

/*
  Generated class for the ProdutoServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ProdutoProvider implements IProdutoService {

  constructor(public http: Http, private nativeStorage: NativeStorage) {
    console.log('Hello ProdutoServiceProvider Provider');
  }

  listarProdutos(): Observable<ProdutoModel[]> {
    let tokenObservable = Observable.fromPromise(this.nativeStorage.getItem('token_autenticacao')
      .then(data => { return data.token }, err => { return null }));

    return tokenObservable.flatMap(token => {
      let headers: Headers = new Headers();
      headers.set('token', token);
      return this.http.get(HelloIonicConstantes.BASE_URL + '/' + HelloIonicConstantes.Produtos.GET, {
        headers: headers
      }).map(
        response => {
          let resp = response.json();
          let resultado: ProdutoModel[] = resp.data.produtos.map(function (produto, indice, arr) {
            let p: ProdutoModel = new ProdutoModel();
            p.id = produto.id;
            p.categoria = produto.categoria;
            p.descricao = produto.descricao;
            p.nome = produto.nome;
            p.icone = produto.categoria == 'doce' ? 'alert' : 'basket'
            return p;
          });
          return resultado;
        });
    });
  }

}
