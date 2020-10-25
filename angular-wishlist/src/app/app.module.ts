import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DestinoViajeComponent } from './destino-viaje/destino-viaje.component';
import { ListaDestinoComponent } from './lista-destino/lista-destino.component';
import { DestinoDetalleComponent } from './destino-detalle/destino-detalle.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule as NgRxStoreModule, ActionReducerMap } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { FormDestinoViajeComponent } from './form-destino-viaje/form-destino-viaje.component';
import { DestinosApiClient } from './models/destinos-api-client.model';
import { DestinosViajesState,
          intializeDestinosViajesState,
          reducerDestinosViajes,
          DestinosViajesEffects} from './models/destinos-viajes-state.model';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { DestinoViaje } from './models/destino-viaje.models';
import { Observable, from } from 'rxjs';
import { map, flatMap } from 'rxjs/operators';


/////////////
// Las rutas las tengo separadas en el app-routing module
/////////////


//redux init
export interface AppState{
  destinos: DestinosViajesState;
}
const reducers: ActionReducerMap<AppState>={
  destinos: reducerDestinosViajes
};

const reducersInitialState = {
  destinos: intializeDestinosViajesState()
};
//fin redux init

@NgModule({
  declarations: [
    AppComponent,
    DestinoViajeComponent,
    ListaDestinoComponent,
    DestinoDetalleComponent,
    FormDestinoViajeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgRxStoreModule.forRoot(reducers,{initialState: reducersInitialState,

      runtimeChecks: {
      
      strictStateImmutability: false,
      
      strictActionImmutability: false,
      
      }}),
    // NgRxStoreModule.forRoot(reducers, {initialState: reducersInitialState}),
    EffectsModule.forRoot([DestinosViajesEffects]),

    StoreDevtoolsModule.instrument(),
    
  ],
  providers: [
    DestinosApiClient
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
