import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralService } from '../providers/general.service';
import { HttpService } from '../providers/http.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  constructor(
  	private router: Router,
    public general: GeneralService,
    public http: HttpService,
  ) { }

  ngOnInit() {
  }

  toLogin(){
  	this.router.navigate(['login']);
  }

  signUp(username, phone, password){
    if(username == undefined || username == ''){
      this.general.presentToast('Please Enter Username');
      return false;
    }
    if(phone == undefined || phone == ''){
      this.general.presentToast('Please Enter Phone Number');
      return false;
    }
    if(password == undefined || password == ''){
      this.general.presentToast('Please Enter Password');
      return false;
    }

    let signupObj = {
      username: username,
      phone: phone,
      password: password
    };

    this.http.postApi(this.http.api.signup, signupObj, true).then((res:any)=>{
      if(res.status == true){
        this.general.presentToast(res.message);
        this.toLogin();
      }
      else{
        this.general.presentToast(res.message);
      }
    })
  }

}
