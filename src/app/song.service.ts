import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { loadStripe } from '@stripe/stripe-js';

@Injectable({
  providedIn: 'root'
})
export class SongService {
  token = this._cookies.get('token');
  tags:any;
  OST:any;
  headers = new HttpHeaders(
    {
      'Authorization': `Token ${this.token}`
    }
  );
  
  backEndUrl = 'http://localhost:8000/';
  constructor(
    private _http:HttpClient,
    private _cookies:CookieService
  ) { }

  addToBasket(body:any):Observable<any>{
    return this._http.post(this.backEndUrl + 'api/userBasket/', body, {headers:this.headers})
  }

  GetTheBasket():Observable<any>{
    return this._http.get(this.backEndUrl + 'api/getUserBasket/', {headers: this.headers})
  }

  delItemBasket(id:any):Observable<any>{
    return this._http.delete(this.backEndUrl + `api/userBasket/${id}/`, {headers: this.headers})
  }

  sendOST(body:any):Observable<any>{
    return this._http.post(this.backEndUrl + 'api/ostAdd/', body, {headers:this.headers});
  }

  getOST(id:any):Observable<any>{
    console.log(id)
    return this._http.get(this.backEndUrl + `api/getOST/${id}/`, {headers:this.headers});
  }


  deleteOST(id:any):Observable<any>{
    let param:any = new HttpParams().set('primary', id);
    return this._http.delete(this.backEndUrl + `api/deleteOST/${id}/`, {headers:this.headers, params:param});
  }

  //UPDATE WHOLE OST 
  putOST(id:any, body:any):Observable<any>{
    let param:any = new HttpParams().set('primary', id);
    return this._http.put(this.backEndUrl + `api/updateOST/${id}/`, body, {headers:this.headers, params:param});
  }

  //UPDATE OST TAGS
  updateTags(id:any, tags:any):Observable<any>{
    return this._http.put(this.backEndUrl + `api/updateTagsOST/${id}/`, tags, {headers:this.headers})
  }

  getTags():Observable<any>{
    return this._http.get(this.backEndUrl + 'api/tags/');
  }
  //OST PAGINATION
  getOSTS(pageNum:any, sortBy:any):Observable<any>{
    console.log('tasaokd: ', sortBy);
    let param:any = new HttpParams().set('pageNum', pageNum).set('sortBy', sortBy);
    return this._http.get(this.backEndUrl + 'api/ostPaginate/', {params: param, headers:this.headers});
  }
  // GET PAGINATED OSTS WITHOUT TAGS(CLEAN)
  getOstLength():Observable<any>{
    return this._http.get(this.backEndUrl + 'api/ostPaginate/count/', {headers:this.headers});
  }
  getOstFilterLength(tagsCall:any):Observable<any>{
    let params:any = new HttpParams().set('tags', tagsCall);
    return this._http.get(this.backEndUrl + 'api/filterOST/count/', {headers:this.headers, params:params});
  }
  // -- OST PAGINATION END---
  getUnloggedOSTS():Observable<any>{
    return this._http.get(this.backEndUrl + 'api/getUnloggedOSTS/');
  }

  getMyOSTS(pageNum:any):Observable<any>{
    let param:any = new HttpParams().set('pageNum', pageNum);
    return this._http.get(this.backEndUrl + 'api/myOSTS/', {params:param, headers: this.headers})
  }
  getMyOSTSLen():Observable<any>{
    return this._http.get(this.backEndUrl + 'api/myOSTS/count/', {headers: this.headers})
  }
  filterTags(searchCall:any):Observable<any>{
    let params:any = new HttpParams().set('search', searchCall);
    return this._http.get(this.backEndUrl + 'api/tagsFilter/', {params: params, headers:this.headers});
  }

// GET FIRST PAGINATED VALUES FROM ON OST TAGS CLICKED 
  filterOSTS(tagsCall:any, pageNum:any, sortBy:any):Observable<any>{
    let params:any = new HttpParams().set('tags', tagsCall).set('pageNum', pageNum).set('sortBy', sortBy.trim());
    return this._http.get(this.backEndUrl + 'api/filterOST/', {params: params, headers:this.headers})
  }
// SEARCH TAB FROM LOGGED COMPONENT CALLS
  searchOSTS(tagsCall:any, pageNum:any, title:any, priceFrom:any, priceTo:any, sortBy:any ):Observable<any>{
      let params:any = new HttpParams().set('tags', tagsCall)
      .set('pageNum', pageNum)
      .set('priceFrom', priceFrom)
      .set('priceTo', priceTo)
      .set('title', title)
      .set('sortBy', sortBy);


    return this._http.get(this.backEndUrl + 'api/ostSearch/', {params: params, headers:this.headers})
  }

  getOstSearchLength(tagsCall:any, pageNum:any, title:any, priceFrom:any, priceTo:any ):Observable<any>{
    let params:any = new HttpParams().set('tags', tagsCall)
    .set('pageNum', pageNum)
    .set('priceFrom', priceFrom)
    .set('priceTo', priceTo)
    .set('title', title);

    return this._http.get(this.backEndUrl + 'api/ostSearch/count/', {headers:this.headers, params:params});
  }
  
  // STRIPE PAY
  stripeCode(){
    return this._http.get(this.backEndUrl + 'api/stripeConf/', {headers:this.headers});
  }

  checkOutSession(products:any){
    let body = new FormData();
    body.append('products', products);
    return this._http.post(this.backEndUrl + `api/create-checkout-session/`,body, {headers:this.headers})
  }
}
