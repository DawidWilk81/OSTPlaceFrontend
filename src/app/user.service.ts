import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';


@Injectable({
  providedIn: 'root',
})
export class UserService {
  backendLink = 'http://localhost:8000/';
  user:any;
  userInfo:any;
  userAccount:any;
  constructor(
    private _http: HttpClient,
    private _cookie: CookieService
  ) { 
    this.userInfo={
      username:'',
      userAccount:{},
    }

  }
// EMAIL VERIFICATION
    verifyEmail(form:HTMLInputElement): void {
      
    }

// API FUNCTIONS
  login(body:any){
// LOGIN CALL
    return this._http.post(this.backendLink + 'api/auth/', body).subscribe(
      Response =>{
        this._cookie.set('token', Object(Response)['token']);
        this.getUserAccount().subscribe(
          Response =>{
            this.userAccount = Response;
          }
        )
      }, error =>{
        alert('Provided credentials are not correct');
        console.log(error);
      }
    )
  }

  register(profile:any): Observable<any> {
    return this._http.post(this.backendLink + 'api/users/', profile);
  }

  activateAccount(token:any): Observable<any>{
    let param = new HttpParams().set('token', token);
    return this._http.get(this.backendLink + 'api/activateAccount/', {params:param});
  }
  getUserAccount():Observable<any>{
    return this._http.get(this.backendLink + 'api/userAccount/');
  }
  getOtherUserAccount(username:any):Observable<any>{
    let param = new HttpParams().set('username', username);
    return this._http.get(this.backendLink + 'api/otherUserAccount/', {params:param});
  }
  changeAvatar(avatar:any, id:any):Observable<any>{
    let body = new FormData();
    body.append('avatar', avatar);
    return this._http.put(this.backendLink + `api/setUserAvatar/${id}/`, body);
  }

  sendchangeEmail(newEmail:any){
    let param = new HttpParams().set('newEmail', newEmail);
    return this._http.get(this.backendLink + 'api/sendChangeEmail/', {params:param});
  }
  changeEmailAlready(newEmail:any, token:any){
    let param = new HttpParams().set('newEmail', newEmail);
    let headers = new HttpHeaders(
      {
        'Authorization': `Token ${token}`
      })
    return this._http.get(this.backendLink + 'api/ChangeEmailViewSet/', {params:param, headers:headers});
  }

  ChangePassword(userPassword:any, id:any):Observable<any>{
    return this._http.put(this.backendLink + `api/setUserPassword/${id}/`, userPassword);
  }

  getUserAccountSetting():Observable<any>{
    return this._http.get(this.backendLink + 'api/getSettingAccount/');
  }

  checkIfEmailExist(email:any):Observable<any>{
    let body = new FormData();
    body.append('email', email);
    return this._http.post(this.backendLink + 'api/checkEmail/', body);
  }

  getUsername(){
    return this.userAccount;
  }
}
