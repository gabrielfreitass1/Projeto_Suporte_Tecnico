import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InteracoesService {

  private apiUrl = 'http://localhost:3000/API/interacao';

  constructor(private http: HttpClient) { }

  // GET - Buscar todas as interações
  getInteracoes(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  // GET - Buscar todas as interações de um determinado chamado
  getInteracoesPorChamado(idChamado: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/chamado/${idChamado}`);
  }

  // POST - Criar uma nova interação
  criarInteracao(interacao: any): Observable<any> {
    return this.http.post(this.apiUrl, interacao);
  }

  // PUT - Atualizar uma interação existente
  atualizarInteracao(id: string, interacao: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, interacao);
  }

  // DELETE - Deletar uma interação
  deletarInteracao(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
