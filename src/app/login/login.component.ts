import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { boolean } from 'zod';
import { UserService } from '../user.service';

class loginData {
  constructor(
    public username:string = '', 
    public password:string = '',
  ){}
}


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  errorLogin = false;
  userInfo:loginData = new loginData();
  logging:boolean = false;
  x:any = 4;

  constructor(
    private _US:UserService,
    private _router:Router
  ) { }

  ngOnInit(): void {}

  loginUser(){
      this.logging = true;
      // console.log('ERRORR', error);
      console.log(Response);
      this._US.login({username:this.userInfo.username, password: this.userInfo.password});
    }

  goRegister(){
    this._router.navigateByUrl('register')
  }
}
