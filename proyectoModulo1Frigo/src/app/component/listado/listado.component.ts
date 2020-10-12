import { Component, OnInit } from '@angular/core';
import { ListItem } from 'src/app/models/list-item.model';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html'
})
export class ListadoComponent implements OnInit {


  titulo: string = 'Lista de compras';
  descripcion:string= 'Lista para indicar producto a comprar, y lugar en donde hacerlo.'

  items: ListItem[];

  proToClean='';
  tienToClean='';

  constructor() { 
    this.items = [];
  }

  ngOnInit(): void {
  }

  
  guardar(pro:string, tien:string){

    var nuevoItem = new ListItem(pro, tien);
    this.items.push(nuevoItem);

    return false;
  }



}
