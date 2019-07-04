import { Component } from '@angular/core';
import { GeneralService } from '../providers/general.service';
import { HttpService } from '../providers/http.service';
import { StreamingMedia, StreamingVideoOptions } from '@ionic-native/streaming-media/ngx';
import { Router } from '@angular/router';
import { GlobaldataService } from '../providers/globaldata.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
result:any = undefined;
friends:any;
 constructor(
  	public general: GeneralService,
  	public http: HttpService,
    private streamingMedia: StreamingMedia,
    private router: Router
  	) { 
   this.getFriends()
  }

  onSubmit(username){
    console.log(username);
    let sObj = {
      user_name: username
    }
    this.http.postApi(this.http.api.search, sObj, true).then((res:any)=>{
      console.log(res)
      if(res.status == true){
        this.result = res.data;
      }else{
        this.general.presentToast(res.message);
      }
    })
  }

  closeResult(){
    this.result = undefined;
  }

  addFriend(id){
    let addFriendObj = {
      user_id: GlobaldataService.userId,
      friend_id: id
    };

    this.http.postApi(this.http.api.addFriend, addFriendObj, true).then((res:any)=>{
      console.log(res)
      if(res.status == true){
        this.general.presentToast(res.message);
      }else{
        this.general.presentToast(res.message);
      }
    })
  }


  getFriends(){
    let ids = {
      id: GlobaldataService.userId
    }
    this.http.postApi(this.http.api.findFriends, ids, true).then((res:any)=>{
      if(res.status == true){
        this.result = undefined;
        this.friends = res.data;
      }else{
        this.general.presentToast(res.message);
      }
    })
  }

  toChat(id){
    console.log(id);
    GlobaldataService.receiverId = id;
    this.router.navigate(['chat'])
  }

}
