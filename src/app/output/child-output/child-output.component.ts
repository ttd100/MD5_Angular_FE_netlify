import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-child-output',
  templateUrl: './child-output.component.html',
  styleUrls: ['./child-output.component.scss']
})
export class ChildOutputComponent implements OnInit {
  listStudent = [
    {id:1,name:'Hung'},{id:2,name:'vo dich racode'}
  ]
  @Output()
  dataFromChild = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
    this.dataFromChild.emit(this.listStudent);
  }

}
