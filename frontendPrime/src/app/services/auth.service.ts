import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface RegisterData {
  nome: string;
  cpf: string;
  email: string;
  senha: string;
  sexo: string;
  nivelTecnico: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api'; // Ajuste para a URL do seu backend

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login`, { email, password });
  }

  register(userData: RegisterData): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/register`, userData);
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
} 