import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralService } from '../providers/general.service';
import { HttpService } from '../providers/http.service';
import { Storage } from '@ionic/storage';
import { GlobaldataService } from '../providers/globaldata.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
  	private router: Router,
    public general: GeneralService,
    public http: HttpService,
    private storage: Storage
  	) { }

  ngOnInit() {
  }

  toSignup(){
  	this.router.navigate(['signup']);
  }

  login(phone, password){

    if(phone == undefined || phone == ''){
      this.general.presentToast('Please Enter Phone Number');
      return false;
    }
    if(password == undefined || password == ''){
      this.general.presentToast('Please Enter Password');
      return false;
    }

    let loginObj = {
      phone: phone,
      password: password
    }

    this.http.postApi(this.http.api.login, loginObj, true).then((res:any)=>{
      if(res.status == true){
        GlobaldataService.userId = res.data.id;
        this.storage.set('userObject', res.data);
        this.general.presentToast(res.message);
        this.router.navigate(['home']);
      }
      else{
        this.general.presentToast(res.message);
      }
    })
  }

}
