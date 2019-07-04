import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { GlobaldataService } from '../providers/globaldata.service';
import { GeneralService } from '../providers/general.service';
import { HttpService } from '../providers/http.service';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
newMessage:any = '';
messages = [];
myId = GlobaldataService.userId;
  constructor(
  	private socket: Socket,
    public general: GeneralService,
    public http: HttpService,

  ) {

	  	this.getMessages().subscribe(message => {
	  		console.log('Receive', message)
	      this.messages.push(message);
	    });
 	}

  ngOnInit() {
  }

  sendMessage(msg: string){
    console.log(msg);
        this.socket.emit("message", { text: msg, sender_id: GlobaldataService.userId, receiver_id: GlobaldataService.receiverId, image: null });
    }
    
    getMessages() {
      let observable = new Observable(observer => {
        this.socket.on('message', (data) => {
          console.log(data);
          observer.next(data);
        });
      })
      return observable;
    }
}
