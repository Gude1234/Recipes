import { EventEmitter } from "@angular/core"
import { Ingredient } from "../shared/ingredient.model"
import { Subject } from "rxjs";

export class ShoppingListService{

    ingredientschanged = new EventEmitter<Ingredient[]>();
    editingingrdient = new Subject<number>();

    private ingredients: Ingredient[] = [
        new Ingredient('Apples',12),
        new Ingredient('Tomatoes',20)
      ]

    getingredients(){
        return this.ingredients.slice()
    }

    getingredient(index:number){
        return this.ingredients[index]
    }

    addingredient(ingredient:Ingredient){
        this.ingredients.push(ingredient);
        this.ingredientschanged.emit(this.ingredients.slice())
    }

    addingrdients(ingredients:Ingredient[]){
        this.ingredients.push(...ingredients);
        this.ingredientschanged.emit(this.ingredients.slice())
    }

    updateingrdient(index:number, ingredient:Ingredient){
        this.ingredients[index] = ingredient;
        this.ingredientschanged.emit(this.ingredients.slice())
    }

    deleteingredient(index:number){
        this.ingredients.splice(index,1);
        this.ingredientschanged.emit(this.ingredients.slice())
    }
}