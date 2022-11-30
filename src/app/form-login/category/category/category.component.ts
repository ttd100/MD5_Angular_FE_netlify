import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthService} from "../../../service/auth.service";
import {Category} from "../../../model/Category";
import {CategoryService} from "../../../service/category.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {TokenService} from "../../../service/token.service";
import {MatDialog} from "@angular/material/dialog";
import {DialogComponent} from "../../../dialog/dialog/dialog.component";
import {DialogCategoryComponent} from "../dialog-category/dialog-category.component";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  dataSource : any;
  categories: Category[] = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[]=['id','nameCategory','avatarCategory','edit','delete'];
  check: false;
  constructor(private categoryService: CategoryService,
              private tokenService: TokenService,
              private dialog: MatDialog){ }

  ngOnInit(): void {
    this.getListCategory();
    if (this.tokenService.getToken()){
      // @ts-ignore
      this.check=true
    }
  }
  getListCategory(){
    this.categoryService.listCategory().subscribe(listCate=>{
      console.log('listCate--->',listCate);
      this.categories = listCate;
      console.log('listCategory',listCate);
      this.dataSource = new MatTableDataSource<Category>(this.categories);
      this.dataSource.paginator = this.paginator;
    })

  }

  openDialog(id:number) {
    const dialogRef = this.dialog.open(DialogCategoryComponent);

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.deleteCategory(id);
      }
      console.log(`Dialog result: ${result}`);
    });
  }

  private deleteCategory(id: number) {
    this.categoryService.deleteCategory(id).subscribe(() =>{
      // window.location.reload();
      this.getListCategory();
    })
  }
}
