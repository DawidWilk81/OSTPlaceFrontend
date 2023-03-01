import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SongService } from '../song.service';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { loadStripe } from '@stripe/stripe-js';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {
  @ViewChild('audio') audio!:ElementRef;
  @ViewChild('audioBox') audioBox!:any;
  @ViewChild('title') title!:ElementRef;
  MyBasket:any;
  xSign = faX;
  tagList:any;
  //MUSIC PLAYER
  isPlaying = false;
  settedMusic:any = '';
  stripeAPIKey:any = 'pk_test_51Lxq1oEdKC3LJHX6jHCB4Z9rRbL4T2ZGe8OaKhgd60TGrdrJ1ea0YocFwQicoffZ5iLsyE6sya1892vh5monnsgY00n8fSXJM9';
  paymentHandler:any = null;
  stripe:any;
  emptyBasket:boolean = false;

  constructor(
    private _OSTS:SongService
  ) { 

    this._OSTS.getTags().subscribe(
      Response =>{
        this.tagList = Response;
      }, error =>{
        console.log(error);
      }
    )
  }

  ngOnInit(): void {
    this._OSTS.GetTheBasket().subscribe(
      Response =>{
        this.MyBasket = Response;
        console.log('MY BASKET: ', this.MyBasket);
      }, error =>{
        console.log(error);
      }
    )
  }
  emptyBasketAlert(){
    this.emptyBasket = !this.emptyBasket;
  }
  playAudio(audioSRC:any, titleOST:any){
    if(this.settedMusic == false){
      this.isPlaying = true;
      this.title.nativeElement.innerHTML = titleOST;
      this.audioBox.nativeElement.src = audioSRC;

      this.audioBox.nativeElement.play();
    }else if(this.settedMusic == true){
      this.isPlaying = false;
      this.audio.nativeElement.pause();
    }
  }

  delItem(id:any){
   this._OSTS.delItemBasket(id).subscribe(
    Response =>{
      alert('item has been removed properly');
      window.location.reload();
    }, error =>{
      console.log(error);
    }
   )
  }

  async stripeCode(){
    console.log(this.MyBasket);
    console.log(this.MyBasket.length);
    if(this.MyBasket.length > 0){
      this.stripe = await loadStripe("pk_test_51Lxq1oEdKC3LJHX6jHCB4Z9rRbL4T2ZGe8OaKhgd60TGrdrJ1ea0YocFwQicoffZ5iLsyE6sya1892vh5monnsgY00n8fSXJM9");
      var titles = this.MyBasket.map((x:any) => x.OST);
      this._OSTS.checkOutSession(titles).subscribe(
        Response =>{
          // console.log(Response);
          return this.stripe.redirectToCheckout({sessionId : String(Response)});
        }, error =>{
          console.log(error);
        }
      );
    }else{
      this.emptyBasket = true;
      console.log('EMPTY')
    }
    
  }




}
