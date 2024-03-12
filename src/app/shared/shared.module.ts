import { NgModule } from "@angular/core";
import { AlertComponent } from "./alert/alert.component";
import { DropdownDirective } from "./dropdown.directive";
import { PlaceHolderDirective } from "./place-holder.directive";
import { CommonModule } from "@angular/common";

@NgModule({
    declarations:[
        DropdownDirective,
        AlertComponent,
        PlaceHolderDirective
    ],

    imports:[CommonModule],

    exports:[
        DropdownDirective,
        AlertComponent,
        PlaceHolderDirective,
        CommonModule
    ]


})

export class SharedModule{}