import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';

/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

let apiUrl = 'http://ec2-13-232-25-67.ap-south-1.compute.amazonaws.com:8080/';

@Injectable()
export class AuthServiceProvider {

  constructor(public http : HttpClient, private toastCtrl: ToastController) {
  }

  postData(postData, type) {
    return new Promise((resolve, reject) => {
      let headers = {
        "Content-Type": "application/json"
      };

      if(type == 'user/search') {
        headers['authToken'] = localStorage.getItem('authToken');
      }

      this.http.post(apiUrl + type, JSON.stringify(postData),{headers: headers})
      .subscribe(res => {
        this.presentToast(res["Message"])
        resolve(res);
      }, (err) => {
        this.presentToast(err.error.message)          
        reject(err);
      });
    });

  }

  presentToast(showText) {
    let toast = this.toastCtrl.create({
      message: showText,
      duration: 3000,
      position: 'top'
    });
  
    toast.present();
  }

}