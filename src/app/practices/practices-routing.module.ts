
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NumeroParImparComponent } from './numero-par-impar/numero-par-impar.component';

const routes: Routes = [
	{ path: 'par-impar', component: NumeroParImparComponent },
	// Agrega aquí las rutas de tus componentes
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class PracticesRoutingModule {}
