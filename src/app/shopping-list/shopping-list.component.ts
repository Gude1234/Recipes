import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit{
  ingredients: Ingredient[]

  constructor(private shoppinglistservice:ShoppingListService){}

  ngOnInit(): void {
    this.ingredients = this.shoppinglistservice.getingredients();
    this.shoppinglistservice.ingredientschanged.subscribe(
      (ingredients:Ingredient[])=>{
        this.ingredients = ingredients
      }
    )
  }

  onselectingredient(id:number){
    this.shoppinglistservice.editingingrdient.next(id);
  }

}
