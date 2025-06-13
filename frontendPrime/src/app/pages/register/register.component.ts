import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  onSubmit() {
    if (this.password !== this.confirmPassword) {
      alert('As senhas não coincidem!');
      return;
    }

    this.authService.register(this.email, this.password).subscribe({
      next: (response) => {
        alert('Registro realizado com sucesso!');
        this.router.navigate(['/login']);
      },
      error: (error) => {
        alert('Erro ao realizar registro. Tente novamente.');
        console.error('Erro de registro:', error);
      }
    });
  }
} 