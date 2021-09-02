import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.sass']
})
export class SignupComponent implements OnInit {

  registroForm: FormGroup;
  constructor(
    private fb: FormBuilder
  ){}

  ngOnInit(): void {
  }

  create(){
  }

}
