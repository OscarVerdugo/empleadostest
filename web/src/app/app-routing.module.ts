import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormComponent } from "./pages/form/form.component";

const routes: Routes = [
  {path:'formulario', component:FormComponent},
  {path:"", redirectTo:'/formulario',pathMatch:"full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
