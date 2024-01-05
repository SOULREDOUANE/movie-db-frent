import { Component, Input } from '@angular/core';
import { Movie } from '../../Model/movie';
import { RouterLink } from '@angular/router';
import { FavoriteComponent } from '../favorite/favorite.component';
import { FavoriteService } from '../../services/favorite.service';

@Component({
  selector: 'app-movie-item',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './movie-item.component.html',
  styleUrl: './movie-item.component.css'
})
export class MovieItemComponent {
  constructor(private favoriteService:FavoriteService){}

  @Input() movie!:Movie;
}
