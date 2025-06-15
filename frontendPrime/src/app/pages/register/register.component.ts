import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

// PrimeNG
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputMaskModule } from 'primeng/inputmask';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    CardModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    DropdownModule,
    InputMaskModule
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  nome: string = '';
  cpf: string = '';
  email: string = '';
  senha: string = '';
  confirmarSenha: string = '';
  sexo: string = '';
  nivelTecnico: string = '';

  sexos = [
    { label: 'Masculino', value: 'M' },
    { label: 'Feminino', value: 'F' },
    { label: 'Outro', value: 'O' }
  ];

  niveisTecnicos = [
    { label: 'Estagiário', value: '0' },
    { label: 'Técnico N1', value: '1' },
    { label: 'Técnico N2', value: '2' },
    { label: 'Técnico N3', value: '3' }
  ];

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  onSubmit() {
    if (this.senha !== this.confirmarSenha) {
      alert('As senhas não coincidem!');
      return;
    }

    const userData = {
      nome: this.nome,
      cpf: this.cpf,
      email: this.email,
      senha: this.senha,
      sexo: this.sexo,
      nivelTecnico: this.nivelTecnico
    };

    this.authService.register(userData).subscribe({
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