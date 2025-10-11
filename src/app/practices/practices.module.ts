import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NumeroParImparComponent } from './numero-par-impar/numero-par-impar.component';
import { PracticesRoutingModule } from './practices-routing.module';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox'; // << aquí





@NgModule({
  declarations: [NumeroParImparComponent],
  imports: [
    CommonModule,
    FormsModule,
    PracticesRoutingModule,
    MatInputModule,
    MatFormFieldModule,
    MatCheckboxModule
  ]
})
export class PracticesModule { }
