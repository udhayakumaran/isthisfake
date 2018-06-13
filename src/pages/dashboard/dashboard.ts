import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

/**
 * Generated class for the DashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {
  scannedCode = null;
  responseData : any;
  searchData = {"id": "" ,"latitude": "12.981479" ,"longitude": "77.766768" ,"clientID": "NA"};  

  constructor(public navCtrl: NavController, public navParams: NavParams, private barcodeScanner: BarcodeScanner, public authService:AuthServiceProvider) {
  }

  scanCode() {
    this.barcodeScanner.scan().then(barcodeData => {
      this.scannedCode = barcodeData.text;
      this.searchData['id'] = this.scannedCode;

      this.authService.postData(this.searchData,'user/search').then((result) => {
        this.responseData = result;
      }, (err) => {
        console.log(err)
      });
    }, (err) => {
        console.log('Error: ', err);
    });
  }
}
