import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { IAutenticacaoService } from '../../providers.interfaces/IAutenticacaoService';
import { LoginModel } from '../../models/LoginModel';

/*
  Generated class for the AutenticacaoProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AutenticacaoProvider implements IAutenticacaoService {

  constructor(public http: Http) {
    console.log('Hello AutenticacaoProvider Provider');
  }

  login(loginModel: LoginModel) : boolean {
    return loginModel.email == 'teste@email.com' && loginModel.senha == '123';
  }

  logout(): void {

  }

}
