import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

export const routes: Routes = [
  // {path: "", component:HomePageComponent},
  // {path: "details/:id", component:MovieDetailsComponent,},
  {path: "auth/login", component: LoginComponent},
  {path: "auth/signup", component: RegisterComponent},
  // {path: "favorites", component:FavoriteComponent},
  // {path: "**" , component: HomePageComponent},
];
