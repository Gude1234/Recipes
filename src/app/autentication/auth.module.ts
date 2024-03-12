import { NgModule } from "@angular/core";
import { AutenticationComponent } from "./autentication.component";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";

@NgModule({
    declarations:[AutenticationComponent],
    imports:[SharedModule,FormsModule, RouterModule.forChild([{path:'auth', component: AutenticationComponent}])]
})

export class AuthModule{}