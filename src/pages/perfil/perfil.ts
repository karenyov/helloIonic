import { Component, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, AlertController } from 'ionic-angular';
import { Camera } from 'ionic-native';
import { PaginaBase } from '../../infraestrutura/PaginaBase';
import { IAutenticacaoService } from '../../providers.interfaces/IAutenticacaoService';
import { LoginPage } from '../login/login';

/**
 * Generated class for the PerfilPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage extends PaginaBase {

  imageBase64: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController,
    public toastCtrl: ToastController, public alertCtrl: AlertController,
    @Inject('IAutenticacaoService') public autenticacaoService: IAutenticacaoService) {
    super({ alertCtrl: alertCtrl, LoadingCtrl: loadingCtrl, toastCtrl: toastCtrl });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PerfilPage');
  }

  tirarFoto(): void {
    Camera.getPicture({
      destinationType: Camera.DestinationType.DATA_URL,
      targetWidth: 1000,
      targetHeight: 1000
    }).then(
      (imagem) => {
        this.imageBase64 = "data:image/jpeg;base64," + imagem
      },
      (erro) => {
        this.mostrarMensagemErro(erro);
      }
      );
  }

  logoff(): void {
    this.autenticacaoService.logout().subscribe(
      () => {
        this.navCtrl.setRoot(LoginPage, {}, { animate: true, direction: 'forward' });
      }
    )
  }
}
