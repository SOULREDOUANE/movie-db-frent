
import { Commentary } from './../Model/commentaire';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { AuthenticationService } from './authentication.service';
import { Observable, map } from 'rxjs';




@Injectable({
  providedIn: 'root'
})
export class CommentaireService {
  private BACKEND_API: string =`${ environment.API_BASE_URL}/api/v1/commentaire`;

  constructor(private http: HttpClient) { }


  public getAllComment(movieId: number): Observable<Commentary[]> {
    const username = AuthenticationService.getUser();

    return this.http.get<any[]>(`${this.BACKEND_API}/all/${movieId}/${username}`).pipe(
      map(comments => comments.map(({ id, content, movieUser }) => ({
        id,
        user: movieUser.userName,
        content
      } as unknown as Commentary)))
    );
  }


  public saveComment(commentary: Commentary): void {
    this.http.post(`${this.BACKEND_API}/save`, commentary).subscribe(
      (response) => {
        console.log('Comment saved successfully:', response);
        // Handle any additional logic after successful save
      },
      (error) => {
        console.error('Error saving comment:', error);
        // Handle any error scenarios
      }
    );
  }

}
