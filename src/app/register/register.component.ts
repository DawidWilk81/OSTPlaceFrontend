import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { UserService } from '../user.service';


class Signup {
  constructor(
    public username:string = '', 
    public email:string = '', 
    public password:string = '',
  ){}
}

class email {
  constructor(
    public subject='Activate your account',
    public toEmail='',
  ){}
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],

})

export class RegisterComponent implements OnInit {
  
  account:any;
  @ViewChild('emailInput', { read: ElementRef }) emailInput!: ElementRef;
  @ViewChild('password', { read: ElementRef }) passwordInput!: ElementRef;
  emailValid:any;
  check = faCheck;
  userInfo:any;
  emailForm:email = new email();
  //form validator box's
  logFocus=false;
  passFocus=false;
  emailInUse:boolean = false;
  constructor(
    private _US:UserService,
    private _router:Router,
    private _renderer2:Renderer2
  ) { }

  ngOnInit(): void {
    
   this.userInfo={
    username:'',
    password:'',
    email:'',
    profile: {
      balance:0,
      }
   }
  }

  validateEmail(ev:any){
    // CHECK EMAIL PATTERN 
    console.log(ev.target.pattern);
    let pattern = new RegExp(ev.target.pattern);
    let value = ev.target.value;
    console.log(value);
    let result = pattern.test(value);
    
    // CHECK EMAIL PATTERN RESULT VALUE
    if(result === true){
      this.checkEmail();
     
    }else if(result === false){
      this._renderer2.setStyle(this.emailInput.nativeElement, 'border', '2px solid red');
    }
  }
  validatePassword(ev:any){
    // CHECK EMAIL PATTERN 
    console.log(ev.target.pattern);
    let pattern = new RegExp(ev.target.pattern);
    let value = ev.target.value;
    console.log(value);
    let result = pattern.test(value);
    
    // CHECK EMAIL PATTERN RESULT VALUE
    if(result === true){
      this.checkEmail();
      this.emailValid = true;
      this._renderer2.setStyle(this.passwordInput.nativeElement, 'border', 'none');
    }else if(result === false){
      this.emailValid = false;
    }
  }
  registerUser(){
    
    return this._US.register(this.userInfo).subscribe(

      Response =>{
        alert('User registered correctly');
        this._router.navigateByUrl('');
      }, error =>{
        console.log(error);
        alert('Email already in use by another account');
      }
    )
  }

  checkEmail(){
    return this._US.checkIfEmailExist(this.userInfo.email).subscribe(
      Response =>{
        console.log(Response);

        this.emailValid = false;
        this.emailInUse = true;
        this._renderer2.setStyle(this.emailInput.nativeElement, 'border', '2px solid red');

      }, error =>{
        console.log(error);

        this.emailValid = true;
        this.emailInUse = false;
        this._renderer2.setStyle(this.emailInput.nativeElement, 'border', 'none');

      }
    )
  }

}
