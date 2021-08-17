import { Router } from '@angular/router';
import { Produtos } from './../../models/produtos';
import { ApiService } from './../../services/ApiService';
import {Component, OnInit} from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  novosProdutos: Produtos;
  atualizarProdutos: Produtos;
  produtos: Array<any>;
  produtoEscolhido: number;
  emailFormControl : FormControl;

  constructor(private _formBuilder: FormBuilder, private apiService: ApiService, private router: Router,  public auth: AngularFireAuth,) {
   /*  Inicialização de objetos */
        this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
       this.thirdFormGroup = this._formBuilder.group({
      thirdCtrl: ['', Validators.required]
    });

     this.emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

    this.produtos = new Array<any>();
    this.novosProdutos =  new Produtos();
    this.atualizarProdutos = new Produtos();
    this.produtoEscolhido = 0

  }

/* Chamada do APiService para retornar todos os produtos */
  getProdutos(){
   this.produtos = new Array<any>();
    this.apiService
      .getProdutos()
       .subscribe((data : any) => {
         for (let index = 0; index < data.length; index++) {
           this.produtos.push(data[index].data);
         }
      });
  }

/* Chamada do APiService para criar um produto */
   criarProdutos(obj : Produtos){
    this.apiService
      .criarProdutos(this.novosProdutos)
       .subscribe((data : any) => {
          console.log("aquiDD", data)
      });
      setTimeout(() => {
         this.getProdutos();
       }, 1000);
      this.novosProdutos = new Produtos;
      this.novosProdutos.produtoId = Date.now().toString();

  }

/* Chamada do APiService para apagar um produto especifico */
   apagarProduto(id : any){
    this.apiService
      .deletarProdutos(id)
       .subscribe((data : any) => {
             setTimeout(() => {
         this.getProdutos();
       }, 300);
      });
  }


/* Abrir o modal para editar o produto escolhido passando as informações por meio do NGFOR */
editar(produto: Produtos){
this.atualizarProdutos = produto;
}

/* Chamada do metodo para atualizar o produto editado dentro do modal */
atualizarProduto(){
   this.apiService
      .atualizarProdutos(this.atualizarProdutos)
       .subscribe((data : any) => {
           setTimeout(() => {
         this.getProdutos();
       }, 300);
      });
}

 logout() {
    this.auth.signOut().then(() => {
      this.router.navigate(['/']);
    });
  }


  ngOnInit() {
    this.getProdutos();
    this.novosProdutos.produtoId = Date.now().toString();

  }
}
