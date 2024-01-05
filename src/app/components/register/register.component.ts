import { Component } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  private auth: AuthenticationService = AuthenticationService.getInstance(this.router, this.http);
  constructor(private router: Router, private http: HttpClient) {
  }


  sighUpButton (username: string, password:string)  {
    this.auth.signUp(username, password);
  }
}
