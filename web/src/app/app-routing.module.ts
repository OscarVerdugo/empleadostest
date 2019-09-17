import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { FormComponent } from "./pages/form/form.component";
import { ContentComponent } from "../app/pages/content/content.component";
const routes: Routes = [
  { path: "dashboard", component: FormComponent },
  {
    path: "form",
    component: ContentComponent,
    children: [
      { path: "empleados", component: FormComponent },
      { path: "",redirectTo: "/form", pathMatch: "full"}]
  },
  { path: "", redirectTo: "/form", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
