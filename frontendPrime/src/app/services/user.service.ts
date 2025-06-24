import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:3000/API/usuario';

  constructor(private http: HttpClient) { }

  // GET - Buscar todos os usuários
  getUsuarios(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  // POST - Criar um novo usuário
  criarUsuario(usuario: any): Observable<any> {
    return this.http.post(this.apiUrl, usuario);
  }

  // PUT - Atualizar um usuário existente
  atualizarUsuario(id: number, usuario: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, usuario);
  }

  // DELETE - Deletar um usuário
  deletarUsuario(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
