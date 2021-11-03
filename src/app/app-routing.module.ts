import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookcarComponent } from './pages/bookcar/bookcar.component';
import { HomeComponent } from './pages/home/home.component';


const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: 'bookcar/:carid', component: BookcarComponent },
  { path:"**", component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
