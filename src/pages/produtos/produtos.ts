import { Component } from '@angular/core';
import { IonicPage, ActionSheetController, NavController, NavParams, LoadingController, ToastController, AlertController } from 'ionic-angular';
import { ProdutoProvider } from '../../providers/produto/produto';
import { PaginaBase } from '../../infraestrutura/PaginaBase';
import { ProdutoModel } from '../../models/ProdutoModel';
import { DetalhesProdutoPage } from '../detalhes-produto/detalhes-produto';

/**
 * Generated class for the ProdutosPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html',
})
export class ProdutosPage extends PaginaBase {

  produtos: ProdutoModel[];
  produtosFiltrados: ProdutoModel[];
  termoPesquisa: string;
  filtradoPorCategoria: boolean;
  categoriaSelecionada: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
    private produtoService: ProdutoProvider,
    public loadingCtrl: LoadingController, public toastCtrl: ToastController, public actionSheetCtrl: ActionSheetController) {
    super({ alertCtrl: alertCtrl, LoadingCtrl: loadingCtrl, toastCtrl: toastCtrl });
    this.termoPesquisa = '';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProdutosPage');
    this.mostrarLoading('Buscando produtos...')
    this.produtoService.listarProdutos().subscribe(resposta => {
      this.esconderLoading();
      this.produtos = resposta;
      this.produtosFiltrados = resposta;
      this.filtradoPorCategoria = false;
      this.categoriaSelecionada = '';
    },
      erro => {
        this.esconderLoading();
        this.mostrarMensagemErro(`Erro ao buscar os produtos: ${erro}`);
      })
  }

  mostrarDetalhesProduto(produto: ProdutoModel) {
    this.navCtrl.push(DetalhesProdutoPage, {
      produto: produto
    });
  }

  filtrarProdutosPorNome(): void {
    if (!this.filtradoPorCategoria) {
      if (this.termoPesquisa == '') {
        this.produtosFiltrados = this.produtos;
      } else {
        this.produtosFiltrados = this.produtos.filter((produto) => {
          return produto.nome.toLowerCase().indexOf(this.termoPesquisa.toLowerCase()) > -1;
        })
      }
    } else {
      if (this.termoPesquisa == '') {
        this.produtosFiltrados = this.produtos.filter((produto) => {
          produto.categoria = this.categoriaSelecionada;
        });
      } else {
        this.produtosFiltrados = this.produtos.filter((produto) => {
          return produto.nome.toLowerCase().indexOf(this.termoPesquisa.toLowerCase()) > -1 &&
            produto.categoria == this.categoriaSelecionada;
        })
      }
    }
  }

  filtrarPorCategoria(): void {
    this.termoPesquisa = '';
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Filtro por categoria',
      buttons: [
        {
          text: 'Doces',
          handler: () => {
            this.categoriaSelecionada == 'doce';
            this.filtradoPorCategoria = true;
            this.produtosFiltrados = this.produtos.filter((produto) => {
              return produto.categoria == 'doce';
            })
          },
        },
        {
          text: 'Salgados',
          handler: () => {
            this.categoriaSelecionada == 'salgado';
            this.filtradoPorCategoria = true;
            this.produtosFiltrados = this.produtos.filter((produto) => {
              return produto.categoria == 'salgado';
            })
          },
        },
        {
          text: 'Todas',
          role: 'cancel',
          handler: () => {
            this.categoriaSelecionada == '';
            this.filtradoPorCategoria = false;
            this.produtosFiltrados = this.produtos;
          },
        }
      ]
    });
    actionSheet.present();
  }

  atualizarListaProdutos(refresher): void {
    this.produtoService.listarProdutos().subscribe(data => {
      this.produtos = data;
      this.produtosFiltrados = data;
      this.termoPesquisa = '';
      this.filtradoPorCategoria = false;
      this.categoriaSelecionada = '';
      refresher.complete();
    },
      (erro) => {
        refresher.complete();
        this.mostrarMensagemErro(erro);
      });
  }
}
