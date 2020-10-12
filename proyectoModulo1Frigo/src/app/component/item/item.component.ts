import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { ListItem } from 'src/app/models/list-item.model';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html'
})
export class ItemComponent implements OnInit {
  @HostBinding('attr.class') cssClass='col align-self-center';

  @Input() item: ListItem;

  constructor() { }

  ngOnInit(): void {
  }

}
