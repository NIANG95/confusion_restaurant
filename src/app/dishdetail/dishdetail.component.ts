import { Location } from '@angular/common';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { switchMap } from 'rxjs';
import { expand, flyInOut, visibility } from '../animations/app.animation';
import { DishService } from '../services/dish.service';
import { Comment } from '../shared/comment';
import { Dish } from '../shared/dish';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [ flyInOut(), visibility(), expand() ]
})
export class DishdetailComponent implements OnInit {

  dish: Dish | any;
  errMess: string | any;
  dishIds: string [] | any;
  prev: string | any;
  next: string | any;
  @ViewChild('fform') commentFormDirective: any;
  commentForm! : FormGroup;
  comment!: Comment;
  dishcopy: Dish | any;
  visibility = 'shown';

  formErrors: | any = {
    'author': '',
    'rating': '',
    'comment': ''
  };

  validationMessages: | any = {
    'author': {
      'required': 'Author name is required.',
      'minlength': 'Author name must be at least 2 characters long'
    },
    'comment': {
      'required': 'Comment is required.'
    }
  };


  constructor(private dishService: DishService, private location: Location,
    private route: ActivatedRoute, private fb: FormBuilder, @Inject('BaseURL') public BaseURL: any) {
    this.createForm();
  }

  ngOnInit(): void {
    this.dishService.getDishIds()
      .subscribe(dishIds => this.dishIds = dishIds);
    this.route.params
      .pipe(switchMap((params: Params) => {
        this.visibility = 'hidden';
        return this.dishService.getDish(params['id']);
      }))
      .subscribe(dish => {
        this.dish = dish;this.dishcopy = dish,
        this.setPrevNext(dish.id); this.visibility = 'shown';
      },
        errmess => this.errMess = <any>errmess);
  }

  setPrevNext(dishId: string | undefined) {
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }

  goBack(): void {
    this.location.back();
  }

  createForm() {
    this.commentForm = this.fb.group({
      author: ['', [Validators.required, Validators.minLength(2)]],
      rating: 5,
      comment: ['', [Validators.required, Validators.pattern]],
      date: new Date()
    });
    this.commentForm.valueChanges
    .subscribe(data => this.onValueChanged(data));
    this.onValueChanged();//(re)set form validation message
  }

  onValueChanged(data?: any) {
    if(!this.commentForm) {return;}
    const form = this.commentForm;
    for(const field in this.formErrors) {
      if(this.formErrors.hasOwnProperty(field)) {
        //clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if(control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for(const key in control.errors) {
            if(control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key];
            }
          }
        }
      }
    }
  }

  onSubmit() {
    const d = new Date();
    let text = d.toISOString();
    this.comment = this.commentForm.value;
    this.comment.date = text;
    this.dishcopy.comments?.push(this.comment);
    this.dishService.putDish(this.dishcopy)
      .subscribe(dish => {
        this.dish = dish, this.dishcopy = dish;
      },
      errmess => {this.dish = null, this.dishcopy = null, this.errMess = <any>errmess;});
    this.commentFormDirective.resetForm();
    this.commentForm.reset({
      author: '',
      rating: 5,
      comment: ''
    });
  }

}
