import { Component, OnInit } from '@angular/core';
import {Category} from "../../../model/Category";
import {CategoryService} from "../../../service/category.service";

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.scss']
})
export class CreateCategoryComponent implements OnInit {
  form: any = {};
  category: Category;
  status = 'please fill in the form to Category!'
  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
  }
  createCategory(){
    this.category = new Category(
        this.form.id,
        this.form.name,
        this.form.avatar
    );
    console.log("formAvatar--->",this.form.avatar);
    console.log("aaaa",this.category);
    if (this.form.avatar == undefined){
      this.status = 'please upload avatar!!'
    }
    this.categoryService.createCategory(this.category).subscribe(data =>{
      console.log('dataCate----->',data);
      // @ts-ignore
      if (data.message === 'category_invalid'){
        this.status = 'category is existed! Please try again!'
        return;
      }
      // @ts-ignore
      if (data.message === "create_success"){
        this.status = 'create category success!'
      }
    })
  }
  createAvatar($event: string){
    this.form.avatar = $event
  }
}
