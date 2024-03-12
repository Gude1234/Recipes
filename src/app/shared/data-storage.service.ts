import { Injectable } from "@angular/core";
import { RecipeService } from "../recipes/recipe.service";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Recipe } from "../recipes/recipe.model";
import { Router } from "@angular/router";
import { map, tap } from "rxjs";
import { AuthService } from "../autentication/auth.service";

@Injectable()
export class DataStorageService{

    constructor(private recipeservice:RecipeService, private http:HttpClient, private router:Router, private authservise:AuthService){}

    storerecipes(){
        const recipes = this.recipeservice.getrecipes();
        this.http.put('https://recipes-b4954-default-rtdb.firebaseio.com/recipes.json',recipes,{
            params: new HttpParams().set('auth', this.authservise.token)
        }).subscribe(response =>{
            console.log(response)
        })
    }

    fetchrecipes(){
        return  this.http.get<Recipe[]>('https://recipes-b4954-default-rtdb.firebaseio.com/recipes.json',{
            params: new HttpParams().set('auth', this.authservise.token)
        }).pipe(map(recipes =>{
            return recipes.map(recipe =>{
                return {...recipe,ingredients: recipe.ingredients ? recipe.ingredients: []}
            })
        }), tap(recipes =>{
            this.recipeservice.setrecipes(recipes)
        }))
    }



}