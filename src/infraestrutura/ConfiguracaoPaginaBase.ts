import { FormBuilder } from '@angular/forms';
import { AlertController } from 'ionic-angular';

export interface ConfiguracaoPaginaBase {

    formBuilder?: FormBuilder;
    alertCtrl?: AlertController; 
    
}