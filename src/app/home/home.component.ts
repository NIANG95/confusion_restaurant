import { Component, OnInit } from '@angular/core';
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
              private leadervice: LeaderService) { }

  ngOnInit(): void {
    this.dish = this.dishService.getFeaturedDish();
    this.promotion = this.promoService.getFeaturedPromotion();
    this.leader = this.leadervice.getFeaturedLeader();
  }

}
