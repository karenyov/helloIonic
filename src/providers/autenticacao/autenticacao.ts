import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { IAutenticacaoService } from '../../providers.interfaces/IAutenticacaoService';
import { LoginModel } from '../../models/LoginModel';
import { Observable } from 'rxjs/Observable';
import { HelloIonicConstantes } from '../../app/HelloIonicConstantes';
import { NativeStorage } from '@ionic-native/native-storage';
import 'rxjs/add/observable/fromPromise';

/*
  Generated class for the AutenticacaoProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AutenticacaoProvider implements IAutenticacaoService {

  constructor(public http: Http, private nativeStorage: NativeStorage) {
    console.log('Hello AutenticacaoProvider Provider');
  }

  login(loginModel: LoginModel): Observable<void> {
    if (!loginModel || !loginModel.email || !loginModel.senha) {
      return Observable.throw('Email e /ou senha não informados!');
    }
    let corpoRequisicao = {
      email: loginModel.email,
      senha: loginModel.senha
    }
    return this.http.post(HelloIonicConstantes.BASE_URL + '/' + HelloIonicConstantes.Auth.LOGIN, corpoRequisicao)
      .map(response => {
        let resp = response.json();
        this.nativeStorage.setItem('token_autenticacao', { token: resp.data.token })
          .then(
          () => console.log('Token armazenado'),
          (erro) => alert(erro)
          );
      });
  }

  logout(): Observable<void> {
    return Observable.fromPromise(
      this.nativeStorage.clear()
    );
  }

}
