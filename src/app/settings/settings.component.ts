import { Component, OnInit, Renderer2, ViewChild,  } from '@angular/core';
import { faCog, faPenAlt, faUser, faXmarkCircle, faX } from '@fortawesome/free-solid-svg-icons';
import { UserService } from '../user.service';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})


export class SettingsComponent implements OnInit {
  @ViewChild('avatarCircle') avatarCircle!: HTMLInputElement;
  @ViewChild('newPassword') setPassword!: HTMLInputElement;
  @ViewChild('confirmPassword') confirmPassword!: HTMLInputElement;

  changeEmail:boolean = false;
  changePassword = false;
  passwordForm:any;
  newEmail:any;
  //FONT AWESOME ICONS
  cog = faCog;
  change = faPenAlt;
  user = faUser;
  xMark = faXmarkCircle;
  xSign = faX;
  showMark:boolean = false;
  userAccount:any;
  userInfo:any;

  //GRAB AVATAR
  avatarInjected:any;
  avatar:any;

  // AVATAR ERRORS
  avatarTypeError:boolean = false;
  avatarSizeError:boolean = false;
  avatarWeightError:boolean = false;
  avatarAccept:boolean = true;
  alertSuccess:boolean = false;
  disableButton:boolean = false;

  // AVATAR RESOLUTIONS AND SRC URL
  imgWidth:any;
  imgHeight:any;

  imgUrl:any;

  //FORM VALUES
  checkPassword:any;
  validPassword:boolean = true;
  passwordWasInUse:boolean = false;
  //EMAIL
  constructor(
    private _US:UserService,
    private _renderer:Renderer2
  ) {}

  ngOnInit(): void {
    this.userInfo = {
      oldPassword:'',
      newPassword:'',
    }

    this.userAccount = {
      avatar:'',
      user:Number,
    }

    this._US.getUserAccountSetting().subscribe(
      Response =>{
        this.userAccount = Response[0];
        console.log('REsponse:', this.userAccount);
      }, error =>{
        console.log(error);
      }
    )
  }

  // PAGE CALLS
  showEmail(){
    this.changeEmail = !this.changeEmail;
  }

  showPassword(){
    this.changePassword = !this.changePassword;
  }

  onAvatarChange(event:any){
    let file_size = event.target.files[0].size;
    let file_name = event.target.files[0].name;
    console.log(file_size);

    let avatar = event.target.files[0];
    console.log(event.target.files[0]);

    //READER FIRST
    let reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload=(event:any)=>{
      console.log('EVENT:', event);
      let cover = new Image();
      cover.src = event.target.result;
      this.imgUrl = event.target.result;
      cover.onload = () => {
            // GET FILE IMAGE RESOLUTION
            this.imgWidth = cover.width;
            this.imgHeight = cover.height;
            console.log(this.imgWidth, 'h', this.imgHeight);
            // GET FILE END
            if(file_name.endsWith('.png') || file_name.endsWith('.jpg')){
              this.avatarTypeError = false;
              // RESOLUTION CHECK
              console.log('WIDTH:', this.imgWidth, this.imgWidth >= 3000 );
              console.log('height:', this.imgHeight, this.imgHeight >= 2000 );
              if(this.imgWidth >= 3000 || this.imgHeight >= 2000){
                this.avatarSizeError = true;
                this.avatarAccept = false;
                this.showMark = true;
              }else{
                this.avatarSizeError = false;
                file_size = file_size/1024/1024;
                console.log('MEBI:', file_size);
                // FILE SIZE CHECK 
                console.log("weight: Check", file_size >= 5, 'SIZE:', file_size);
                
                if(file_size >= 5){
                  this.avatarWeightError = true;
                  this.avatarAccept = false;
                  this.showMark = true;
                }else{
                  this.avatarWeightError = false;
                  this.avatarAccept = true;
                  // ASSIGN VALIDATED USER IMG
                  this.userAccount.avatar = avatar;
                  this.showMark = false;
                }
              }
              // IMAGE TYPE ERROR
          }else{
            this.userAccount.avatar = null;
            this.avatarAccept = false;
            this.avatarTypeError = true;
            this.showMark = true;
          }
      }
    }
    
  }
  //  HTTP CALLS 
  changeAvatar(){
    this.disableButton = true;
    this._US.changeAvatar(this.userAccount.avatar, this.userAccount.id).subscribe(
      Response =>{
        window.location.reload();
        this.alertSuccess = true;
        this.disableButton = false;
      }, error =>{
        console.log(error);
      }
    )
  }

  updatePassword(){
    let body = new FormData();
    body.append('password', this.userInfo.oldPassword);
    body.append('replacePassword,', this.userInfo.newPassword);

    if(this.userInfo.newPassword == this.checkPassword){
      // MAKE A CALL
      this._US.ChangePassword(body, this.userAccount.user).subscribe(
        Response =>{
          this.validPassword = true;
          alert('Password has been changed!');
          window.location.reload();
        }, error =>{
          this.validPassword = false;
          console.log(error);
        }
      )
    }
  }
  sendchangeEmail(){
    this._US.sendchangeEmail(this.newEmail).subscribe(
      Response =>{
        console.log('Response:', Response);
        alert('Check your email for change password confirmation link ;>');
      }, error =>{
         console.log(error);
      }
    )
  }

  hideAlert(){
    this.alertSuccess = !this.alertSuccess;
  }

}
