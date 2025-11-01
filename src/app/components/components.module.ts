import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeadingsComponent } from './headings/headings.component';
import { ComponentsRoutingModule } from './components-routing.module';







@NgModule({
    declarations: [HeadingsComponent],
    imports: [
        CommonModule,
        ComponentsRoutingModule,

    ]
})
export class ComponentsModule { }
