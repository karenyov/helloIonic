import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetalhesProdutoPage } from './detalhes-produto';

@NgModule({
  declarations: [
    DetalhesProdutoPage,
  ],
  imports: [
    IonicPageModule.forChild(DetalhesProdutoPage),
  ],
  exports: [
    DetalhesProdutoPage
  ]
})
export class DetalhesProdutoPageModule {}
