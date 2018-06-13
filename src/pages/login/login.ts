import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DashboardPage } from '../dashboard/dashboard';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { SignupPage } from '../signup/signup';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  responseData : any;
  userData = {"email": "" ,"password": ""};

  constructor(public navCtrl: NavController, public navParams: NavParams, public authService:AuthServiceProvider) {
  }

  login(){
    this.authService.postData(this.userData,'login').then((result) => {
     this.responseData = result;

     if(this.responseData.status == 200){
        localStorage.setItem('authToken', result['authToken']);
        this.navCtrl.push(DashboardPage);
     }
   }, (err) => {
     console.log(err)
   });
 }

 signup(){
   //Login page link
   this.navCtrl.push(SignupPage);
 }

}
