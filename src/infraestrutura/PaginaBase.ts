import { FormBuilder } from '@angular/forms';
import { ConfiguracaoPaginaBase } from '../infraestrutura/ConfiguracaoPaginaBase';
import { AlertController } from 'ionic-angular';

export abstract class PaginaBase {

    protected _formBuilder?: FormBuilder;
    protected _alertCtrl?: AlertController;

    constructor(cpb: ConfiguracaoPaginaBase) {
        this._formBuilder = cpb.formBuilder;
        this._alertCtrl = cpb.alertCtrl;
        this.carregarValidadores();
    }

    protected carregarValidadores(): void {
        if (this._formBuilder != null) {
            this.doCarregarValidadores();
        }
    }

    protected doCarregarValidadores(): void {

    }

    protected mostrarMensagemErro(mensagem: string) {
        if (this._alertCtrl != null) {
            let alert = this._alertCtrl.create({
                title: 'Erro',
                subTitle: mensagem,
                buttons: ["OK"],
            });
            alert.present();
        }
    }
}