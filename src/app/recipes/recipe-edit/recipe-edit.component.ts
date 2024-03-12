import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit{
  id:number;
  editmode = false;
  recipeform:FormGroup;

  constructor(private route:ActivatedRoute, private recipeservice:RecipeService, private router:Router){}

  ngOnInit() {
    this.route.params.subscribe(
      (params:Params) =>{
        this.id = +params['id'];
        this.editmode = params['id'] != null;
        this.Initform()
      }
    )
  }

  onaddingredient(){
    (<FormArray>this.recipeform.get('ingredients')).push(new FormGroup({
      'name': new FormControl(null, Validators.required),
      'amount': new FormControl(null,[Validators.required])
    }))
  }

  onSubmit(){
    if(this.editmode){
      this.recipeservice.updaterecipe(this.id,this.recipeform.value)
    }else{
      this.recipeservice.addrecippe(this.recipeform.value)
    }
    this.oncancel()
  }

  oncancel(){
    this.router.navigate(['../'],{relativeTo:this.route})
  }

  ondeleteingredient(id:number){
    (<FormArray>this.recipeform.get('ingredients')).removeAt(id)
  }

  private Initform(){
    let recipename=''
    let recipeimagepath=''
    let recipedescription=''
    let recipeingredients= new FormArray([])

    if(this.editmode){
      const recipe = this.recipeservice.getrecipe(this.id)
      recipename = recipe.name
      recipeimagepath = recipe.imagepath
      recipedescription = recipe.description
      if(recipe['ingredients']){
        for(let ingredient of recipe.ingredients){
          recipeingredients.push(new FormGroup({
            'name': new FormControl(ingredient.name, Validators.required),
            'amount': new FormControl(ingredient.amount, [Validators.required])
          }))
        }
      }
    }
    this.recipeform = new FormGroup({
      'name': new FormControl(recipename, Validators.required),
      'imagepath': new FormControl(recipeimagepath, Validators.required),
      'description': new FormControl(recipedescription, Validators.required),
      'ingredients': recipeingredients
    })
  }

}
