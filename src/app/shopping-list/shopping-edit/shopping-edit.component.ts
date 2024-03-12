import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms'
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy{
  @ViewChild('f') slform:NgForm;

  subscription:Subscription;
  editeditemindex:number;
  editmode = false;
  editeditem:Ingredient;
  constructor(private slservice:ShoppingListService){}

  ngOnInit() {
   this.subscription = this.slservice.editingingrdient.subscribe(
    (index:number) => {
      this.editeditemindex = index;
      this.editmode = true;
      this.editeditem = this.slservice.getingredient(index);
      this.slform.setValue({
        'name':this.editeditem.name,
        'amount': this.editeditem.amount
      })
    }
   ) 
  }

  onsubmit(form:NgForm){
    const value = form.value
    const newingredient = new Ingredient(value.name, value.amount);
    if(this.editmode){
      this.slservice.updateingrdient(this.editeditemindex,newingredient);
    }else{
      this.slservice.addingredient(newingredient)
    }
    this.editmode = false;
    form.reset()
  }

  onclear(){
    this.slform.reset();
    this.editmode=false
  }

  ondelete(){
    this.slservice.deleteingredient(this.editeditemindex);
    this.onclear()
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
