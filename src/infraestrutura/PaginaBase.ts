import { FormBuilder } from '@angular/forms';
import { ConfiguracaoPaginaBase } from '../infraestrutura/ConfiguracaoPaginaBase';

export abstract class PaginaBase {

    protected _formBuilder?: FormBuilder;

    constructor(cpb: ConfiguracaoPaginaBase) {
        this._formBuilder = cpb.formBuilder;
        this.carregarValidadores();
    }

    protected carregarValidadores(): void {
        if (this._formBuilder != null) {
            this.doCarregarValidadores();
        }
    }

    protected doCarregarValidadores(): void {

    }
}