import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { fromEvent } from 'rxjs';
import { DestinoViaje } from '../models/destino-viaje.models';
import { map, filter, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { ajax, AjaxResponse } from 'rxjs/ajax';


@Component({
  selector: 'app-form-destino-viaje',
  templateUrl: './form-destino-viaje.component.html',
  styleUrls: ['./form-destino-viaje.component.css']
})
export class FormDestinoViajeComponent implements OnInit {

  @Output() onItemAdded: EventEmitter<DestinoViaje>;
  fg: FormGroup;
  minLongitud=3;
  searchResults:string[];

  constructor(fb: FormBuilder) {
    this.onItemAdded = new EventEmitter();
    this.fg = fb.group({
      nombre:['', Validators.compose([
        Validators.required,
        this.nombreValidatorParametrizable(this.minLongitud)
      ])],
      url:['']
    });

    // this.fg.valueChanges.subscribe((form: any)=>{
    //   console.log(form);      
    // })
   }

  ngOnInit(): void {
    let elemNombre=<HTMLInputElement>document.getElementById('nombre');
    fromEvent(elemNombre, 'input')
      .pipe(
        map((e:KeyboardEvent)=>(e.target as HTMLInputElement).value),
        filter(text=> text.length >2 ),
        debounceTime(200),
        distinctUntilChanged(),
        switchMap(()=>ajax('/assets/datos.json'))
      )
      .subscribe(ajaxresponse=>{
        this.searchResults=ajaxresponse.response;
      });
  }

  guardar(nombre:string, url:string):boolean{
    
    const d= new DestinoViaje(nombre, url);
    this.onItemAdded.emit(d);
    return false;
  }

  nombreValidator(control: FormControl): {[s:string]: boolean}{
    const l= control.value.toString().trim().length;
    if (l>0 && l<5) {
      return {ivalidNombre: true};
    } else {
      return null;
    }
  }

  nombreValidatorParametrizable(minLog: number): ValidatorFn{
    return (control: FormControl): {[s:string]: boolean}| null =>{

      const l= control.value.toString().trim().length;
      if (l>0 && l<minLog) {
        return {minLongNombre: true};
      } else {
        return null;
      }

    }
  }



}
