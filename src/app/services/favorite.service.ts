import { ServiceService } from './service.service';
import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Movie } from '../Model/movie';
import { Observable, catchError, forkJoin, map, mergeMap, of, switchMap } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  BACKEND_API:string = environment.API_BASE_URL
  //private BACKEND_API: string = 'http://localhost:8081';
  API_TOKEN: string = '834805b4c6cf9aff20541bd2213dce6d';
  base_url: string = 'https://api.themoviedb.org/3/';
  language: string = 'fr';

  constructor(private http: HttpClient,private serviceService: ServiceService) { }


  movieIds!:number[]

  // public getFavoriteFilms(): Observable<any[]> {
  //   return this.getFilmIds().pipe(
  //     mergeMap((ids: string[]) => {
  //       const movieRequests: Observable<any>[] = [];

  //       ids.forEach(id => {
  //         const url = `${this.base_url}movie/${id}?api_key=${this.API_TOKEN}&language=${this.language}`;
  //         movieRequests.push(this.http.get<any>(url));
  //       });

  //       return forkJoin(movieRequests);
  //     })
  //   );
  // }


  public getFavoriteMovies(): Observable<number[]> {
    const username = AuthenticationService.getUser();
    const endpoint = `${this.BACKEND_API}/api/v1/favorite/all/${username}`;

    return this.http.get<any[]>(endpoint).pipe(
      map((responseData) => responseData.map(item => item.movieId)),
      catchError((error) => {
        console.error('Error fetching data:', error);
        return of([]); // Return an empty array in case of an error
      })
    );
  }
  getFavorite(): Observable<Movie[]> {
    return this.getFavoriteMovies().pipe(
      switchMap((movieIds: number[]) => {
        const movieObservables: Observable<Movie>[] = [];

        for (let index = 0; index < movieIds.length; index++) {
          movieObservables.push(this.serviceService.getMoviesById(movieIds[index]));
        }

        // Use forkJoin to combine the individual movie Observables into a single Observable
        return forkJoin(movieObservables);
      })
    );
  }


  public estFavorise(username: string, filmId: number): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.http.get<any>(`${this.BACKEND_API}/api/v1/favorite/exist/${filmId}/${username}`)
        .subscribe(
          (response: any) => {
            if (response) {
              resolve(true);
            } else {
              resolve(false);
            }
          },
          (error) => {
            reject(error);
          }
        );
    });
  }


  deleteFavorite(username: string, filmId: number): Observable<any> {
    console.log("ommii")
    return this.http.delete<any>(`${this.BACKEND_API}/api/v1/favorite/delete/${filmId}/${username}`);
  }

  sendFavorite(username: string, filmId: number): Observable<any> {
    console.log("ommii")
    return this.http.post<any>(`${this.BACKEND_API}/api/v1/favorite/save`, { "username":username, "movieId":filmId });
  }
}

