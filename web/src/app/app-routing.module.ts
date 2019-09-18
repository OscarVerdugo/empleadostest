import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { FormComponent } from "./pages/form/form.component";
import { ContentComponent } from "../app/pages/content/content.component";
const routes: Routes = [
  { path: "dashboard", component: FormComponent },
  {
    path: "auth",
    component: ContentComponent,
    children: [
      { path: "cat/:cat", component: FormComponent },
      { path: "",redirectTo: "/auth", pathMatch: "full"}]
  },
  { path: "", redirectTo: "/auth", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
