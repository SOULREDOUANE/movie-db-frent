import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  private auth: AuthenticationService = AuthenticationService.getInstance(this.router, this.http);
  constructor(private router: Router, private http: HttpClient) {
  }


  logInButton (username: string, password:string)  {
    this.auth.logIn(username, password);
  }
}
