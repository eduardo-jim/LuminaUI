
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeadingsComponent } from './headings/headings.component';


const routes: Routes = [
	{ path: 'headings', component: HeadingsComponent },
	// Agrega aquí las rutas de tus componentes
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ComponentsRoutingModule {}
