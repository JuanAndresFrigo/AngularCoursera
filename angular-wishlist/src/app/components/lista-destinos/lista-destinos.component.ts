import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { DestinoViaje } from './../../models/destino-viaje.model';
import { DestinosApiClient } from './../../models/destinos-api-client.model';
import { Store } from '@ngrx/store';
import {AppState} from './../../app.module';
import { ElegidoFavoritoAction, NuevoDestinoAction } from '../../models/destinos-viajes-state.model';



@Component({
  selector: 'app-lista-destinos',
  templateUrl: './lista-destinos.component.html',
  styleUrls: ['./lista-destinos.component.css'],
  providers:[DestinosApiClient]
})
export class ListaDestinosComponent implements OnInit {
  @Output() onItemAdded:EventEmitter<DestinoViaje>;
  updates: string[];
  all;

  constructor(public destinosApiClient:DestinosApiClient,
              private store: Store<AppState>) { 
    this.onItemAdded = new EventEmitter();
    this.updates = [];
    this.store.select(state => state.destinos.favorito)
                .subscribe(d=>{
                  const fav = d;
                  if (d != null) {
                    this.updates.push("Se ha elegido a " + d.nombre);
                  }
                });
    store.select(state => state.destinos.items).subscribe(items => this.all = items);
  }

  ngOnInit(): void {
  }

  agregado(d: DestinoViaje){
    console.log("DD", d);
    
    this.destinosApiClient.add(d);
    this.onItemAdded.emit(d);

  }


  elegido(e: DestinoViaje){
    //desmarcar todos los demas en en array de elegidos
    //this.destinos.forEach(function (x) {x.setSelected(false); });
    //se marca el elegido
    //d.setSelected(true);

    // this.destinosApiClient.getAll().forEach(x => x.setSelected(false));
    // e.setSelected(true);

    this.destinosApiClient.elegir(e);
  }

  getAll(){

  }

}
