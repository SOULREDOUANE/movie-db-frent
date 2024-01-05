import { Component, OnInit } from '@angular/core';
import { MovieItemComponent } from '../movie-item/movie-item.component';
import { CommonModule } from '@angular/common';
import { FavoriteService } from '../../services/favorite.service';
import { Movie } from '../../Model/movie';

@Component({
  selector: 'app-favorite',
  standalone: true,
  imports: [CommonModule,MovieItemComponent],
  templateUrl: './favorite.component.html',
  styleUrl: './favorite.component.css'
})
export class FavoriteComponent implements OnInit {
  favoriteMovies: Movie[]=[];

  constructor(private favoriteService : FavoriteService) {

  }

  ngOnInit(): void {


    // this.favoriteMovies =this.favoriteMovies;

    this.getfavorites()
    console.log(this.favoriteMovies)
  }

  getfavorites() : void{
    this.favoriteService.getFavorite().subscribe(data=>{
        this.favoriteMovies=data
    })

  }


}
