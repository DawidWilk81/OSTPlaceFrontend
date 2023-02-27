import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UnloggedComponent } from './unlogged/unlogged.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LoggedHomeComponent } from './logged-home/logged-home.component';
import { MyOstComponent } from './my-ost/my-ost.component';
import { SettingsComponent } from './settings/settings.component';
import { AddSongComponent } from './add-song/add-song.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { ChangeOSTComponent } from './change-ost/change-ost.component';
import { BasketComponent } from './basket/basket.component';
import { SuccessComponent } from './success/success.component';
import { CancelComponent } from './cancel/cancel.component';
import { EmailConfirmedComponent } from './email-confirmed/email-confirmed.component';
import { ChangeEmailComponent } from './change-email/change-email.component';
const routes: Routes = [
  {path:'', component:UnloggedComponent},
  {path:'login', component:LoginComponent},
  {path:'register', component:RegisterComponent},
  {path:'home', component:LoggedHomeComponent},
  {path:'activateAccount/:token', component:EmailConfirmedComponent},
  {path:'changeEmail/:token/:newEmail', component:ChangeEmailComponent},
  
  // API sites
  {path:'home/notifications', component:NotificationsComponent},
  {path:'home/myOST', component:MyOstComponent},
  {path:'home/myOST/change/:id', component:ChangeOSTComponent},
  {path:'home/settings', component:SettingsComponent},
  {path:'home/addSong', component:AddSongComponent},
  {path:'home/basket', component:BasketComponent},

  // PAYMENT GATEWAY  
  {path: 'home/success', component: SuccessComponent},
  {path: 'home/cancel/canceled', component: CancelComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
