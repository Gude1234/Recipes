import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../autentication/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy{
  authsub:Subscription;
  isauthenticated = false;

  constructor(private datastorageservice:DataStorageService, private authservice:AuthService, private router:Router){}

  ngOnInit() {
    this.authsub = this.authservice.user.subscribe(user =>{
      this.isauthenticated = !!user
    })
  }

  onsavedata(){
    this.datastorageservice.storerecipes()
  }
  
  onfetchdata(){
    this.datastorageservice.fetchrecipes().subscribe()
  }

  onlogout(){
    this.authservice.logout()
  }

  ngOnDestroy() {
    this.authsub.unsubscribe()
  }
}
