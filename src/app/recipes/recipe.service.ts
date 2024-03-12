import { EventEmitter, Injectable, OnInit } from "@angular/core";
import { Recipe } from "./recipe.model"
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { HttpClient } from "@angular/common/http";

@Injectable()

export class RecipeService {
    recipeselected = new EventEmitter<Recipe>();

    recipes: Recipe[] = []

    constructor(private slsevice:ShoppingListService){}

    setrecipes(recipes:Recipe[]){
        this.recipes = recipes
    }
    

    getrecipes(){
        return this.recipes;
    }

    getrecipe(id:number){
        return this.recipes[id]
    }


    addingredientstoshoppinglist(ingredients:Ingredient[]){
        this.slsevice.addingrdients(ingredients)
    }

    addrecippe(recipe:Recipe){
        this.recipes.push(recipe)
    }

    updaterecipe(id:number,newrecipe:Recipe){
        this.recipes[id] = newrecipe
    }

    deleterecipe(id:number){
        this.recipes.splice(id,1)
    }
}