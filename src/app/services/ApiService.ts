import { Produtos } from './../models/produtos';
import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  public googleapisLogin: string;
  public googleapisSignUp: string;
  public googleapisCheckUser: string;
  public getProduto : string;
  public criarProduto : string;
  public deletarProduto : string;
  public atualizarProduto : string;

  constructor(private httpClient: HttpClient) {
    // URL API para Login do firebase
    this.googleapisLogin =
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDKp05V515h6CX8brfoYgClbK-c06nZwC4';
     // URL API para Cadastrar do firebase
    this.googleapisSignUp =
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDKp05V515h6CX8brfoYgClbK-c06nZwC4';
      // URL API para receber os dados do usúario logado do firebase
    this.googleapisCheckUser =
      'https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDKp05V515h6CX8brfoYgClbK-c06nZwC4';
       // URL API para receber todos os produtos do firestore
    this.getProduto =
      'https://us-central1-stayapp-4ad22.cloudfunctions.net/webApi/api/v1/produtos';
       // URL API para criar um novo produto
    this.criarProduto =
      'https://us-central1-stayapp-4ad22.cloudfunctions.net/webApi/api/v1/produtos';
       // URL API para deletar um unico produto do firestore
       this.deletarProduto =
      'https://us-central1-stayapp-4ad22.cloudfunctions.net/webApi/api/v1/produtos/:produtoId';
       // URL API para atualizar um unico produto do firestore
    this.atualizarProduto =
      'https://us-central1-stayapp-4ad22.cloudfunctions.net/webApi/api/v1/produtos/:produtoId';
  }


// Metodo http para realizar o login via email e senha
  loginService(email: any, password: any) {
    var obj = {
      email,
      password,
    };
    const headers = new HttpHeaders();
    return this.httpClient.post(this.googleapisLogin, obj, { headers });
  }

// Metodo http para cadastrar um novo usuario via email e senha
  signUp(email: any, password: any) {
    var obj = {
      email,
      password,
    };
    const headers = new HttpHeaders();
    return this.httpClient.post(this.googleapisSignUp, obj, { headers });
  }

 // Metodo http para obter todos os produtos
    getProdutos() {
    const headers = new HttpHeaders()
    return this.httpClient.get(this.getProduto, { headers });
    }

 // Metodo http para criar um produto
     criarProdutos(obj: Produtos) {
    const headers = new HttpHeaders()
    return this.httpClient.post(this.criarProduto, obj, { headers });
    }

// Metodo http para deletar um produto especifico
     deletarProdutos(obj: any) {
       this.deletarProduto =
      'https://us-central1-stayapp-4ad22.cloudfunctions.net/webApi/api/v1/produtos/' + obj;
    const headers = new HttpHeaders()
    return this.httpClient.delete(this.deletarProduto, obj);
    }

// Metodo http para atualizar um produto
      atualizarProdutos(obj: any) {
         this.atualizarProduto =
      'https://us-central1-stayapp-4ad22.cloudfunctions.net/webApi/api/v1/produtos/' + obj.produtoId;
    const headers = new HttpHeaders()
    return this.httpClient.put(this.atualizarProduto, obj, { headers });
    }



}
