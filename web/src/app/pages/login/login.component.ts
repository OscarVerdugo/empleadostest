import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "../../services/authentication/auth.service";
import { Routes, Router } from "@angular/router";


@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  form;
  constructor(private formBuilder: FormBuilder, private auth: AuthService, private route: Router) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      user: [null, Validators.required],
      pass: [null, Validators.required]
    });
  }

  login() {
    this.auth.loginUser(this.form.controls['user'].value,this.form.controls['pass'].value).then(data =>{
      if(data){
        this.route.navigate(['/auth']);
      }else{
        
      }
    });
  }
}
