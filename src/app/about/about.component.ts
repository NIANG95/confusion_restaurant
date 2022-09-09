import { Component, OnInit } from '@angular/core';
import { LeaderService } from '../services/leader.service';
import { Leader } from '../shared/leader';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  leaders: Leader[] | any;

  constructor(private leadService: LeaderService) { }

  ngOnInit(): void {
    this.leadService.getLeaders().then(leaders => this.leaders = leaders);
  }

}
