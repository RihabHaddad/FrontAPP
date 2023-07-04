import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './Auth.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent {

  email: string = '';
  password: string = '';
  error: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    this.authService.login(this.email, this.password).subscribe(
      response => {
        if (response) {
          // Succès de la connexion, enregistrez le token dans le stockage local
          localStorage.setItem('token', response.authToken);

          // Redirigez vers la page d'accueil ou une autre page appropriée
          this.router.navigate(['/']);
        } else {
          // Gestion de l'erreur de connexion
          this.error = 'Identifiants invalides.';
        }
      },
      error => {
        // Gestion de l'erreur de connexion
        this.error = error.message;
      }
    );
  
  }
  ngOnInit(): void {
  }

}