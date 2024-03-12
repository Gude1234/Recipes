import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router'
import { Recipe } from "../recipes/recipe.model";
import { Observable } from "rxjs";
import { DataStorageService } from "./data-storage.service";
import { RecipeService } from "../recipes/recipe.service";

@Injectable({providedIn:'root'})
export class RecipeResolverService implements Resolve<Recipe[]>{

    constructor(private datastorageservice:DataStorageService, private recipeservice:RecipeService ){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Recipe[] | Observable<Recipe[]> | Promise<Recipe[]> {
        const recipes = this.recipeservice.getrecipes()

        if (recipes.length === 0){
            return this.datastorageservice.fetchrecipes()
        }else {
            return recipes
        }
    }
        
}
