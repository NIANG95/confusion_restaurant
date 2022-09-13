import { Component, Inject, OnInit } from '@angular/core';
import { DishService } from '../services/dish.service';
import { LeaderService } from '../services/leader.service';
import { PromotionService } from '../services/promotion.service';
import { Dish } from '../shared/dish';
import { Leader } from '../shared/leader';
import { Promotion } from '../shared/promotion';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  dish: Dish | any;
  leader: Leader | any;
  promotion: Promotion | any;

  constructor(private dishService: DishService, private promoService: PromotionService,
              private leadervice: LeaderService, @Inject('BaseURL') public BaseURL: any) { }

  ngOnInit(): void {
    this.dishService.getFeaturedDish().subscribe(dish => this.dish = dish);
    this.promoService.getFeaturedPromotion().subscribe(promotion => this.promotion = promotion);
    this.leadervice.getFeaturedLeader().subscribe(leader => this.leader = leader);
  }

}
