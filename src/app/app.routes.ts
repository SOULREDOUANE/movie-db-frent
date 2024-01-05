import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { FavoriteComponent } from './components/favorite/favorite.component';

export const routes: Routes = [
  {path: "", component:HomePageComponent},
  {path: "details/:id", component:MovieDetailsComponent},
  {path: "auth/login", component: LoginComponent},
  {path: "auth/signup", component: RegisterComponent},
  {path: "favorites", component:FavoriteComponent},
  {path: "**" , component: HomePageComponent},
];
