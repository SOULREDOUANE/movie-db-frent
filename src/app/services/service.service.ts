import { environment } from './../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Movie } from '../Model/movie';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private readonly server :string =environment.API_BASE_URL
  constructor(private http :HttpClient) { }
  movies!:Movie[]

  apikey = "834805b4c6cf9aff20541bd2213dce6d";
  baseUrl = 'https://api.themoviedb.org/3';



  getPopularMovies():Observable<any> {
    return  this.http.get<any>(this.baseUrl +`/trending/all/week?api_key=${this.apikey}`);
  }

  searchMovies(moviePrefix: string): Observable<any> {
    const url = this.baseUrl+ `/search/movie?api_key=${this.apikey}&query=${moviePrefix}&include_adult=false&language=en-US&page=1`
    return this.http.get<any>(url).pipe(map((res: any) => res))
  }

  getMoviesById(id:number ): Observable<any> {
    return this.http.get<any>(this.baseUrl+ `/movie/${id}?api_key=${this.apikey}`);
  }
}
