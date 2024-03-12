import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpBackend } from '@angular/common/http';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit{
  recipe:Recipe;
  id:number;

  constructor(private recipeservice:RecipeService, private route:ActivatedRoute,private router:Router, private http:HttpBackend){}

  ngOnInit() {
    this.route.params.subscribe(
      (params:Params) => {
        this.id = +params['id']
        this.recipe = this.recipeservice.getrecipe(this.id)
      }
    )
  }

  onaddtoshoppinglist(){
    this.recipeservice.addingredientstoshoppinglist(this.recipe.ingredients)
  }

  onselectedit(){
    this.router.navigate(['edit'],{relativeTo:this.route})
  }

  ondeleterecipe(){
    this.recipeservice.deleterecipe(this.id)
    this.router.navigate(['/recipes'])
  }

}
