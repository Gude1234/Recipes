import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceHolderDirective } from '../shared/place-holder.directive';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-autentication',
  templateUrl: './autentication.component.html',
  styleUrls: ['./autentication.component.css']
})
export class AutenticationComponent {

  islogin = true;
  error:string = null

  private closesub:Subscription

  constructor(private authservice:AuthService, private router:Router, private componentfactoryresolver:ComponentFactoryResolver){}

  @ViewChild(PlaceHolderDirective) alerthost:PlaceHolderDirective

  

  onswitch(){
    this.islogin = !this.islogin
  }

  onsubmit(form:NgForm){
    const email = form.value.email
    const password = form.value.password
    if(this.islogin){
      this.authservice.login(email,password).subscribe(response => {
        console.log(response);
        this.router.navigate(['/recipes'])
      }, errormessage => {
        console.log(errormessage)
        this.error = errormessage
        this.showerroralert(errormessage)
      }
      )
    }else{
      this.authservice.signup(email, password).subscribe(response => {
        console.log(response);
        this.router.navigate(['/recipes'])
      }, errormessage => {
        console.log(errormessage)
        this.error = errormessage
        this.showerroralert(errormessage)
      }
      )
    }
    form.reset()
  }

onhandlederror(){
  this.error = null
}

private showerroralert(message:string){
  const alertcmpfactory = this.componentfactoryresolver.resolveComponentFactory(AlertComponent)
  
  const hostviewcontainerref = this.alerthost.viewcontainerref

  hostviewcontainerref.clear()

  const componentref = hostviewcontainerref.createComponent(alertcmpfactory);

  componentref.instance.message = message
  this.closesub = componentref.instance.close.subscribe(()=>{
    this.closesub.unsubscribe()
    hostviewcontainerref.clear()
  })

}


}
