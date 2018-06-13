import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  responseData : any;
  userData = {"email": "", "name": "","password": "","clientID": "NA"};

  constructor(public navCtrl: NavController, public navParams: NavParams, public authService:AuthServiceProvider) {
  }

  signup(){
    this.authService.postData(this.userData,'register').then((result) => {
     this.responseData = result;
     if(this.responseData){
      this.navCtrl.push(LoginPage);
     }
   }, (err) => {
     console.log(err)
   });

 }

 login(){
   //Login page link
   this.navCtrl.push(LoginPage);
 }
}
