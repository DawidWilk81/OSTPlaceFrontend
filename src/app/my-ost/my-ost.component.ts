import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SongService } from '../song.service';
import { faPen, faRemove, faX, faDownload } from '@fortawesome/free-solid-svg-icons';
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-my-ost',
  templateUrl: './my-ost.component.html',
  styleUrls: ['./my-ost.component.scss']
})
export class MyOstComponent implements OnInit {
  @ViewChild('audio') audio!:ElementRef;
  @ViewChild('audioBox') audioBox!:any;
  @ViewChild('title') title!:ElementRef;

  deleteAlert:boolean = false;
  OSTS:any;
  pen = faPen;
  remove = faRemove;
  xSign = faX;
  download = faDownload;
  id:any;
  modalPop:boolean = false;
  playHover = faPlayCircle
  //MUSIC PLAYER
  isPlaying:boolean = false;
  settedMusic:any = '';
  alertSuccess:boolean = false;
  //Pagination
  pageNum:any = 1;
  collectionSize:any = 0;
  constructor(
    private _myOSTS: SongService,
  ) { }

  ngOnInit(): void {
    this._myOSTS.getMyOSTSLen().subscribe(
      Response =>{
        console.log('LEN', Response);
        this.collectionSize = Response;
      }
    )
    this._myOSTS.getMyOSTS(this.pageNum).subscribe(    
    Response =>{
      console.table(Response);
      this.OSTS = Response;
    }, error =>{
      console.log(error);
    })
  }
  waitForSec = (time:any) => new Promise(x => setTimeout(x, time));


  // LOGGED HOME FUNCTIONS
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
  toggleAlert(id:any){
    this.id = id;
    this.deleteAlert = !this.deleteAlert;
  }
  hideAlert(){
    this.deleteAlert = !this.deleteAlert;
  }
  removeOST(){
    this._myOSTS.deleteOST(this.id).subscribe(
      Response =>{
        console.log(Response);
        this.modalPop = true;
        location.reload();
        this.alertSuccess = true;
      }, error =>{
        console.log(error);
      }
    )
  }
  hideAlertSuccess(){
    this.alertSuccess = !this.alertSuccess;
  }

  changePage(ev:any){
    this.pageNum = ev;
    this._myOSTS.getMyOSTS(this.pageNum).subscribe(    
      Response =>{
        console.table(Response);
        this.OSTS = Response;
      }, error =>{
        console.log(error);
      })
  }
}
