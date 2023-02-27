import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { faUser, faWrench, faCompactDisc, faFolderPlus, faHome, faDollar, faBell, faPowerOff, faShoppingBasket, faWallet } from '@fortawesome/free-solid-svg-icons';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  @Output() username = new EventEmitter();
  userInformation:any;
  url:any;

  //Stripe
  balance:any;

  //icons
  userIcon = faUser;
  wrench = faWrench;
  disc = faCompactDisc;
  plus = faFolderPlus;
  bell = faBell;
  logout = faPowerOff;
  basket = faShoppingBasket;
  wallet = faWallet;
  home = faHome;
  dollar = faDollar;
  showCollapsedNavbar:boolean = false;
  constructor(
    private _router:Router,
    private _cookie:CookieService,
    private _us:UserService
  ) {
    this.userInformation = {
      user:'',
      avatar:'',
    };
    this._us.getUserAccount().subscribe(
      Response =>{
        this.userInformation = Response[0];
        this.username.emit(Response[0].user);
        console.log('consoled', Response[0]);
      }
     )  
  }

  ngOnInit(): void {
    //CHECK URL
    this.url = this._router.url;
    console.log(this.url);
    // get Username from parent
  }

  logOut(){
    this._cookie.delete('token');
    this._cookie.delete('sessionid');
    this._cookie.deleteAll('/', 'localhost:4200');
    this._router.navigateByUrl('');
    }

  changeDir(dir:string){
    this._router.navigateByUrl(dir);
  }
  goHome(){
    this._router.navigateByUrl('home');
   }
  showNaviMassive(){
    this.showCollapsedNavbar = !this.showCollapsedNavbar;
  }
}
