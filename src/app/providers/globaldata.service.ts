import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobaldataService {

  constructor() { }

  public static userId:any;
  public static receiverId:any;
}