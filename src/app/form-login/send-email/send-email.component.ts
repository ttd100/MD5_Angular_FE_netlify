import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-send-email',
  templateUrl: './send-email.component.html',
  styleUrls: ['./send-email.component.scss']
})
export class SendEmailComponent implements OnInit {
    form: any = {};
  emailFormControl = new FormControl('',[
    Validators.required,
    Validators.email]);

  constructor() { }

  ngOnInit(): void {
  }

}
