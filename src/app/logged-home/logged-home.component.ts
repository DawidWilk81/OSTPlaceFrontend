import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { faUser, faArrowCircleRight, faArrowAltCircleDown, faArrowAltCircleUp, faArrowCircleLeft, faBroomBall, faX, faMagnifyingGlass ,faCartShopping, faCog, faCompactDisc, faFolderPlus, faBell, faPowerOff, faBars, faPlayCircle, faBroom } from '@fortawesome/free-solid-svg-icons';
import { SongService } from '../song.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-logged-home',
  templateUrl: './logged-home.component.html',
  styleUrls: ['./logged-home.component.scss'],
})

export class LoggedHomeComponent implements OnInit {
  @ViewChild('audio') audio!:ElementRef;
  @ViewChild('audioBox') audioBox!:any;
  @ViewChild('title') title!:ElementRef;
  
  // sortOptions = {
  //   price_Desc,
  //   price_Asc
  // }

  // FONT AWESOME ICONS
  userIcon = faUser;
  cart = faCartShopping;
  cog = faCog;
  disc = faCompactDisc;
  plus = faFolderPlus;
  bell = faBell;  
  logout = faPowerOff;
  bars = faBars;
  xSign = faX;
  arrowRight = faArrowCircleRight;
  arrowLeft = faArrowCircleLeft;
  fGlass = faMagnifyingGlass;
  broom = faBroomBall;
  arrowUp = faArrowAltCircleUp;
  arrowDown = faArrowAltCircleDown;

  username:any;
  playHover = faPlayCircle;
  tagList:any;
  tags:any;
  hovered:boolean = false;
  clickedOST:boolean = false;
  alreadyInBasket:boolean = false; 
  addedOST:boolean = false; 
  OSTChecking:any;
  pickedTags:any = [];
  searchTagsInputValue:any;
  userAccount:any;
  userInformation:any;
  checkingOSTId:any;
  //pagination and get array
  songs:any = '';
  collectionSize:any;
  pageNum = 1;

  //MUSIC PLAYER
  isPlaying = false;
  settedMusic:any = '';
  
  //SEARCH TAB
  showSearch:boolean = false;
  searchOstsOptions:any;
  searchRN:boolean = false;
  searchOstTag:boolean = false;
  sortBy:any = '';


  //TAGS VARS
  filteredTags=[];
  choosedTags:any = [];
  
  
  constructor(
    private _OSTS:SongService,
    private _US:UserService,
  ) { 
    this._OSTS.getOstLength().subscribe(
      Response =>{
        this.collectionSize = Response;
        console.log('COLLECTION:', Response);
      }, error =>{
        console.log(error);
      }
    )
    this._OSTS.getTags().subscribe(
      Response => {
        this.tagList = Response;
        this.filteredTags = Response;
        this.tags = Response;
        console.log('tagLIST:', this.tagList);
      }, error =>{
        console.log(error);
      }
    );
  }

  ngOnInit(): void {
    this.searchOstsOptions = {
      title:'',
      priceFrom:1,
      priceTo:1,
      tags:[]
    }

    this.OSTChecking = {
      ost:'',
      desc:'',
      price:'',
      tags:[],
      author:'',
      date:''
    }

    this.userInformation = {
      user:'',
      avatar: '',
      balance: '',
      id: '',
    }
    this.getCleanOSTS();
  }
  @ViewChild('magnify') magnify!:ElementRef;

  // ON SORT BUTTON CHANGE
  getSortValue(evt:any){
    console.log(evt.target.outerText);
    this.sortBy = evt.target.outerText.trim();
    if(this.searchRN){
      console.log('now its search by searchRN');
      return this.filterBySearchTab();
    }else if(this.searchOstTag){
      console.log('now its search by searchRN');
      return this.FilterOSTS();
    }else{
      return this.getCleanOSTS();
    }
  }
  // SEARCH BUTTON FUNCTION IN SEARCH TAB
  searchOSTS(){
    this.pageNum = 1
    this.searchRN = true;
    this.searchOstTag = false;
    console.table(this.choosedTags);
    this.filterBySearchTab();
  }
  //CHANGE PAGE ON PAGINATION BAR
  changePage(ev:any){
    this.pageNum = ev;
    if(this.searchRN){
      this.filterBySearchTab();
    }else if(this.searchOstTag){
     this.FilterOSTS();
    }else{
      this.getCleanOSTS();
    }
  }
  hideAlready(){
    this.alreadyInBasket = !this.alreadyInBasket;
  }

  addedBasketInfo(){
    this.addedOST = !this.addedOST;
  }
    
  getCleanOSTS(){
    this.searchOstTag = false;
    this.searchRN = false;
    this._OSTS.getOSTS(this.pageNum, this.sortBy).subscribe(
      Response =>{
        console.log('now i will sort by:', this.sortBy);
        this._OSTS.getOstLength().subscribe(
          Response =>{
            this.collectionSize = Response;
            console.log('COLLECTION:', Response);
          }, error =>{
            console.log(error);
          }
        )
        this.songs = Response;
        console.log('SONGSSIZE: ', this.songs);
      }, error =>{
        console.log(error);
      }
    )
  }
  // TAGS BEING CLICKED FUNCTIONS
  // I CLICKED TAG ON OST TO FILTER
  FilterOSTS(){
    console.table(this.pickedTags);
    this._OSTS.filterOSTS(this.pickedTags, this.pageNum, this.sortBy).subscribe(
      Response =>{
        this._OSTS.getOstFilterLength(this.pickedTags).subscribe(
          Response=>{
            console.log('FILTER LEN:', Response);
            this.collectionSize = Response;
          }, error =>{
            console.log(error);
          }
        )
        this.songs = Response;
        console.log('COLLECTIONSizeRes', Response);
      }, error =>{
        console.log(error);
      }
    )
  }
  // I USED SEARCH TAB TO FILTER
  filterBySearchTab(){
    this.pickedTags = [];
    return this._OSTS.searchOSTS(this.choosedTags, this.pageNum, this.searchOstsOptions.title, this.searchOstsOptions.priceFrom, this.searchOstsOptions.priceTo, this.sortBy).subscribe(
      Response =>{
        this._OSTS.getOstSearchLength(this.choosedTags, this.pageNum, this.searchOstsOptions.title, this.searchOstsOptions.priceFrom, this.searchOstsOptions.priceTo).subscribe(
          Response=>{
            console.log('FILTER LEN:', Response);
            this.collectionSize = Response;
          }, error =>{
            console.log(error);
          }
        )
        this.songs = Response;
        console.log('COLLECTIONSizeRes', Response);

      }, error =>{
        console.log(error);
      }
    )
  }


    // Click tag on OST to filter OSTS
    clickOstTag(tag:any){
      console.log(tag);
      this.searchRN = false;
      this.searchOstTag = true;
      this.choosedTags = [];
      if(!this.pickedTags.includes(this.tags[tag-1].name)){
        if(this.pickedTags.length >= 4){
          alert('You cant assign more than 4 tags');
        }else if(this.pickedTags.length <= 3){
          this.searchRN = false;
          //Put clicked tag into choosed tags
          console.log('clickedTags', this.tagList);
          this.pickedTags.push(this.tagList[tag-1]['name']);
          this.FilterOSTS();
        }else{
          alert('error');
        }
      }else{
        alert('This tag is already in use');
      }
    }
  // RESET OSTS WITH NO TAGS
  cleanOutSearch(){
    this.choosedTags = [];
    this.pickedTags = [];
    this.searchOstsOptions = {
      title:'',
      priceFrom:1,
      priceTo:1,
      tags:[]
    };
    this.getCleanOSTS();
  }

  // clickTag(id:number){
  //   if(!this.pickedTags.includes(this.tagList[id]['name'])){
  //     if(this.pickedTags.length >= 4){
  //       alert('You cant assign more than 4 tags');
  //     }else if(this.pickedTags.length <= 3){
  //       //Put clicked tag into choosed tags
  //       console.log('consoel', this.tagList);
  //       this.pickedTags.push(this.tagList[id]['name']);
  //       this.FilterOSTS();
  //     }else{
  //       this.FilterOSTS();
  //     }
  //   }else{
  //     alert('This tag is already in use');
  //   }
  // }


  // CLICK TAG TO REMOVE FROM pickedTags ARRAY
  clickChoosedTag(id:number){
    if(id==0){
      this.pickedTags.shift();
      this._OSTS.getOSTS(this.pageNum, this.sortBy).subscribe(
        Response =>{
          this._OSTS.getOstLength().subscribe(
            Response =>{
              this.collectionSize = Response;
              console.log('COLLECTION:', Response);
            }, error =>{
              console.log(error);
            }
          )
          this.songs = Response;
          console.log('SONGSSIZE: ', this.songs);
          
        }, error =>{
          console.log(error);
        }
      )
    }else if(id == this.pickedTags.length-1){
      this.pickedTags.splice(-1);
      this.FilterOSTS();
    }else{
      this.pickedTags.splice(id,id);
      this.pageNum = 1;
      this.FilterOSTS();
    }
  }
  


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

  checkOST(id:Number, username:any){
    this._US.getOtherUserAccount(username).subscribe(
      Response =>{
        this.userAccount=Response[0];
        console.log(this.userAccount);
      }, error =>{
        console.log("ERROR", error);
      }
    )
    this._OSTS.getOST(id).subscribe(
      Response =>{
        this.OSTChecking = Response;
        console.table('CLICKED OST:', this.OSTChecking);
        console.log(this.userAccount.user, '==?', this.OSTChecking.author)
      }, error =>{
        console.log(error);
      }
    )
    this.clickedOST = !this.clickedOST;
  }

  exitOST(){
    this.clickedOST = !this.clickedOST;
  }

  exitSearch(){
    this.showSearch = !this.showSearch;
  }
  // filterTags(event:any){
  //   this._OSTS.filterTags(this.searchTagsInputValue).subscribe(
  //     Response =>{
  //       console.log('sta', Response);
  //       this.tagList = Response;
  //     }, error =>{
  //       console.log(error);
  //     }
  //   )
  // }

 addToBasket(){
  let body = new FormData();
  body.append('ostId', this.OSTChecking.id);
  this.addedOST = false;
  this.alreadyInBasket = false;
  return this._OSTS.addToBasket(body).subscribe(
    Response =>{
      console.log(Response);
      this.addedOST = true;
    }, error =>{
      this.alreadyInBasket = true;
    }
  )
 }

 childUsername(e:any){
  this.username = e;
  console.table('CHILDUSERNAME:', this.userAccount);
 }


//SEARCH FUNCTIONS
clickTag(id:number){
  console.log(id);
  if(!this.choosedTags.includes(this.tagList[id]['name'])){
    if(this.choosedTags.length === 4){
      alert('You cant assign more than 4 tags');
    }else if(this.choosedTags.length <= 3){
      this.choosedTags.push(this.tagList[id]['name']);
      console.log(this.tagList[id]['name']);
      console.table('Choosed', this.choosedTags);
    }else{
      alert('error');
    }
  }else{
    alert('This tag is already in use');
  }
}

clickChoosedTag_Search(id:number){
  if(id==0){
    this.choosedTags.shift();
  }else{
    this.choosedTags.splice(id, id);
  }
  console.log(id);
}
checkPriceFrom(evt:any){
  console.log(evt);
  if(evt >= this.searchOstsOptions.priceTo){
    console.log('it is bigger');
    this.searchOstsOptions.priceFrom = this.searchOstsOptions.priceFrom - 1;
    console.log(this.searchOstsOptions.priceFrom);
  }
}
checkPriceTo(evt:any){
  console.log(evt);
  if(evt <= this.searchOstsOptions.priceFrom){
    console.log('it is');
    this.searchOstsOptions.priceTo = this.searchOstsOptions.priceFrom + 1;
    console.log(this.searchOstsOptions.priceTo);
  }
}
}
