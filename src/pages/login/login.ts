import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PaginaBase } from '../../infraestrutura/PaginaBase';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HelloIonicValidadores } from '../../validadores/HelloIonicValidadores';
import { LoginModel } from '../../models/LoginModel';
import { HomePage } from '../home/home';
import { AlertController } from 'ionic-angular';

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage extends PaginaBase {

  loginFrmGroup: FormGroup;
  foiSubmetido: boolean;
  loginModel: LoginModel;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public alertCtrl: AlertController) {
    super({ formBuilder: formBuilder, alertCtrl: alertCtrl });
    this.foiSubmetido = false;
    this.loginModel = new LoginModel();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  protected doCarregarValidadores(): void {
    this.loginFrmGroup = this._formBuilder.group({
      email: ['', Validators.compose([Validators.required, HelloIonicValidadores.email])],
      senha: ['', Validators.compose([Validators.required, Validators.minLength(3)])]
    });
  }

  login(): void {
    this.foiSubmetido = true;
    if (this.loginFrmGroup.valid) {
      if (this.loginModel.email == 'teste@email.com' && this.loginModel.senha == '123') {
        this.navCtrl.setRoot(HomePage, {}, {animate: true, direction: 'forward'});
      } else {
        this.mostrarMensagemErro("Login e ou senha incorretos!");
      }
      alert('Ok!');
    } else {
      alert('Erro');
    }
  }

}
