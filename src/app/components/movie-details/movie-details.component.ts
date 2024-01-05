import { CommentaireService } from './../../services/commentaire.service';
import { Component, OnInit } from '@angular/core';
import { CommentaireItemComponent } from '../commentaire-item/commentaire-item.component';
import { CommonModule, NgIf } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Movie } from '../../Model/movie';
import { ServiceService } from '../../services/service.service';
import { ActivatedRoute } from '@angular/router';
import { FavoriteService } from '../../services/favorite.service';
import { Commentary} from '../../Model/commentaire';
import { AuthenticationService } from '../../services/authentication.service';


@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [FormsModule,CommonModule,CommentaireItemComponent,NgIf,ReactiveFormsModule],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.css'
})
export class MovieDetailsComponent implements OnInit {

  movie!: Movie;
  movieId!:number;
  comments:Commentary[]=[];
  comment: Commentary={
    username:"reda",
    content: "conren",

  };

  // content:string="";
  content: FormControl = new FormControl('');

  public user: string = AuthenticationService.getUser();
  public isFavorited : boolean = false;

  constructor(private movieService :ServiceService ,private route: ActivatedRoute, public favoriteService: FavoriteService,
   private commentaireService: CommentaireService){}
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.movieId = id;
    });
    this.favoriteService.estFavorise(this.user, this.movieId).then((isFavorited) => {
      this.isFavorited = isFavorited;
    }).catch((error) => {
      console.error('Error checking favoritism:', error);
    });
    this.getMovieDetails()
    this.getAllComment()
  }
  getMovieDetails(){
    this.movieService.getMoviesById(this.movieId).subscribe((data)=>{
      this.movie = data
      console.log(data)
    })
  }


  addComment() :void{
    const newComment: Commentary = {
      username: this.user,
      movieId:this.movieId,
      content: this.content.getRawValue(),
  };

  this.commentaireService.saveComment(newComment);
  console.log(this.content.getRawValue())
  window.location.reload()

  }


  getAllComment(): void {
    this.commentaireService.getAllComment(this.movieId).subscribe((comments) => {
      // Now 'comments' is an array of Comment objects
      console.log(comments);
      this.comments=comments

    });
  }

  public addFavorite(username: string) {
    this.favoriteService.sendFavorite(username, this.movieId).subscribe(
      res => {
        this.isFavorited = true;
        console.log(this.movieId)
        console.log(res)
      },
      error => {

      }
    )
  }

  public deleteFavorite(username: string) {
    this.favoriteService.deleteFavorite(username, this.movieId).subscribe(
      res => {
        this.isFavorited = false;
        console.log(res)
      },
      error => {
      }
    )

  }

}
