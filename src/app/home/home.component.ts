import { Component, Inject, OnInit } from '@angular/core';
import { expand, flyInOut } from '../animations/app.animation';
import { DishService } from '../services/dish.service';
import { LeaderService } from '../services/leader.service';
import { PromotionService } from '../services/promotion.service';
import { Dish } from '../shared/dish';
import { Leader } from '../shared/leader';
import { Promotion } from '../shared/promotion';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [ flyInOut(), expand() ]
})
export class HomeComponent implements OnInit {

  dish: Dish | any;
  dishErrMess: string | any;
  leader: Leader | any;
  leaderErrMess: string | any;
  promotion: Promotion | any;
  promoErrMess: string | any;

  constructor(private dishService: DishService, private promoService: PromotionService,
              private leadervice: LeaderService, @Inject('BaseURL') public BaseURL: any) { }

  ngOnInit(): void {
    this.dishService.getFeaturedDish().subscribe(dish => this.dish = dish,
      errmess => this.dishErrMess = <any>errmess);
    this.promoService.getFeaturedPromotion().subscribe(promotion => this.promotion = promotion,
      errmess => this.promoErrMess = <any>errmess);
    this.leadervice.getFeaturedLeader().subscribe(leader => this.leader = leader,
      errmess => this.leaderErrMess = <any>errmess);
  }

}
