import { Component } from '@angular/core';
import { MovieItemComponent } from '../movie-item/movie-item.component';
import { AuthenticationService } from '../../services/authentication.service';
import { Movie } from '../../Model/movie';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ServiceService } from '../../services/service.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [MovieItemComponent,CommonModule,FormsModule,RouterLink],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
  username: string = AuthenticationService.getUser();
  constructor(private movieService : ServiceService){}
  searchValue!:string;
  movies!:Movie[]


  ngOnInit(): void {
    this.getMovies();
  }

  searchMovie() {
    console.log(this.searchValue);
    this.movies = [];

    this.movieService.searchMovies(this.searchValue).subscribe((data) => {
      this.movies = data.results.map((movie: Movie) => ({ ...movie, isFavorite: false }));
    });
  }

    getMovies(){
      this.movieService.getPopularMovies().subscribe((data) =>{
        this.movies = data.results;
        this.movies = data.results.map((movie: Movie) => ({ ...movie, isFavorite: false }));
        console.log(this.movies);
      } );
    }

}
