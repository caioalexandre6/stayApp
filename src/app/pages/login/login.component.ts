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

  changeLogin() {
    if (this.option == false) {
      this.option = true;
    } else {
      this.option = false;
    }
  }

  login() {
    this.auth
      .signInWithEmailAndPassword(this.userEmail, this.userPassword)
      .then((value) => {
        console.log('Nice, it worked!');
        this.router.navigate(['/admin']);
      })
      .catch((err) => {
        console.log('Something went wrong: ', err.message);
      });
  }

  /*  Metodo para realizar um novo cadastro passando os objetos de login e senha */
  cadastrar() {
    this.apiService
      .signUp(this.userNewEmail, this.userNewPassword)
      .subscribe((data) => {
        console.log('Respostass', data);
      });
  }

  ngOnInit(): void {}
}
