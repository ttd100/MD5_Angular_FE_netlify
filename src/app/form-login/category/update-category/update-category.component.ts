import { Component, OnInit } from '@angular/core';
import {Category} from "../../../model/Category";
import {ActivatedRoute} from "@angular/router";
import {CategoryService} from "../../../service/category.service";
import {logging} from "protractor";

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.scss']
})
export class UpdateCategoryComponent implements OnInit {
  category: Category;
  status = 'Form edit category!';
  error1: any = {
    message: 'category_not'
  };
  error2: any = {
    message: 'category_existed'
  };
  error3: any = {
    message: 'avatar_not'
  };
  success: any = {
      message: 'Update success'
  };

  constructor(private atRouter: ActivatedRoute,
              private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.atRouter.paramMap.subscribe(ctgId => {
      const id = +ctgId.get('id');
      console.log('id == ', id);
      this.categoryService.detailCategory(id).subscribe(ctg => {
        this.category = ctg;
      });
    });
  }
  changeAvatar($event: string) {
    // @ts-ignore
    this.category.avatar = $event;
  }
  ngSubmit() {
    this.categoryService.updateCategory(this.category.id, this.category).subscribe(data => {
      console.log('adadadda', data)
      if (data.message == this.error1.message) {
        this.status = 'The name category notfound! Please try again!';
      }
      if (data.message == this.error2.message) {
        this.status = 'The name category existed! Please try again!';
      }
      if(data.message == this.success.message){
        this.status = 'Update Success!';
      }
    });
  }
}
