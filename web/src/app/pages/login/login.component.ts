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
    this.auth.validateToken().then(data => {
      if(!data['bError']){
        this.route.navigate(['/auth']);
      }
    });

    this.form = this.formBuilder.group({
      cUsuario: [null, Validators.required],
      cContra: [null, Validators.required]
    });
  }

  login() {
    this.auth.loginUser(this.form.controls['cUsuario'].value,this.form.controls['cContra'].value).then(data =>{
      console.log(data);
      if(!data['bError']){
        this.route.navigate(['/auth']);
      }else{
        console.log("error al iniciar");
      }
    });
  }
}
