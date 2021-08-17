import { ApiService } from './../../services/ApiService';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public userEmail: any;
  public userPassword: any;
  public userNewEmail: any;
  public userNewPassword: any;
  public option: boolean;

  constructor(
    private router: Router,
    private apiService: ApiService,
    public auth: AngularFireAuth
  ) {
    this.option = false;
  }

/* Trocar de login para cadastrar usando NgIF */
  changeLogin() {
    if (this.option == false) {
      this.option = true;
    } else {
      this.option = false;
    }
  }


/* Realizar login pelo firebase auth */
  login() {
    this.auth
      .signInWithEmailAndPassword(this.userEmail, this.userPassword)
      .then((value) => {
        this.router.navigate(['/admin']);
      })
      .catch((err) => {
        console.log('Alguma coisa deu errado: ', err.message);
      });
  }

  /*  Metodo para realizar um novo cadastro e login em seguida passando os objetos de login e senha */
  cadastrar() {
    this.apiService
      .signUp(this.userNewEmail, this.userNewPassword)
      .subscribe((data) => {
       this.userNewEmail = this.userEmail;
       this.userNewPassword = this.userNewPassword;
       this.login();
      });

  }

  ngOnInit(): void {}
}
