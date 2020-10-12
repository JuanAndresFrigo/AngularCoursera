export class ListItem{
    descripcion:string;
    tiendaDeCompra: string;

    constructor(desc:string, tienda:string){
        this.descripcion = desc;
        this.tiendaDeCompra=tienda;
    }
}