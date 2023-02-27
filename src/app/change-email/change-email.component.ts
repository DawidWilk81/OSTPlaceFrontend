import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-change-email',
  templateUrl: './change-email.component.html',
  styleUrls: ['./change-email.component.scss']
})
export class ChangeEmailComponent implements OnInit {
  token:any;
  newEmail:any;
  constructor(
    private _router:Router,
    private _routes:ActivatedRoute,
    private _US:UserService
  ) { }

  ngOnInit(): void {
    this.token = this._routes.snapshot.paramMap.get('token');
    this.newEmail = this._routes.snapshot.paramMap.get('newEmail');
    console.log(this.token, this.newEmail);
    this._US.changeEmailAlready(this.newEmail, this.token).subscribe(
      Response =>{
        console.log(Response);
        alert('Email has been changed in database');
      }, error =>{
        console.log(error);
      }
    )
  }

  changePlace(where:string){
    this._router.navigateByUrl(where);
  }
}
