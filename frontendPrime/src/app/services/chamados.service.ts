import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChamadosService {

  private apiUrl = 'http://localhost:3000/API/chamado';

  constructor(private http: HttpClient) { }

  // GET - Buscar todos os chamados
  getChamados(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  // POST - Criar um novo chamado
  criarChamado(chamado: any): Observable<any> {
    return this.http.post(this.apiUrl, chamado);
  }

  // PUT - Atualizar um chamado existente
  atualizarChamado(id: string, chamado: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, chamado);
  }

  // DELETE - Deletar um chamado
  deletarChamado(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
