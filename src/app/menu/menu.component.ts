import { Component, Inject, OnInit } from '@angular/core';
import { expand, flyInOut } from '../animations/app.animation';
import { DishService } from '../services/dish.service';
import { Dish } from '../shared/dish';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [ flyInOut(), expand() ]
})
export class MenuComponent implements OnInit {

  dishes: Dish[] | any;
  errMess: string | any;

  constructor(private dishService: DishService, @Inject('BaseURL') public BaseURL: any) { }

  ngOnInit(): void {
    this.dishService.getDishes().subscribe(dishes => this.dishes = dishes,
      errmess => this.errMess = <any>errmess);
  }



}
