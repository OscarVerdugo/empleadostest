import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { FormComponent } from "./pages/form/form.component";
import { MainComponent } from "./pages/main/main.component";
import { LoginComponent } from "./pages/login/login.component";
import { AuthorizeGuard } from "./services/guards/authorize.guard";
const routes: Routes = [
  {
    path:'login',
    component:LoginComponent
  },{
    path: "auth",//authorized
    component: MainComponent,
    children: [
      { path: "c/:catalogue", component: FormComponent }]
      // , canActivate: [AuthorizeGuard]
  },
  { path: "", redirectTo: "/login", pathMatch: "full" },
  { path: "**", redirectTo: "/auth", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
