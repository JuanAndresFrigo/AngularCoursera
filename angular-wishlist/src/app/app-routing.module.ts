import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DestinoDetalleComponent } from './destino-detalle/destino-detalle.component';
import { ListaDestinoComponent } from './lista-destino/lista-destino.component';

const routes: Routes = [
  {path:'', redirectTo:'home',pathMatch:'full'},
  {path:'home', component: ListaDestinoComponent},
  {path:'destino/:id', component: DestinoDetalleComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
