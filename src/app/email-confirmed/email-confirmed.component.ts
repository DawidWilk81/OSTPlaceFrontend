import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-email-confirmed',
  templateUrl: './email-confirmed.component.html',
  styleUrls: ['./email-confirmed.component.scss']
})
export class EmailConfirmedComponent implements OnInit {
  token:any;

  constructor(private _router:Router,
    private _US:UserService,
    private _routes:ActivatedRoute) { }

  ngOnInit(): void {
    this.token = this._routes.snapshot.paramMap.get('token');
    this._US.activateAccount(this.token).subscribe(
      Response =>{
        console.log(Response);
      }, error =>{
        console.log(error);
      }
    )
  }
  
  changePlace(where:string){
    this._router.navigateByUrl(where);
  }

  
}
