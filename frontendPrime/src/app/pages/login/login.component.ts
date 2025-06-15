import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  loading: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  onSubmit() {
    this.loading = true;
    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        localStorage.setItem('token', response.token);
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        this.loading = false;
        alert('Erro ao fazer login. Verifique suas credenciais.');
        console.error('Erro de login:', error);
      }
    });
  }
}
